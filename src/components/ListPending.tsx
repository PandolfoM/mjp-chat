import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { User } from "../utils/interfaces";
import {
  ActionIcon,
  LoadingOverlay,
  Tooltip,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import UserButton from "./UserButton";
import { Check, Trash } from "react-feather";
import { AuthContext } from "../auth/context";
import useAuth from "../hooks/useAuth";

type Props = {
  uid: string;
  id: string;
  incoming: boolean;
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
  btnActions: {
    display: "flex",
    gap: theme.spacing.sm,
  },
}));

function ListPending(props: Props) {
  const { classes } = useStyles();
  const { currentUser } = useContext(AuthContext);
  const { removeFriendRequest, acceptFriend } = useAuth();
  const [user, setUser] = useState<User>();
  const theme = useMantineTheme();

  useEffect(() => {
    const getUser = async () => {
      const ref = doc(db, "users", props.uid);
      const userSnap = await getDoc(ref);
      setUser(userSnap.data() as User);
    };

    getUser();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {user ? (
        <div className={classes.container}>
          <div className={classes.btnContainer}>
            <UserButton user={user} />
          </div>
          <div className={classes.btnActions}>
            {props.incoming && (
              <Tooltip
                label="Accept"
                color="gray"
                withArrow
                onClick={() => acceptFriend(props.id, user.uid)}>
                <ActionIcon radius="xl" variant="light" size="xl">
                  <Check
                    size={theme.fontSizes.lg}
                    color={theme.colors.dark[0]}
                  />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip
              label="Delete"
              color="gray"
              withArrow
              onClick={() => removeFriendRequest(props.id)}>
              <ActionIcon radius="xl" variant="light" size="xl">
                <Trash size={theme.fontSizes.lg} color={theme.colors.dark[0]} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      ) : (
        <LoadingOverlay visible={true} />
      )}
    </div>
  );
}

export default ListPending;
