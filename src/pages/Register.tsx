import { Button, PasswordInput, TextInput } from "@mantine/core";

function Register() {
  return (
    <form>
      <TextInput withAsterisk label="Email" />
      <PasswordInput
        withAsterisk
        label="Password"
        description="Must include at least one letter, number and special character"
      />
      <PasswordInput withAsterisk label="Confirm Password" />
      <Button>Register</Button>
    </form>
  );
}

export default Register;
