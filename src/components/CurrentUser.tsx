import {
  ActionIcon,
  Avatar,
  Indicator,
  Text,
  createStyles,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Settings } from "react-feather";
import SettingsModal from "./SettingsModal";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { DocumentData } from "firebase/firestore";

type Props = {
  userDoc: DocumentData | undefined;
};

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

function CurrentUser(props: Props) {
  const { currentUser } = useContext(AuthContext);
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SettingsModal opened={opened} close={close} />
      <div className={classes.container}>
        <div className={classes.user}>
          <Indicator
            withBorder
            position="bottom-end"
            offset={5}
            size={13}
            color={
              props.userDoc?.status === "idle"
                ? "yellow"
                : props.userDoc?.status === "offline"
                ? "grey"
                : "green"
            }>
            <Avatar size={35} radius="xl" color={props.userDoc?.color} />
          </Indicator>
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
