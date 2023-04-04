import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { randomPfpColor } from "../utils/helpers";

export default function useAuth() {
  const newUser = async (email: string, password: string, username: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      try {
        await addDoc(collection(db, "users"), {
          username,
          email,
          password,
          color: randomPfpColor(),
          status: "online",
        });
        return true;
      } catch (e) {
        return e;
      }
    } catch (e) {
      return e;
    }
  };

  return { newUser };
}
