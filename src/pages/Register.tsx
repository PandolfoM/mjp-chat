import * as Yup from "yup";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import useAuth from "../hooks/useAuth";

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
  type FormValues = typeof form.values;
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
    console.log(res);
  };

  return (
    <div className="form_page">
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
        </>
        <Button type="submit" fullWidth>
          Register
        </Button>
      </form>
      <p>
        Have an account?{" "}
        <Button compact variant="subtle">
          Login
        </Button>
      </p>
    </div>
  );
}

export default Register;
