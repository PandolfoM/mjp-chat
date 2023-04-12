import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { StatusContext } from "../context/StatusContext";
import { AuthContext } from "../auth/context";

export default function useMessages() {
  const { currentPage } = useContext(StatusContext);
  const { currentUser } = useContext(AuthContext);

  const addMessage = async (text: string) => {
    const ref = collection(db, "chats", currentPage, "messages");
    const lastMsgRef = doc(db, "chats", currentPage);

    await addDoc(ref, {
      text,
      sentBy: currentUser.uid,
      sentAt: serverTimestamp(),
    });

    await updateDoc(lastMsgRef, {
      lastMessage: text,
    });
  };

  return { addMessage };
}
