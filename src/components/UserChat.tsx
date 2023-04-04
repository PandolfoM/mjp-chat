import { Avatar, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing.sm,
  },
}));

type Props = {
  username: string;
};

function UserChat(prop: Props) {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Avatar size={48} alt={prop.username} radius="xl" color="red" />
      <Text fw="bold" truncate>
        {prop.username}
      </Text>
    </div>
  );
}

export default UserChat;
