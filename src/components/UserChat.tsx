import { Avatar, Skeleton, Text, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";
import StatusIndicator from "./StatusIndicator";
import { DocumentData } from "firebase/firestore";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
}));

type Props = {
  user: User;
  userDoc: DocumentData | undefined;
};

function UserChat(props: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <StatusIndicator user={props.user}>
        <Avatar size={48} radius="xl" color={props.user.color} />
      </StatusIndicator>
      <Text fw="bold" truncate>
        {props.user.username}
      </Text>
    </div>
  );
}

export default UserChat;
