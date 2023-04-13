import {
  Avatar,
  Button,
  Divider,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";
import StatusIndicator from "../components/StatusIndicator";
import AddFriendModal from "../components/AddFriendModal";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
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
  const [opened, { open, close }] = useDisclosure(false);

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
        </div>
        <div className={classes.navItems}>
          <Button compact size="xs" onClick={open}>
            Add Friend
          </Button>
        </div>
      </nav>
      <Divider my="sm" />
      {friends?.map((i: User) => (
        <div key={i.uid}>
          <div className={classes.container}>
            <StatusIndicator user={i} size={18} offset={7}>
              <Avatar size={48} radius="xl" color={i.color} />
            </StatusIndicator>
            <div>
              <Text fw="bold" truncate>
                {i.username}
              </Text>
            </div>
          </div>
          <Divider my="sm" />
        </div>
      ))}
    </>
  );
}

export default FriendsList;
