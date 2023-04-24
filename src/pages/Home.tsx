import { Divider, LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import {
  DocumentData,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { PageContext } from "../context/PageContext";
import Friends from "./Friends";
import CurrentUser from "../components/CurrentUser";
import FriendsButton from "../components/FriendsButton";

const useStyles = createStyles((theme) => ({
  home_page: {
    display: "flex",
  },
  content: {
    flex: 1,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: theme.spacing.md,
  },
  sidebar: {
    position: "relative",
    backgroundColor: theme.colors.dark[9],
    height: "100vh",
    maxWidth: 240,
    minWidth: 240,
    zIndex: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  currentUser: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.dark[6],
  },
  allChats: {
    height: "100%",
    overflowY: "auto",
  },
}));

function Home() {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { loading } = useContext(AuthContext);
  const { currentPage } = useContext(PageContext);
  const { classes } = useStyles();

  useEffect(() => {
    const unsub = async () => {
      const msgsRef = collection(db, "chats", currentPage, "messages");
      const q = query(msgsRef, orderBy("sentAt", "desc"), limit(20));
      const unsub = onSnapshot(q, (doc) => {
        setMessages(
          doc.docs.map((i) => ({
            sentAt: i.data().sentAt,
            sentBy: i.data().sentBy,
            text: i.data().text,
          }))
        );
      });

      return unsub;
    };

    currentPage && unsub();
  }, [currentPage]);

  return (
    <div className={classes.home_page}>
      <LoadingOverlay visible={loading} overlayOpacity={1} />
      <nav className={classes.sidebar}>
        <FriendsButton />
        <Divider my="sm" />
        <div className={classes.allChats}>
          <Chats />
        </div>
        <div className={classes.currentUser}>
          <CurrentUser />
        </div>
      </nav>

      {currentPage && (
        <div className={classes.content}>
          {currentPage !== "friends" ? (
            <>
              <ChatMessages chatData={messages} />
              <ChatBox />
            </>
          ) : (
            <Friends />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
