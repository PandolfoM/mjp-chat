import {
  Avatar,
  Flex,
  Image,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import dayjs from "dayjs";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const theme = useMantineTheme();
  const timestamp = dayjs(new Date(message.date.seconds * 1000)).format('MM/DD/YYYY, h:mm:ss A')


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message);

  let owner = message.senderId === currentUser.uid ? true : false;

  return (
    <Flex ref={ref} gap={"1rem"} p='0.5rem'>
      {/* direction={owner ? "row-reverse" : "row"} */}
      <Flex direction={"column"}>
        <Avatar
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          radius={"xl"}></Avatar>
      </Flex>
      <Flex
        direction={"column"}
        // align={owner && "flex-end"}
        sx={{ maxWidth: "80%" }}>
        <Flex align={"flex-end"} direction="row">
          <Title order={4} c="tokyo.2" fw={"400"} fz="1rem">
            {message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.displayName}:
          </Title>
          <Space w="sm" />
          <Text c={theme.colors.tokyo[12]} fw="400" fz={"xs"} sx={{letterSpacing: "0.5px", wordSpacing: "4px"}}>
            {timestamp}
          </Text>
        </Flex>
        <Text
          // bg={owner ? "blue" : "white"}
          // p="10px 20px"
          c={"tokyo.2"}
          sx={{
            borderRadius: owner ? "5px 0px 5px 5px" : "0 5px 5px 5px",
            maxWidth: "max-content",
          }}>
          {message.text}
        </Text>
        <div style={{ width: "50%" }}>
          {message.img && (
            <Image radius={"md"} src={message.img} alt="test img" />
          )}
        </div>
      </Flex>
    </Flex>
  );
};

export default Message;
