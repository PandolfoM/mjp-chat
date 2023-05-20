import * as Yup from "yup";
import { Button, PasswordInput, Text, createStyles } from "@mantine/core";
import { updatePassword } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import useAuth from "../hooks/useAuth";

const useStyles = createStyles(() => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  form: {
    width: "20rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
}));

const schema = Yup.object().shape({
  old: Yup.string().required("Old Password is required"),
  new: Yup.string()
    .required("New Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Does not meet requirements"
    ),
});

function PasswordReset() {
  const { classes } = useStyles();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm({
    validate: yupResolver(schema),
    validateInputOnChange: true,
    initialValues: {
      old: "",
      new: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      await resetPassword(values.new, values.old);
      navigate("/");
    } catch (e) {
      setError("There has been an error!");
    }
  };

  return (
    <div className={classes.container}>
      <h3>Password Reset</h3>
      <form
        className={classes.form}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <PasswordInput
          placeholder="Old Password"
          {...form.getInputProps("old")}
        />
        <PasswordInput
          placeholder="New Password"
          {...form.getInputProps("new")}
        />
        {error && <Text c="red">{error}</Text>}
        <Button w={"100%"} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PasswordReset;
