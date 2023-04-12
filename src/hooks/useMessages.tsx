import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { StatusContext } from "../context/StatusContext";
import { AuthContext } from "../auth/context";

export default function useMessages() {
  const { currentPage } = useContext(StatusContext);
  const { currentUser } = useContext(AuthContext);

  const addMessage = async (text: string) => {
    const ref = collection(db, "chats", currentPage, "messages");

    await addDoc(ref, {
      text,
      sentBy: currentUser.uid,
      sentAt: serverTimestamp(),
    });
  };

  return { addMessage };
}
