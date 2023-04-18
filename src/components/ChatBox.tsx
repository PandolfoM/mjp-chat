import { Textarea } from "@mantine/core";
import { useState } from "react";
import useMessages from "../hooks/useMessages";

function ChatBox() {
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
    <form>
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
