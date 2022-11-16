import {
  faArrowUpFromBracket,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  FileInput,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";

const Register = () => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
      h={"100vh"}>
      <Flex
        p={"xl"}
        direction="column"
        gap={"sm"}
        align="center"
        sx={{
          boxShadow: "8px 8px 10px 0px rgba(0,0,0,0.2)",
          borderRadius: "5px",
        }}>
        <Title order={2}>MJP Chat</Title>
        <Title order={3}>Sign Up</Title>
        <Flex direction="column" gap="sm" w={"250px"}>
          <TextInput placeholder="Username"/>
          <TextInput type={"email"} placeholder="Email" />
          <PasswordInput placeholder="Password" />
          <FileInput
            placeholder="Profile Picture"
            icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
          />
          <Button>Sign Up</Button>
        </Flex>
        <Text>Already have account? Sign in</Text>
      </Flex>
    </Flex>
  );
};

export default Register;
