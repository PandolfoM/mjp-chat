import {
  faChevronDown,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Indicator,
  Menu,
  Space,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { auth } from "../firebase";

const Navbar = () => {
  const theme = useMantineTheme();
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <Box bg="tokyo.0">
      <Text fz="xs" c="tokyo.2" fw="600" ta="center">
        MJP Chat
      </Text>
      <Flex
        justify="space-between"
        align="flex-end"
        pb="xs"
        px="sm"
        c="tokyo.2"
        fw="600"
        sx={{ maxHeight: "100px" }}>
        <Flex align="flex-end">
          <Title order={4} fw="500">
            {data.user?.displayName}
          </Title>
          <Space w="md" />
          {data.user?.displayName && (
            <Text fw="500" fz={"xs"} c="tokyo.4">
              Offline
            </Text>
          )}
        </Flex>
        <Flex
          align={"center"}
          justify="space-between"
          bg={"tokyo.1"}
          px="xs"
          w={"250px"}
          maw="250px"
          h={"50px"}
          mah="50px"
          wrap={"nowrap"}
          sx={{ overflow: "hidden", borderRadius: "5px" }}>
          <Flex align={"center"} gap="xs" w={"75%"} wrap="nowrap">
            <Avatar src={currentUser.photoURL} radius="xl" size={"md"}></Avatar>
            <Text
              h="20px"
              mah="20px"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                cursor: "default",
              }}
              title={currentUser.displayName}>
              {currentUser.displayName}
            </Text>
          </Flex>
          <Box>
            <Menu withArrow radius={"5px"}>
              <Menu.Target>
                <ActionIcon variant="transparent" c="tokyo.10">
                  <FontAwesomeIcon icon={faChevronDown} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown
                sx={(theme) => ({ background: theme.colors.tokyo[11] })}>
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
      </Flex>
    </Box>
  );
};

export default Navbar;
