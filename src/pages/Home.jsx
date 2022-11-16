import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Flex } from "@mantine/core";

function Home() {
  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      h={"100vh"}
      >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "65%",
          height: "80%",
          boxShadow: "8px 8px 10px 0px rgba(0,0,0,0.2)",
          borderRadius: "5px",
          border: "orange 2px solid",
          overflow: "hidden",
        }}>
        <Sidebar />
        <Chat />
      </div>
    </Flex>
  );
}

export default Home;
