import {
  addDoc,
  arrayRemove,
  arrayUnion,
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
import { AuthContext } from "../auth/context";
import { PageContext } from "../context/PageContext";

export default function useMessages() {
  const { currentPage, setCurrentPage } = useContext(PageContext);
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
    let removeHidden: boolean = false;

    const q = query(
      collection(db, "chats"),
      where("users", "array-contains", uid)
    );
    const q2 = query(
      collection(db, "chats"),
      where("users", "array-contains", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      chat1Id.push(doc.data().id);
    });

    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach((doc) => {
      if (doc.data().hidden?.find((i: string) => i === currentUser.uid))
        removeHidden = true;
      chat2Id.push(doc.data().id);
    });
    const matchingId = chat1Id.filter((i) => chat2Id.indexOf(i) !== -1);

    setCurrentPage(matchingId[0]);

    if (removeHidden) {
      await updateDoc(doc(db, "chats", matchingId[0]), {
        hidden: arrayRemove(currentUser.uid),
      });
    }
  };

  const hideMessage = async (id: string) => {
    await updateDoc(doc(db, "chats", id), {
      hidden: arrayUnion(currentUser.uid),
    });
  };

  return { addMessage, findMessage, hideMessage };
}
