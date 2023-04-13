import { Button, Modal, TextInput, createStyles } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../utils/interfaces";
import UserButton from "./UserButton";

type Props = {
  opened: boolean;
  close: any;
};

const useStyles = createStyles((theme) => ({
  container: {
    position: "relative",
    zIndex: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  user: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    userSelect: "none",
  },
}));

function AddFriendModal(props: Props) {
  const { classes } = useStyles();
  const [searchedEmail, setSearchedEmail] = useState<string>("");
  const [debounced] = useDebouncedValue(searchedEmail, 200);
  const [foundUser, setFoundUser] = useState<User>();

  useEffect(() => {
    const unsub = async () => {
      const ref = doc(db, "emails", debounced);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const userRef = doc(db, "users", docSnap.data().uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          console.log(userSnap.data());

          setFoundUser(userSnap.data() as User);
        }
      }
    };

    unsub();
  }, [debounced]);

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      withCloseButton={false}
      centered
      size="50%"
      classNames={{ body: classes.container }}>
      <TextInput
        value={searchedEmail}
        onChange={(e) => setSearchedEmail(e.currentTarget.value)}
        placeholder="Enter an email"
        w="100%"
        rightSection={
          <Button compact disabled={foundUser ? false : true}>
            Send Request
          </Button>
        }
        rightSectionWidth={"20%"}
      />

      {foundUser && (
        <div className={classes.user}>
          <UserButton user={foundUser} />
        </div>
      )}
    </Modal>
  );
}

export default AddFriendModal;
