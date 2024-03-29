import UserChat from "./UserChat";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { Chat } from "../utils/interfaces";
import { db } from "../firebase";

function Chats() {
  const { currentUser } = useContext(AuthContext);
  const [chats, setChats] = useState<Array<Chat>>([]);

  useEffect(() => {
    const unsub = async () => {
      const q = query(
        collection(db, "chats"),
        where("users", "array-contains", currentUser.uid)
      );
      onSnapshot(q, (querySnapshot) => {
        const arr: Array<Chat> = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().hidden?.find((i: string) => i === currentUser.uid)) {
            return;
          } else {
            arr.push(doc.data() as Chat);
          }
        });
        setChats(arr);
      });
    };

    return () => {
      currentUser && unsub();
    };
  }, []);

  return (
    <>
      {chats.map((i: Chat) => (
        <div key={i.id}>
          <UserChat chat={i} />
        </div>
      ))}
    </>
  );
}

export default Chats;
