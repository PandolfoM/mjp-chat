import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { Flex } from "@mantine/core";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <Flex justify="center" align="center" direction="row" h={"100vh"}>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "90%",
          borderRadius: "5px",
          border: "orange 2px solid",
          overflow: "hidden",
          boxShadow: "8px 8px 10px 0px rgba(0,0,0,0.2)",
          flexDirection: "column"
        }}>
        <div style={{ flexDirection: "row" }}>
          <Navbar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: "100%",
          }}>
          <Sidebar />
          <Chat />
        </div>
      </div>
    </Flex>
  );
}

export default Home;
