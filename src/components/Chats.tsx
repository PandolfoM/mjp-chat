import { Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    padding: theme.spacing.sm,
    backgroundColor: "black",
    maxHeight: "100vh",
    overflowY: "auto",
  },
  child: {
    marginBottom: theme.spacing.sm,
    backgroundColor: "red",
    borderRadius: "30px",
    minWidth: "55px",
    minHeight: "55px",
  },
}));

function Chats() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
      <Box className={classes.child}></Box>
    </div>
  );
}

export default Chats;
