import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FileInput,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      file: null,
    },

    validate: {
      email: (value) =>
        /[a-z0-9]+@[a-z]+.[a-z]{2,3}/.test(value) ? null : "Invalid email",
    },
  });

  const handleSubmit = async (values) => {
    const email = values.email;
    const displayName = values.username;
    const password = values.password;
    const file = values.file;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            
            navigate("/");
          } catch (error) {
            console.error(error);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
      h={"100vh"}>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          boxShadow: "8px 8px 10px 0px rgba(0,0,0,0.2)",
          borderRadius: "5px",
          padding: "1rem",
        }}>
        <Title order={2}>MJP Chat</Title>
        <Title order={3}>Sign Up</Title>
        <Flex direction="column" gap="sm" w={"250px"}>
          <TextInput
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <TextInput
            type={"email"}
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <FileInput
            placeholder="Profile Picture"
            {...form.getInputProps("file")}
            icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
          />
          <Button type="submit">Sign Up</Button>
        </Flex>
        <Text>Already have account? <Link to={"/login"} style={{textDecoration: "none"}}> Login</Link></Text>
      </form>
    </Flex>
  );
};

export default Register;
