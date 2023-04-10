import { createStyles } from "@mantine/core";
import UserChat from "./UserChat";
import CurrentUser from "./CurrentUser";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";

type Props = {
  userDoc: DocumentData | undefined;
};

const useStyles = createStyles((theme) => ({
  container: {
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

  allChats: {
    height: "100%",
    overflowY: "auto",
  },

  currentUserContainer: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.dark[6],
  },
}));

function Chats(props: Props) {
  const [friends, setFriends] = useState<Array<User>>([]);
  const { currentUser } = useContext(AuthContext);
  const { classes } = useStyles();
  const { getFriends } = useAuth();

  useEffect(() => {
    const unsub = async () => {
      await getFriends(setFriends);
    };

    if (currentUser) {
      return () => {
        unsub();
      };
    }
  }, []);

  // useEffect(() => {
  //   console.log(props.userDoc);
  // }, [friends]);

  return (
    <div className={classes.container}>
      <div className={classes.allChats}>
        {friends?.map((i: User) => (
          <UserChat user={i} userDoc={props.userDoc} key={i.uid} />
        ))}
      </div>
      <div className={classes.currentUserContainer}>
        <CurrentUser userDoc={props.userDoc} />
      </div>
    </div>
  );
}

export default Chats;
