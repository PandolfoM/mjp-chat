import { Avatar, Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    overflowY: "auto",
  },
  povMessage: {
    width: "100%",
    minHeight: 50,
    display: "flex",
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
  },
  messageName: {
    gap: theme.spacing.xs,
    display: "flex",
    alignItems: "flex-end",
  },
}));

function ChatMessages() {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.povMessage}>
        <Avatar size={48} radius="xl" color="red" />
        <div>
          <div className={classes.messageName}>
            <Text fw="bold">Matthew Pandolfo</Text>
            <Text fz="xs" c="dimmed">
              Now
            </Text>
          </div>
          <Text>This is my test message thank you!</Text>
        </div>
      </div>
    </div>
  );
}

export default ChatMessages;
