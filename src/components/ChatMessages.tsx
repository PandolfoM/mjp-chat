import { Avatar, Text, createStyles } from "@mantine/core";
import { DocumentData, Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { StatusContext } from "../context/StatusContext";
import { formatTime } from "../utils/helpers";

interface ChatData {
  sentAt: string;
  sentBy: string;
  text: string;
}

type Props = {
  chatData: DocumentData | undefined;
  userDoc: DocumentData | undefined;
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    overflowY: "auto",
  },
  message: {
    width: "100%",
    minHeight: 50,
    display: "flex",
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
  },
  messageName: {
    gap: theme.spacing.xs,
    display: "flex",
    alignItems: "flex-end",
  },
}));

function ChatMessages(props: Props) {
  const { classes } = useStyles();
  const { friends, currentUser } = useContext(AuthContext);

  const getUser = (uid: string): string => {
    if (uid === currentUser.uid) return props.userDoc?.username;

    const userId = friends.filter((i) => {
      return i.uid === uid;
    });

    return userId[0].username;
  };

  const getColor = (uid: string): string => {
    if (uid === currentUser.uid) return props.userDoc?.color;

    const userColor = friends.filter((i) => {
      return i.uid === uid;
    });

    return userColor[0].color;
  };

  return (
    <div className={classes.container}>
      {props.chatData?.map((i: ChatData) => (
        <div className={classes.message} key={i.sentAt}>
          <Avatar size={48} radius="xl" color={getColor(i.sentBy)} />
          <div>
            <div className={classes.messageName}>
              <Text fw="bold">{getUser(i.sentBy)}</Text>
              <Text fz="xs" c="dimmed">
                {formatTime(i.sentAt)}
              </Text>
            </div>
            <Text>{i.text}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
