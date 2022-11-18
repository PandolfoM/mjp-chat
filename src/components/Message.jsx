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

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  const theme = useMantineTheme();

  console.log(data);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  let owner = message.senderId === currentUser.uid ? true : false;

  return (
    <Flex ref={ref} gap={"1rem"} direction={owner ? "row-reverse" : "row"}>
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
        align={owner && "flex-end"}
        sx={{ maxWidth: "80%" }}>
        <Flex align={'flex-end'}>
          <Title order={4} c="tokyo.2" fw={"400"}>
            {data.user?.displayName}
          </Title>
          <Space w="sm" />
          <Text c={theme.colors.tokyo[12]} fw="300" fz={"xs"}>
            Just now
          </Text>
        </Flex>
        <Text
          bg={owner ? "blue" : "white"}
          p="10px 20px"
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
