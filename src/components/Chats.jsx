import { Avatar, Flex, Text } from "@mantine/core";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <Flex
            key={chat[0]}
            align={"center"}
            gap="0.5rem"
            p="0.5rem"
            sx={{ cursor: "pointer" }}
            onClick={() => handleSelect(chat[1].userInfo)}>
            <Avatar src={chat[1].userInfo.photoURL} radius="xl"></Avatar>
            <div>
              <Text>{chat[1].userInfo.displayName}</Text>
              <Text>{chat[1].lastMessage?.text}</Text>
            </div>
          </Flex>
        ))}
    </div>
  );
};

export default Chats;
