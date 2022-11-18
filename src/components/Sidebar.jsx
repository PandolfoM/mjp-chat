import React from "react";
import Searchbar from "./Searchbar";
import Chats from "./Chats";
import { Box } from "@mantine/core";
import Profile from "./Profile";

const Sidebar = () => {
  return (
    <Box style={{ flex: 1, display: "flex", justifyContent: "space-between", flexDirection: "column" }} bg="tokyo.3">
      <Box>
        <Searchbar />
        <Chats />
      </Box>
      <Profile />
    </Box>
  );
};

export default Sidebar;
