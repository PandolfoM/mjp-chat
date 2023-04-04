import { Textarea, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
  container: {
    padding: 16,
  },
}));

function ChatBox() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Textarea
        placeholder="Send message"
        autosize
        minRows={1}
        maxRows={5}
        maxLength={2000}
      />
    </div>
  );
}

export default ChatBox;
