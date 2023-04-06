import { LoadingOverlay, createStyles } from "@mantine/core";
import ChatBox from "../components/ChatBox";
import Chats from "../components/Chats";
import ChatMessages from "../components/ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

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
  const { currentUser, loading } = useContext(AuthContext);
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
