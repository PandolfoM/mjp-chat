import React from "react";
import Searchbar from "./Searchbar";
import Chats from "./Chats";
import { Box } from "@mantine/core";

const Sidebar = () => {
  return (
    <Box style={{ flex: 1 }} bg="tokyo.3" >
      <Searchbar />
      <Chats />
    </Box>
  );
};

export default Sidebar;
