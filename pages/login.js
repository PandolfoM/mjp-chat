import styles from "@styles/Home.module.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { isValid, isDirty, errors } = formState;

  return (
    <main className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Email</label>
          <input
            type={"email"}
            {...register("email", {
              required: { value: true, message: "Email is required!" },
            })}
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <input
            type={"password"}
            {...register("password", {
              required: { value: true, message: "Password is required!" },
            })}
          />
        </fieldset>
        <button type="submit" disabled={!isDirty} className={styles.submit}>
          Log In
        </button>
        <a onClick={() => router.push(`/register`)}>Register</a>
      </form>
    </main>
  );
}
