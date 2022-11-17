import { Flex, Text } from "@mantine/core";
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div style={{ flex: 3 }}>
      <Flex direction={"column"} justify="space-between" h={"90%"}>
        <Text h={'2rem'} c="dark">{data.user?.displayName}</Text>
        <Messages />
        <Input />
      </Flex>
    </div>
  );
};

export default Chat;
