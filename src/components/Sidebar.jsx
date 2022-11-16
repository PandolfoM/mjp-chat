import React from "react";
import Searchbar from "./Searchbar";
import Chats from "./Chats";

const Sidebar = () => {
  return (
    <div style={{ flex: 1, background: "orange" }}>
      <Searchbar />
      <Chats />
    </div>
  );
};

export default Sidebar;
