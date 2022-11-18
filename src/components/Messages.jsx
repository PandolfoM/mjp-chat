import { Box } from "@mantine/core";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

function Messages() {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <Box sx={{ overflowY: "auto" }} bg="tokyo.1" h="100%">
      {messages.map((m) => (
        <Message message={m} key={m.id}/>
      ))}
    </Box>
  );
}

export default Messages;
