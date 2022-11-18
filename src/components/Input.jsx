import {
  faArrowUpFromBracket,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, FileButton, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const form = useForm({
    initialValues: {
      text: "",
      file: null,
      img: null,
    },
  });

  const handleSend = async () => {
    const text = form.values.text;
    const img = form.values.img;

    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    form.setValues({
      text: "",
      file: null,
      img: null,
    });
  };

  return (
    <Box p={"sm"}>
      <Box
        component="form"
        bg={"tokyo.0"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "5px",
        }}>
        <Textarea
          w={"100%"}
          placeholder={
            data.user?.displayName ? `Message @${data.user?.displayName}` : ""
          }
          autosize
          minRows={1}
          px="sm"
          variant="unstyled"
          disabled={!data.user?.displayName}
          sx={(theme) => ({
            ".mantine-tlqs1f": {
              color: theme.colors.tokyo[2],
              "&::placeholder": { color: theme.colors.tokyo[10], opacity: 1 },
            },
          })}
          {...form.getInputProps("text")}
        />
        <Flex align={"center"} justify="space-between">
          <FileButton
            {...form.getInputProps("file")}
            sx={(theme) => ({
              color: theme.colors.tokyo[10],
              "&:hover": {
                background: "transparent",
                color: theme.colors.tokyo[5],
              },
            })}>
            {(props) => (
              <Button {...props} size={"sm"} variant="subtle">
                <FontAwesomeIcon icon={faPaperclip} />
              </Button>
            )}
          </FileButton>
          <FileButton
            accept="image/png,image/jpeg"
            {...form.getInputProps("img")}
            sx={(theme) => ({
              color: theme.colors.tokyo[10],
              "&:hover": {
                background: "transparent",
                color: theme.colors.tokyo[5],
              },
            })}>
            {(props) => (
              <Button {...props} size={"sm"} variant="subtle">
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </Button>
            )}
          </FileButton>
          <Button
            size={"sm"}
            variant="subtle"
            onClick={handleSend}
            sx={(theme) => ({
              color: theme.colors.tokyo[10],
              "&:hover": {
                background: "transparent",
                color: theme.colors.tokyo[5],
              },
            })}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Input;
