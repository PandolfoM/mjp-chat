import React from "react";
import Message from "./Message";

function Messages() {
  return (
    <div style={{background: "gray", height: "100%", overflowY: "auto"}}>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
