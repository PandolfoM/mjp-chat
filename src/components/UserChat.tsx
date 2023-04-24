import { ActionIcon, Box, createStyles, useMantineTheme } from "@mantine/core";
import { Chat, User } from "../utils/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "../context/PageContext";
import { db } from "../firebase";
import { AuthContext } from "../auth/context";
import UserButton from "./UserButton";
import { X } from "react-feather";
import useMessages from "../hooks/useMessages";

type Props = {
  chat: Chat;
};

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },

  hideBtn: {
    position: "absolute",
    right: 0,
  },

  content: {
    overflow: "hidden",
  },
}));

function UserChat(props: Props) {
  const [user, setUser] = useState<User>();
  const [hover, setHover] = useState<boolean>(false);
  const { classes } = useStyles();
  const { hideMessage } = useMessages();
  const { setCurrentPage, currentPage } = useContext(PageContext);
  const { currentUser } = useContext(AuthContext);
  const theme = useMantineTheme();

  useEffect(() => {
    const getOtherUser = (): string => {
      const filter = props.chat.users.filter(
        (user) => user !== currentUser.uid
      );
      return filter[0];
    };

    const unsub = async () => {
      const ref = doc(db, "users", getOtherUser());
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setUser(docSnap.data() as User);
      }
    };

    return () => {
      unsub();
    };
  }, []);

  return (
    <Box
      className={classes.container}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        backgroundColor:
          currentPage === props.chat.id ? theme.colors.dark[5] : "inherit",
      }}
      onClick={() => setCurrentPage(props.chat.id)}>
      {user && <UserButton user={user} lastMessage={props.chat.lastMessage} />}
      {hover && (
        <ActionIcon
          radius="xl"
          variant="transparent"
          size="xl"
          className={classes.hideBtn}
          onClick={() => hideMessage(props.chat.id)}>
          <X size={theme.fontSizes.lg} color={theme.colors.dark[0]} />
        </ActionIcon>
      )}
    </Box>
  );
}

export default UserChat;
