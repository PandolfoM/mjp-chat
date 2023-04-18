import { ActionIcon, Avatar, Text, createStyles } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings } from "react-feather";
import SettingsModal from "./SettingsModal";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import StatusIndicator from "./StatusIndicator";
import { StatusContext } from "../context/StatusContext";

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
  const { status } = useContext(StatusContext);

  return (
    <>
      <SettingsModal opened={opened} close={close} />
      <div className={classes.container}>
        <div className={classes.user}>
          {currentUserDoc && (
            <StatusIndicator
              user={currentUserDoc}
              status={status}
              borderColor={6}>
              <Avatar size={35} radius="xl" color={currentUserDoc?.color} />
            </StatusIndicator>
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
