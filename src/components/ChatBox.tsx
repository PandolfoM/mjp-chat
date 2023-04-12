import { Textarea, createStyles } from "@mantine/core";
import { useState } from "react";
import useMessages from "../hooks/useMessages";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.md,
  },
}));

function ChatBox() {
  const { classes } = useStyles();
  const { addMessage } = useMessages();
  const [text, setText] = useState<string>("");

  const onEnterPress = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      if (text) {
        addMessage(text);
        setText("");
      }
    }
  };

  return (
    <form className={classes.container}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        onKeyDown={onEnterPress}
        sx={{ position: "relative" }}
        placeholder="Send message"
        autosize
        minRows={1}
        maxRows={5}
        maxLength={2000}
      />
    </form>
  );
}

export default ChatBox;
