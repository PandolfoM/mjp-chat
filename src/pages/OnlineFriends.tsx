import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import UserButton from "../components/UserButton";
import {
  ActionIcon,
  Tooltip,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Trash } from "react-feather";
import { User } from "../utils/interfaces";
import useAuth from "../hooks/useAuth";

type Props = {
  status: string;
};

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.xs,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
}));

function OnlineFriends(props: Props) {
  const { classes } = useStyles();
  const { friends } = useContext(AuthContext);
  const { removeFriend } = useAuth();
  const theme = useMantineTheme();
  const [onlineFriends, setOnlineFriends] = useState(friends);

  const filterOnline = (status: string) => {
    if (status === "all") {
      setOnlineFriends(friends);
    } else {
      setOnlineFriends(friends.filter((i) => i.status !== status));
    }
  };

  useEffect(() => {
    filterOnline(props.status);
  }, [props.status]);

  return (
    <>
      {onlineFriends?.map((i: User) => (
        <div className={classes.container} key={i.uid}>
          <div className={classes.btnContainer} key={i.uid}>
            <UserButton user={i} />
          </div>
          <Tooltip label="Delete" color="gray" withArrow>
            <ActionIcon
              radius="xl"
              variant="light"
              size="xl"
              onClick={() => removeFriend(i.uid)}>
              <Trash size={theme.fontSizes.lg} color={theme.colors.dark[0]} />
            </ActionIcon>
          </Tooltip>
        </div>
      ))}
    </>
  );
}

export default OnlineFriends;
