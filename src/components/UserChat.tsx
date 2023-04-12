import { Avatar, Text, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";
import StatusIndicator from "./StatusIndicator";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { StatusContext } from "../context/StatusContext";
import { db } from "../firebase";

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

type Props = {
  user: User;
  userDoc: DocumentData | undefined;
};

function UserChat(props: Props) {
  const [lastMessage, setLastMessage] = useState<string>("");
  const { classes } = useStyles();
  const { setCurrentPage } = useContext(StatusContext);

  useEffect(() => {
    if (props.user.chats) {
      for (let i = 0; i < props.user.chats?.length; i++) {
        onSnapshot(doc(db, "chats", props.user.chats[i]), (doc) => {
          setLastMessage(doc.data()?.lastMessage);
        });
      }
    }
  }, []);

  const getChat = () => {
    const chatId = props.user.chats?.filter((el) =>
      props.userDoc?.chats.includes(el)
    );
    chatId ? setCurrentPage(chatId[0]) : setCurrentPage("");
  };

  return (
    <div className={classes.container} onClick={() => getChat()}>
      <StatusIndicator user={props.user} size={18} offset={7}>
        <Avatar size={48} radius="xl" color={props.user.color} />
      </StatusIndicator>
      <div>
        <Text fw="bold" truncate>
          {props.user.username}
        </Text>
        <Text color="dimmed" fz={"sm"}>
          {lastMessage}
        </Text>
      </div>
    </div>
  );
}

export default UserChat;
