import { ActionIcon, Avatar, Text, createStyles } from "@mantine/core";
import { Settings } from "react-feather";

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
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.user}>
        <Avatar size={35} radius="xl" color="red" />
        <Text fw="bold" fz="xs" truncate>
          Matthew Pandolfo
        </Text>
      </div>
      <ActionIcon variant="subtle">
        <Settings size={20} />
      </ActionIcon>
    </div>
  );
}

export default CurrentUser;
