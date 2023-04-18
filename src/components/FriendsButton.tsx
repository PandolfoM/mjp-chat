import { Button, createStyles } from "@mantine/core";
import { useContext } from "react";
import { Users } from "react-feather";
import { StatusContext } from "../context/StatusContext";

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colors.dark[0],
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
}));

function FriendsButton() {
  const { classes } = useStyles();
  const { setCurrentPage } = useContext(StatusContext);

  return (
    <Button
      onClick={() => setCurrentPage("friends")}
      fullWidth
      variant="subtle"
      size="md"
      className={classes.button}
      leftIcon={<Users />}>
      Friends
    </Button>
  );
}

export default FriendsButton;
