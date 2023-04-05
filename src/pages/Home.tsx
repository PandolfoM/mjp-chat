import { LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  home_page: {
    display: "flex",
  },
  content: {
    flex: 1,
    height: "100vh",
    display: "flex",
    justifyContent: "end",
    flexDirection: "column",
    overflow: "hidden",
  },
}));

function Home() {
  const { currentUser, loading } = useContext(AuthContext);
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      console.log(currentUser);
      if (!currentUser) {
        navigate("/login");
      }
    }
  }, [loading]);

  return (
    <div className={classes.home_page}>
      <LoadingOverlay visible={loading} overlayOpacity={1} />
      <Chats /> {/* Sidebar with all current chats */}
      <div className={classes.content}>
        <ChatMessages />
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
