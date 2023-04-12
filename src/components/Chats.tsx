import UserChat from "./UserChat";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { Chat } from "../utils/interfaces";
import { db } from "../firebase";

type Props = {
  userDoc: DocumentData | undefined;
};

function Chats(props: Props) {
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
          arr.push(doc.data() as Chat);
        });
        setChats(arr);
      });
    };

    props.userDoc && unsub();
  }, [props.userDoc]);

  return (
    <>
      {chats.map((i: Chat) => (
        <UserChat chat={i} key={i.id} />
      ))}
    </>
  );
}

export default Chats;
