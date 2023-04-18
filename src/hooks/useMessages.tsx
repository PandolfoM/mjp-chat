import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { StatusContext } from "../context/StatusContext";
import { AuthContext } from "../auth/context";

export default function useMessages() {
  const { currentPage, setCurrentPage } = useContext(StatusContext);
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

  const findMessage = async (uid: string) => {
    const chat1Id: string[] = [];
    const chat2Id: string[] = [];

    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", uid)
    );
    const q2 = query(
      collection(db, "chats"),
      where("users", "array-contains", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      chat1Id.push(doc.data().id);
    });

    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      chat2Id.push(doc.data().id);
    });
    const matchingId = chat1Id.filter((i) => chat2Id.indexOf(i) !== -1);
    setCurrentPage(matchingId[0]);
  };

  return { addMessage, findMessage };
}
