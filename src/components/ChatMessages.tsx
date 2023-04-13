import { createStyles } from "@mantine/core";
import { DocumentData } from "firebase/firestore";
import { useEffect, useRef } from "react";
import Chat from "./Chat";

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
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
}));

function ChatMessages(props: Props) {
  const { classes } = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [props.chatData]);

  return (
    <div className={classes.container}>
      {props.chatData?.map((i: ChatData) => (
        <div ref={ref} className={classes.message} key={i.sentAt}>
          <Chat data={i} />
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
