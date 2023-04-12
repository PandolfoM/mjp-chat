import { Avatar, Divider, Text, Title, createStyles } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../auth/context";
import { User } from "../utils/interfaces";
import StatusIndicator from "../components/StatusIndicator";

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
}));

function FriendsList() {
  const { classes } = useStyles();
  const { friends } = useContext(AuthContext);
  return (
    <>
      <Title order={3}>Friends</Title>
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
