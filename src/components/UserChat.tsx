import { Avatar, Text, createStyles } from "@mantine/core";
import { Chat, User } from "../utils/interfaces";
import StatusIndicator from "./StatusIndicator";
import { DocumentData, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../context/StatusContext";
import { db } from "../firebase";
import { AuthContext } from "../auth/context";

type Props = {
  chat: Chat;
};

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
}));

function UserChat(props: Props) {
  const [lastMessage, setLastMessage] = useState<string>("");
  const [user, setUser] = useState<User>();
  const { classes } = useStyles();
  const { setCurrentPage } = useContext(StatusContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getOtherUser = (): string => {
      const filter = props.chat.users.filter(
        (user) => user !== currentUser.uid
      );
      return filter[0];
    };

    const unsub = async () => {
      const ref = doc(db, "users", getOtherUser());
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      }
    };

    unsub();
  }, []);

  return (
    <div
      className={classes.container}
      onClick={() => setCurrentPage(props.chat.id)}>
      {user && (
        <>
          <StatusIndicator user={user} size={18} offset={7}>
            <Avatar size={48} radius="xl" color={user?.color} />
          </StatusIndicator>
          <div>
            <Text fw="bold" truncate>
              {user.username}
            </Text>
            <Text color="dimmed" fz={"sm"}>
              {props.chat.lastMessage}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}

export default UserChat;
