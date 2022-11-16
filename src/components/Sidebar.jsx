import React from "react";
import { Flex } from "@mantine/core";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div style={{ flex: 1, background: "orange" }}>
      <Navbar />
      <Searchbar />
      <Chats />
    </div>
  );
};

export default Sidebar;
