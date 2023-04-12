import UserChat from "./UserChat";
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { Chat, User } from "../utils/interfaces";
import { db } from "../firebase";

type Props = {
  userDoc: DocumentData | undefined;
};

function Chats(props: Props) {
  const { friends } = useContext(AuthContext);
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
          // console.log(doc.data());
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
      {/* {friends?.map((i: User) => (
        <UserChat user={i} userDoc={props.userDoc} key={i.uid} />
      ))} */}
    </>
  );
}

export default Chats;
