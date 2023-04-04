import * as Yup from "yup";
import { Box, Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const form = useForm({
    validate: yupResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="form_page">
      <form onSubmit={handleSubmit}>
        <>
          <TextInput
            withAsterisk
            label="Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps("password")}
          />
        </>
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
      <Text>
        New around these parts?{" "}
        <Button compact variant="subtle">
          <Link to={"/register"}>Register</Link>
        </Button>
      </Text>
    </div>
  );
}

export default Login;
