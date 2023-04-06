import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";

export default function useAuth() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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
        await setDoc(doc(db, "usernames", username), {
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

  const getFriends = async (setFriends: any) => {
    try {
      const uidArr: Array<string> = [];
      const docSnap = await getDocs(
        collection(db, "users", currentUser.uid, "friends")
      );
      docSnap.docs.map((d) => {
        uidArr.push(d.data().uid);
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

  return { registerUser, loginUser, getFriends };
}
