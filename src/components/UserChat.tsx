import { Avatar, Skeleton, Text, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";

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
};

function UserChat(props: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Avatar size={48} radius="xl" color="red" />
      <Text fw="bold" truncate>
        {props.user?.username}
      </Text>
    </div>
  );
}

export default UserChat;
