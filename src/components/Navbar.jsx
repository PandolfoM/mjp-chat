import {
  Box,
  Flex,
  Space,
  Text,
  Title,
} from "@mantine/core";
import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const Navbar = () => {
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
      </Flex>
    </Box>
  );
};

export default Navbar;
