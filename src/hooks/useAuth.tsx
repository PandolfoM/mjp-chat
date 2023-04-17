import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
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

export default function useAuth() {
  const { currentUser, setCurrentUser, setFriends, friends } =
    useContext(AuthContext);

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
    try {
      const uidArr: Array<string> = [];
      const qUser = query(
        collection(db, "users"),
        where("uid", "==", user.uid),
        orderBy("username")
      );
      const docSnap = await getDocs(qUser);
      docSnap.forEach((doc) => {
        for (let i = 0; i < doc.data().friends.length; i++) {
          uidArr.push(doc.data().friends[i]);
        }
      });

      const q = query(collection(db, "users"), where("uid", "in", uidArr));

      onSnapshot(q, (querySnapshot) => {
        const userFriends: Array<User> = [];
        querySnapshot.forEach((e) => {
          userFriends.push(e.data() as User);
        });
        setFriends(userFriends);
      });
    } catch (e) {
      console.log(e);
      return ["error"];
    }
  };

  const addFriend = async (friend: User) => {
    const currentUserRef = doc(db, "users", currentUser.uid);
    await updateDoc(currentUserRef, {
      friends: arrayUnion(friend.uid),
    });
    setFriends((current) => [...current, friend]);
  };

  const removeFriend = async (friendUid: string) => {
    const currentUserRef = doc(db, "users", currentUser.uid);
    await updateDoc(currentUserRef, {
      friends: arrayRemove(friendUid),
    });
    setFriends((current) => current.filter((i) => i.uid !== friendUid));
  };

  return { registerUser, loginUser, getFriends, addFriend, removeFriend };
}
