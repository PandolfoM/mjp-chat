import {
  faArrowUpFromBracket,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Container,
  FileInput,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values) => {
    const email = values.email;
    const password = values.password;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
      bg={"tokyo.0"}
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
          background: theme.colors.tokyo[1],
          color: theme.colors.tokyo[2],
        }}>
        <Title order={2}>MJP Chat</Title>
        <Title order={3}>Login</Title>
        <Flex direction="column" gap="sm" w={"250px"}>
          <TextInput
            type={"email"}
            placeholder="Email"
            variant="unstyled"
            px="sm"
            bg="tokyo.9"
            sx={(theme) => ({
              borderRadius: "5px",
              input: {
                color: theme.colors.tokyo[2],
                "&::placeholder": { color: theme.colors.tokyo[10], opacity: 1 },
              },
            })}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Password"
            variant="unstyled"
            bg="tokyo.9"
            sx={(theme) => ({
              borderRadius: "5px",
              input: {
                color: theme.colors.tokyo[2],
                "&::placeholder": { color: theme.colors.tokyo[10], opacity: 1 },
              },
              ".mantine-PasswordInput-rightSection button": {
                "&:hover": {
                  background: "transparent",
                  color: theme.colors.tokyo[5],
                },
              },
            })}
            {...form.getInputProps("password")}
          />
          <Button
            type="submit"
            bg={theme.colors.tokyo[15]}
            sx={{ "&:hover": { background: theme.colors.tokyo[16] } }}>
            Login
          </Button>
        </Flex>
        <Text fz={"xs"} c={theme.colors.tokyo[10]}>
          Don't have an account?{" "}
          <Link
            to={"/signup"}
            style={{
              textDecoration: "none",
              color: theme.colors.tokyo[2],
            }}>
            Sign Up
          </Link>
        </Text>
      </form>
    </Flex>
  );
};

export default Login;
