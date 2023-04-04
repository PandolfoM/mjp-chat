import * as Yup from "yup";
import {
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const schema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  type FormValues = typeof form.values;
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    validate: yupResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const res = await loginUser(values.email, values.password);
    setLoading(true);
    if (res !== "success") {
      setError(res);
      setLoading(false);
    } else {
      setLoading(false);
      form.reset();
      navigate("/");
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
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps("password")}
          />
        </>
        {error && <Text c="red">{error}</Text>}
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
