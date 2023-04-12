import { LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import {
  DocumentData,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { StatusContext } from "../context/StatusContext";

const useStyles = createStyles(() => ({
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
  const [userDoc, setUserDoc] = useState<DocumentData | undefined>(undefined);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { currentUser, loading } = useContext(AuthContext);
  const { currentChat } = useContext(StatusContext);
  const { classes } = useStyles();

  useEffect(() => {
    const unsub = async () => {
      if (currentUser) {
        const unsub = onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
          setUserDoc(doc.data());
        });

        return () => {
          unsub();
        };
      }
    };

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = async () => {
      const msgsRef = collection(db, "chats", currentChat, "messages");
      const q = query(msgsRef, orderBy("sentAt"), limit(20));
      onSnapshot(q, (doc) => {
        setMessages([]);
        doc.forEach((e) => {
          setMessages((current) => [...current, e.data()]);
        });
      });
    };

    currentChat && unsub();
  }, [currentChat]);

  return (
    <div className={classes.home_page}>
      <LoadingOverlay visible={loading} overlayOpacity={1} />
      <Chats userDoc={userDoc} /> {/* Sidebar with all current chats */}
      {currentChat && (
        <div className={classes.content}>
          <ChatMessages chatData={messages} userDoc={userDoc} />
          <ChatBox />
        </div>
      )}
    </div>
  );
}

export default Home;
