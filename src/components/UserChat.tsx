import { Avatar, Text, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";
import StatusIndicator from "./StatusIndicator";
import { DocumentData } from "firebase/firestore";
import { useContext } from "react";
import { StatusContext } from "../context/StatusContext";

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
  const { classes } = useStyles();
  const { setCurrentChat } = useContext(StatusContext);

  const getChat = () => {
    const chatId = props.user.chats?.filter((el) =>
      props.userDoc?.chats.includes(el)
    );
    chatId ? setCurrentChat(chatId[0]) : setCurrentChat("");
  };

  return (
    <div className={classes.container} onClick={() => getChat()}>
      <StatusIndicator user={props.user} size={18} offset={7}>
        <Avatar size={48} radius="xl" color={props.user.color} />
      </StatusIndicator>
      <Text fw="bold" truncate>
        {props.user.username}
      </Text>
    </div>
  );
}

export default UserChat;
