import UserChat from "./UserChat";
import { DocumentData } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";

type Props = {
  userDoc: DocumentData | undefined;
};

function Chats(props: Props) {
  const { friends } = useContext(AuthContext);

  return (
    <>
      {friends?.map((i: User) => (
        <UserChat user={i} userDoc={props.userDoc} key={i.uid} />
      ))}
    </>
  );
}

export default Chats;
