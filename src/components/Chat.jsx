import { Box, Flex, Text } from "@mantine/core";
import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <Box sx={{ flex: 3 }}>
      <Flex direction={"column"} justify="space-between" h={"100%"} p="md">
        <Messages />
        <Input />
      </Flex>
    </Box>
  );
};

export default Chat;
