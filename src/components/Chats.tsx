import { Box, createStyles } from "@mantine/core";
import UserChat from "./UserChat";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    padding: theme.spacing.sm,
    backgroundColor: "black",
    height: "100vh",
    overflowY: "auto",
    maxWidth: 240,
    minWidth: 240,
    zIndex: 10,
  },
}));

function Chats() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <UserChat username={"Hello"} />
      <UserChat username={"Jit Ski Yo Dawg Dawg Dawg"} />
    </div>
  );
}

export default Chats;
