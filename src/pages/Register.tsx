import * as Yup from "yup";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { isEmail, useForm, yupResolver } from "@mantine/form";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Does not meet requirements"
    ),
  username: Yup.string().required().min(1),
});

function Register() {
  const form = useForm({
    validate: yupResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      confirmPass: "",
      username: "",
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <>
          <TextInput
            withAsterisk
            label="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            description="Must be at least 8 characters long and include at least one letter, number and special character"
            {...form.getInputProps("password")}
          />
        </>
        <Button type="submit">Register</Button>
      </form>
      <Text>
        Have an account?{" "}
        <Button compact variant="subtle">
          Login
        </Button>
      </Text>
    </>
  );
}

export default Register;
