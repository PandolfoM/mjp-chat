import { Avatar, Flex, Image, Text } from "@mantine/core";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  
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
        <Text>Just now</Text>
      </Flex>
      <Flex
        direction={"column"}
        align={owner && "flex-end"}
        sx={{ maxWidth: "80%" }}>
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
