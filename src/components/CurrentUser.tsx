import { ActionIcon, Avatar, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings } from "react-feather";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { SettingsModal } from "./Settings";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    maxWidth: "75%",
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
}));

function CurrentUser() {
  const { currentUser, currentUserDoc } = useContext(AuthContext);
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SettingsModal opened={opened} close={close} />
      <div className={classes.container}>
        <div className={classes.user}>
          {currentUserDoc && (
            <Avatar size={35} radius="xl" color={currentUserDoc.color} />
          )}
          <Text fw="bold" fz="xs" truncate>
            {currentUser?.displayName}
          </Text>
        </div>
        <ActionIcon variant="subtle" onClick={open}>
          <Settings size={20} />
        </ActionIcon>
      </div>
    </>
  );
}

export default CurrentUser;
