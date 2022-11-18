import { Avatar, Flex, Text, TextInput, useMantineTheme } from "@mantine/core";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Searchbar = () => {
  const theme = useMantineTheme()
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error(err);
    }

    setUser(null);
    setUsername("");
  };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div style={{ borderBottom: `1px solid ${theme.colors.tokyo[9]}` }}>
      <div>
        <TextInput
          autoComplete="false"
          autoCapitalize="false"
          autoCorrect="false"
          placeholder="Find User"
          variant="unstyled"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
          p="xs"
          sx={(theme) => ({
            input: {
              background: theme.colors.tokyo[9],
              borderRadius: "5px",
              color: theme.colors.tokyo[2],
              "&::placeholder": { color: theme.colors.tokyo[10], opacity: 1 },
            },
          })}
        />
      </div>
      {user && (
        <Flex
          align={"center"}
          gap="0.5rem"
          p="0.5rem"
          m={"xs"}
          c={"tokyo.2"}
          sx={{ cursor: "pointer" }}
          onClick={handleSelect}>
          <Avatar src={user.photoURL} radius="xl"></Avatar>
          <div>
            <Text>{user.displayName}</Text>
          </div>
        </Flex>
      )}
    </div>
  );
};

export default Searchbar;
