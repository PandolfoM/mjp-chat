import StatusIndicator from "./StatusIndicator";
import { Avatar, Text, createStyles } from "@mantine/core";
import { User } from "../utils/interfaces";

type Props = {
  lastMessage?: string;
  user: User;
};

const useStyles = createStyles(() => ({
  content: {
    overflow: "hidden",
  },
}));

function UserButton(props: Props) {
  const { classes } = useStyles();
  return (
    <>
      <StatusIndicator user={props.user} size={18} offset={7}>
        <Avatar size={48} radius="xl" color={props.user.color} />
      </StatusIndicator>
      <div className={classes.content}>
        <Text fw="bold" truncate>
          {props.user.username}
        </Text>
        {props.lastMessage && (
          <Text color="dimmed" fz={"sm"} truncate>
            {props.lastMessage}
          </Text>
        )}
      </div>
    </>
  );
}

export default UserButton;
