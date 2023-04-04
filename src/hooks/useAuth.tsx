import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";

export default function useAuth() {
  const registerUser = async (
    email: string,
    password: string,
    username: string
  ): Promise<string> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      try {
        await addDoc(collection(db, "users"), {
          username,
          email,
          color: randomPfpColor(),
          status: "online",
        });
        return "success";
      } catch (e) {
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
      await signInWithEmailAndPassword(auth, email, password);
      return "success";
    } catch (e) {
      if (JSON.stringify(e).includes("wrong-password")) {
        return "Incorrect password!";
      } else {
        return "No user with that email!";
      }
    }
  };

  return { registerUser, loginUser };
}
