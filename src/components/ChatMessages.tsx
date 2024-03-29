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
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column-reverse",
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  message: {
    width: "100%",
    // minHeight: 50,
    display: "flex",
    gap: theme.spacing.xs,
  },
}));

function ChatMessages(props: Props) {
  const { classes } = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [props.chatData]);

  return (
    <div className={classes.container} ref={ref}>
      {props.chatData?.map((i: ChatData) => (
        <div className={classes.message} key={i.sentAt}>
          <Chat data={i} />
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
