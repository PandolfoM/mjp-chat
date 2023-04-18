import { Button, Modal, TextInput, createStyles } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../utils/interfaces";
import UserButton from "./UserButton";
import { AuthContext } from "../auth/context";
import useAuth from "../hooks/useAuth";

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
    userSelect: "none",
    padding: theme.spacing.xs,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
}));

function AddFriendModal(props: Props) {
  const { classes } = useStyles();
  const { addFriend } = useAuth();
  const { currentUser, friends, setFriends } = useContext(AuthContext);
  const [searchedEmail, setSearchedEmail] = useState<string>("");
  const [debounced] = useDebouncedValue(searchedEmail, 200);
  const [foundUser, setFoundUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = async () => {
      if (debounced) {
        const ref = doc(db, "emails", debounced);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          const userRef = doc(db, "users", docSnap.data().uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setFoundUser(userSnap.data() as User);
          }
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
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (foundUser) {
            try {
              await addFriend(foundUser.uid);
              try {
                
                setFoundUser(null);
                setSearchedEmail("");
                props.close(true);
              } catch (error) {
                console.log(error);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }}>
        <TextInput
          value={searchedEmail}
          onChange={(e) => setSearchedEmail(e.currentTarget.value)}
          placeholder="Enter an email"
          w="100%"
          rightSection={
            <Button
              compact
              mr="5px"
              disabled={
                !foundUser
                  ? true
                  : foundUser?.uid === currentUser.uid
                  ? true
                  : friends.find((i) => i.uid === foundUser?.uid)
                  ? true
                  : false
              }
              type="submit">
              {foundUser?.uid === currentUser.uid
                ? "Cannot add yourself"
                : friends.find((i) => i.uid === foundUser?.uid)
                ? "Already friends"
                : "Send Request"}
            </Button>
          }
          rightSectionWidth={"auto"}
        />
      </form>

      {foundUser && (
        <div className={classes.user}>
          <UserButton user={foundUser} lastMessage={foundUser.email} />
        </div>
      )}
    </Modal>
  );
}

export default AddFriendModal;
