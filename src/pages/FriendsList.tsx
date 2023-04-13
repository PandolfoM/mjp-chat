import {
  ActionIcon,
  Button,
  Divider,
  Title,
  Tooltip,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";
import AddFriendModal from "../components/AddFriendModal";
import { useDisclosure } from "@mantine/hooks";
import UserButton from "../components/UserButton";
import { Trash } from "react-feather";
import useAuth from "../hooks/useAuth";

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
  },
}));

function FriendsList() {
  const { classes } = useStyles();
  const { friends } = useContext(AuthContext);
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { removeFriend } = useAuth();

  return (
    <>
      <AddFriendModal opened={opened} close={close} />
      <nav className={classes.nav}>
        <div className={classes.navItems}>
          <Title order={3}>Friends</Title>
        </div>
        <div className={classes.navItems}>
          <Button variant="subtle" className={classes.textColor}>
            Online
          </Button>
          <Button variant="subtle" className={classes.textColor}>
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
      {friends?.map((i: User) => (
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
      ))}
    </>
  );
}

export default FriendsList;
