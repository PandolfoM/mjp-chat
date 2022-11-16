import { Avatar, Flex, Image, Text } from "@mantine/core";
import React from "react";

const Message = () => {
  let owner = true;

  return (
    <Flex gap={"1rem"} direction={owner ? "row-reverse" : "row"}>
      <Flex direction={"column"}>
        <Avatar radius={"xl"}>MP</Avatar>
        <Text>Just now</Text>
      </Flex>
      <Flex direction={"column"} align={owner && "flex-end"} sx={{ maxWidth: "80%" }}>
        <Text
          bg={owner ? "blue" : "white"}
          p="10px 20px"
          sx={{ borderRadius: owner ? "5px 0px 5px 5px" : "0 5px 5px 5px", maxWidth: "max-content"}}>
          Hello
        </Text>
        <div style={{ width: "50%" }}>
          <Image
            radius={"md"}
            src="https://mediaproxy.salon.com/width/1200/https://media.salon.com/2020/05/ahsoka-star-wars-clone-wars-still01.jpg"
            alt="test img"
          />
        </div>
      </Flex>
    </Flex>
  );
};

export default Message;
