import {
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Avatar, Box, Flex, Menu, Text } from "@mantine/core";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Flex
      align={"center"}
      justify="space-between"
      p={"xs"}
      sx={{ background: "red", maxHeight: "100px" }}>
      <Text>MJP Chat</Text>
      <Flex align={"inherit"} gap="0.5rem">
        <Avatar src={currentUser.photoURL} radius="xl"></Avatar>
        <Text>{currentUser.displayName}</Text>
        <Menu withArrow>
          <Menu.Target>
            <ActionIcon variant="transparent" c="dark">
              <FontAwesomeIcon icon={faChevronDown} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => signOut(auth)}
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
