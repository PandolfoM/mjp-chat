import { createStyles } from "@mantine/core";
import UserChat from "./UserChat";
import CurrentUser from "./CurrentUser";
import { UserDoc } from "../utils/interfaces";

type Props = {
  userDoc: UserDoc | null;
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
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.allChats}>
        <UserChat username={"First"} />
        <UserChat username={"LONG USERNAME LONG USERNAME"} />
        <UserChat username={"Last"} />
      </div>
      <div className={classes.currentUserContainer}>
        <CurrentUser userDoc={props.userDoc} />
      </div>
    </div>
  );
}

export default Chats;
