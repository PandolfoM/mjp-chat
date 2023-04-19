import {
  Button,
  Divider,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import AddFriendModal from "../components/AddFriendModal";
import { useDisclosure } from "@mantine/hooks";
import FriendsList from "./FriendsList";
import PendingFriends from "./PendingFriends";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.xs,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  nav: {
    display: "flex",
    gap: theme.spacing.xl,
    alignItems: "center",
  },
  navItems: {
    display: "flex",
    gap: theme.spacing.sm,
  },
  textColor: {
    color: theme.colors.dark[0],
    padding: theme.spacing.xs,
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
}));

function Friends() {
  const [currentList, setCurrentList] = useState<string>("all");
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();

  return (
    <>
      <AddFriendModal opened={opened} close={close} />
      <nav className={classes.nav}>
        <div className={classes.navItems}>
          <Title order={3}>Friends</Title>
        </div>
        <div className={classes.navItems}>
          <Button
            variant="subtle"
            className={classes.textColor}
            sx={{
              backgroundColor:
                currentList === "all" ? theme.colors.dark[5] : "inherit",
            }}
            onClick={() => setCurrentList("all")}>
            All
          </Button>
          <Button
            variant="subtle"
            className={classes.textColor}
            sx={{
              backgroundColor:
                currentList === "pending" ? theme.colors.dark[5] : "inherit",
            }}
            onClick={() => setCurrentList("pending")}>
            Pending
          </Button>
        </div>
        <div className={classes.navItems}>
          <Button compact size="xs" onClick={open}>
            Add Friend
          </Button>
        </div>
      </nav>
      <Divider my="sm" />
      {
        {
          all: <FriendsList />,
          pending: <PendingFriends />,
        }[currentList]
      }
    </>
  );
}

export default Friends;
