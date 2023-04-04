import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";

export default function useAuth() {
  const newUser = async (
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

  return { newUser };
}
