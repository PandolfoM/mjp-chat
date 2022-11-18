import { faCog, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Indicator,
  Menu,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";

function Profile() {
  const theme = useMantineTheme();
  const { currentUser } = useContext(AuthContext);

  return (
    <Flex
      align={"center"}
      justify="space-between"
      bg={"tokyo.9"}
      px="xs"
      h={"60px"}
      mah="60px"
      wrap={"nowrap"}
      sx={{ overflow: "hidden" }}>
      <Flex align={"center"} gap="xs" w={"75%"} wrap="nowrap">
        <Indicator dot inline position="bottom-end" size={15} offset={3} withBorder color={"green"} sx={{".mantine-Indicator-indicator": {borderColor: theme.colors.tokyo[9]}}}>
          <Avatar src={currentUser.photoURL} radius="xl" size={"md"} ></Avatar>
        </Indicator>
        <Text
          h="20px"
          mah="20px"
          c="tokyo.2"
          fw="700"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            cursor: "default",
            textAlign: "left"
          }}
          title={currentUser.displayName}>
          {currentUser.displayName}
        </Text>
      </Flex>
      <Box>
        <Menu withArrow radius={"5px"}>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              c="tokyo.10"
              sx={{
                "&:hover": {
                  color: theme.colors.tokyo[5],
                  background: theme.colors.tokyo[13],
                },
              }}>
              <FontAwesomeIcon icon={faCog} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown
            sx={{
              background: theme.colors.tokyo[11],
              border: "none",
              ".mantine-1brloow": { border: "none" },
            }}>
            <Menu.Item
              c={theme.colors.tokyo[10]}
              onClick={() => signOut(auth)}
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
              sx={(theme) => ({
                "&[data-hovered]": {
                  background: "transparent",
                  color: theme.colors.tokyo[5],
                },
              })}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </Flex>
  );
}

export default Profile;
