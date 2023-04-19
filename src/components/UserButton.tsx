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
      <Avatar size={48} radius="xl" color={props.user.color} />
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
