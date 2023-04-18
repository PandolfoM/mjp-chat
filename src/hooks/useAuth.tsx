import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";
import { StatusContext } from "../context/StatusContext";

export default function useAuth() {
  const { currentUser, setCurrentUser, setFriends, setCurrentUserDoc } =
    useContext(AuthContext);
  const { setCurrentPage } = useContext(StatusContext);

  const getUserDoc = async () => {
    const docSnap = await getDoc(doc(db, "users", currentUser?.uid));
    setCurrentUserDoc(docSnap.data() as User);
  };

  const registerUser = async (
    email: string,
    password: string,
    username: string
  ): Promise<string> => {
    try {
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      try {
        await setDoc(doc(db, "users", createUser.user.uid), {
          username,
          email,
          color: randomPfpColor(),
          status: "online",
          uid: createUser.user.uid,
        });
        await setDoc(doc(db, "emails", email), {
          uid: createUser.user.uid,
        });
        await updateProfile(createUser.user, {
          displayName: username,
        });
        setCurrentUser(createUser.user);
        return "success";
      } catch (e) {
        console.log(e);

        return "There has been an error!";
      }
    } catch (e) {
      return "Email is already being used!";
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<string> => {
    try {
      const loggedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(loggedInUser.user);
      return "success";
    } catch (e) {
      if (JSON.stringify(e).includes("wrong-password")) {
        return "Incorrect password!";
      } else {
        return "No user with that email!";
      }
    }
  };

  const getFriends = async (setFriends: any, user: any) => {
    const qUser = query(
      collection(db, "users"),
      where("uid", "==", user.uid),
      orderBy("username")
    );

    onSnapshot(qUser, (querySnapshot) => {
      const uidArr: Array<string> = [];

      querySnapshot.forEach((doc) => {
        for (let i = 0; i < doc.data().friends.length; i++) {
          uidArr.push(doc.data().friends[i]);
        }
      });

      if (uidArr.length > 0) {
        const q = query(collection(db, "users"), where("uid", "in", uidArr));

        onSnapshot(q, (querySnapshot) => {
          const userFriends: Array<User> = [];
          querySnapshot.forEach((e) => {
            userFriends.push(e.data() as User);
          });
          setFriends(userFriends);
        });
      } else {
        setFriends([]);
      }
    });
  };

  const addFriend = async (friendUid: string) => {
    const docId = `${friendUid}${currentUser.uid}`;
    await setDoc(doc(db, "requests", docId), {
      to: friendUid,
      from: currentUser.uid,
      id: docId,
    });
  };

  const removeFriend = async (friendUid: string) => {
    const currentUserRef = doc(db, "users", currentUser.uid);
    const friendUserRef = doc(db, "users", friendUid);
    await updateDoc(currentUserRef, {
      friends: arrayRemove(friendUid),
    });

    await updateDoc(friendUserRef, {
      friends: arrayRemove(currentUser.uid),
    });
    setFriends((current) => current.filter((i) => i.uid !== friendUid));
  };

  const removeFriendRequest = async (id: string) => {
    const ref = doc(db, "requests", id);
    await deleteDoc(ref);
  };

  const acceptFriend = async (id: string, fromId: string) => {
    const currentUserRef = doc(db, "users", currentUser.uid);
    const friendUserRef = doc(db, "users", fromId);

    await updateDoc(currentUserRef, {
      friends: arrayUnion(fromId),
    });

    await updateDoc(friendUserRef, {
      friends: arrayUnion(currentUser.uid),
    });

    const createChat = await addDoc(collection(db, "chats"), {
      lastMessage: "",
      users: [currentUser.uid, fromId],
    });

    await updateDoc(doc(db, "chats", createChat.id), {
      id: createChat.id,
    });

    const ref = doc(db, "requests", id);
    await deleteDoc(ref);

    setCurrentPage(createChat.id);
  };

  return {
    registerUser,
    loginUser,
    getFriends,
    addFriend,
    removeFriend,
    removeFriendRequest,
    acceptFriend,
    getUserDoc,
  };
}
