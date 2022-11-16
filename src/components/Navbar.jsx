import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Avatar, Box, Flex, Text } from "@mantine/core";
import React from "react";

const Navbar = () => {
  return (
    <Flex align={'center'} justify="space-between" sx={{ background: "red", maxHeight: "100px" }}>
      <Text>MJP Chat</Text>
      <Flex align={'inherit'} gap="0.5rem" bg={"blue"}>
        <Avatar src={null} radius="xl"></Avatar>
        <Text>Matthew</Text>
        <ActionIcon variant="transparent" c="dark">
          <FontAwesomeIcon icon={faChevronDown} />
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default Navbar;
