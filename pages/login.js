import { auth } from "@lib/firebase";
import styles from "@styles/Home.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const { isValid, isDirty, errors } = formState;

  const signinUser = async ({ email, password }) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push("/");
        })
        .catch((e) => {
          let code = e.code;
          if (code === "auth/user-not-found") {
            setError("Invalid Email");
          } else if (code === "auth/wrong-password") {
            setError("Invalid Password");
          }
          console.log(e.code);
        });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <main className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(signinUser)}>
        <fieldset>
          <label>Email</label>
          <input
            {...register("email", {
              required: { value: true, message: "Email is required!" },
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
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
        {error && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={styles.submit}>
          Log In
        </button>
        <p>
          Need an account?{" "}
          <a onClick={() => router.push(`/register`)}>Register</a>
        </p>
      </form>
    </main>
  );
}
