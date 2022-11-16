import { Avatar, Flex, Text, TextInput } from "@mantine/core";
import React from "react";

const Searchbar = () => {
  return (
    <div style={{borderBottom: "1px solid black"}}>
      <div>
        <TextInput placeholder="Search User"/>
      </div>
      <Flex align={"center"} gap="0.5rem" p="0.5rem" sx={{cursor: "pointer"}}>
        <Avatar src={null} radius="xl">MP</Avatar>
        <div>
          <Text>Matthew</Text>
        </div>
      </Flex>
    </div>
  );
};

export default Searchbar;
