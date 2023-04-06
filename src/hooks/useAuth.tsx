import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { UserDoc } from "../utils/interfaces";


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

  const getCurrentUser = async (): Promise<any> => {
    // const docRef = doc(db, "users", currentUser?.uid);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return docSnap.data();
    // } else {
    //   return null;
    // }
    const unsub = onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
      return doc.data();
    });
    console.log(unsub());
  };

  return { registerUser, loginUser, getCurrentUser };
}
