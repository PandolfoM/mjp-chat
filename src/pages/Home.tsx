import { LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import useAuth from "../hooks/useAuth";
import { UserDoc } from "../utils/interfaces";

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
  const [userDoc, setUserDoc] = useState<UserDoc | null>(null);
  const { currentUser, loading } = useContext(AuthContext);
  const { classes } = useStyles();
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    const unsub = async () => {
      if (currentUser) {
        const getData = await getCurrentUser();
        setUserDoc(getData);
      }
    };

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className={classes.home_page}>
      <LoadingOverlay visible={loading} overlayOpacity={1} />
      <Chats userDoc={userDoc} /> {/* Sidebar with all current chats */}
      <div className={classes.content}>
        <ChatMessages />
        <ChatBox />
      </div>
    </div>
  );
}

export default Home;
