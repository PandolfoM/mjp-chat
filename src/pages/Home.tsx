import { Divider, LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { StatusContext } from "../context/StatusContext";
import FriendsList from "../pages/FriendsList";
import CurrentUser from "../components/CurrentUser";
import FriendsButton from "../components/FriendsButton";
import { User } from "../utils/interfaces";

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
  const [userDoc, setUserDoc] = useState<User>();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { currentUser, loading } = useContext(AuthContext);
  const { currentPage } = useContext(StatusContext);
  const { classes } = useStyles();

  useEffect(() => {
    const unsub = async () => {
      if (currentUser) {
        const docSnap = await getDoc(doc(db, "users", currentUser?.uid));
        setUserDoc(docSnap.data() as User);
      }
    };

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = async () => {
      const msgsRef = collection(db, "chats", currentPage, "messages");
      const q = query(msgsRef, orderBy("sentAt", "asc"), limit(20));
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
          <Chats userDoc={userDoc} />
        </div>
        {userDoc && (
          <div className={classes.currentUser}>
            <CurrentUser userDoc={userDoc} />
          </div>
        )}
      </nav>

      {currentPage && (
        <div className={classes.content}>
          {currentPage === "friends" && <FriendsList />}

          <ChatMessages chatData={messages} userDoc={userDoc} />
          <ChatBox />
        </div>
      )}
    </div>
  );
}

export default Home;
