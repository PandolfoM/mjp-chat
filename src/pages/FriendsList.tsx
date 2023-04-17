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
import OnlineFriends from "./OnlineFriends";

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

function FriendsList() {
  const [currentList, setCurrentList] = useState<string>("online");
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
                currentList === "online" ? theme.colors.dark[5] : "inherit",
            }}
            onClick={() => setCurrentList("online")}>
            Online
          </Button>
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
          <Button variant="subtle" className={classes.textColor}>
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
          online: <OnlineFriends status="offline" />,
          all: <OnlineFriends status="all" />,
        }[currentList]
      }
      {/* {friends?.map((i: User) => (
        <div className={classes.container} key={i.uid}>
          <div className={classes.btnContainer} key={i.uid}>
            <UserButton user={i} />
          </div>
          <Tooltip label="Delete" color="gray" withArrow>
            <ActionIcon
              radius="xl"
              variant="light"
              size="xl"
              onClick={() => removeFriend(i.uid)}>
              <Trash size={theme.fontSizes.lg} color={theme.colors.dark[0]} />
            </ActionIcon>
          </Tooltip>
        </div>
      ))} */}
    </>
  );
}

export default FriendsList;
