import { Flex, Text } from "@mantine/core";
import React from "react";
import Messages from "./Messages";
import Input from "./Input";

const Chat = () => {
  return (
    <div style={{ flex: 2 }}>
      <Flex direction={"column"} justify="space-between" h={"100%"}>
        <Messages />
        <Input />
      </Flex>
    </div>
  );
};

export default Chat;
