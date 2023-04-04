import * as Yup from "yup";
import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Does not meet requirements"
    ),
  username: Yup.string()
    .required("Username is required")
    .min(1, "Username must be at least 1 character"),
});

function Register() {
  type FormValues = typeof form.values;

  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { newUser } = useAuth();
  const form = useForm({
    validate: yupResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const res = await newUser(values.email, values.password, values.username);
    setLoading(true);
    if (res !== "success") {
      setError(res);
    } else {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="form_page">
      <LoadingOverlay visible={loading} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
          {error && <Text c="red">{error}</Text>}
        </>
        <Button type="submit" fullWidth>
          Register
        </Button>
      </form>
      <Text>
        Have an account?{" "}
        <Button compact variant="subtle">
          <Link to={"/login"}>Login</Link>
        </Button>
      </Text>
    </div>
  );
}

export default Register;
