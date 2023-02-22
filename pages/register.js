import styles from "@styles/Home.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, firestore } from "../lib/firebase";

export default function Register() {
  const [username, setUsername] = useState("");
  const [nameReady, setNameReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit formState } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onChange",
  });
  const { isValid, isDirty, errors } = formState;

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  const registerUser = async ({ email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const ref = firestore.collection("users").doc(res.user.uid);
      const usernameRef = firestore.collection("usernames").doc(username);

      const batch = firestore.batch();
      batch.set(ref, {
        email,
        username,
      });
      batch.set(usernameRef, { uid: res.user.uid });
      await batch.commit();

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        console.log(ref.get());
        const { exists } = await ref.get();
        setNameReady(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
      return <p className="text-danger">That username is taken!</p>;
    } else {
      return <p></p>;
    }
  }

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setUsername(val);
      setLoading(false);
      setNameReady(false);
    }

    if (re.test(val)) {
      setUsername(val);
      setLoading(true);
      setNameReady(false);
    }
  };

  return (
    <main className={styles.container}>
      <h3>Create an account</h3>
      <form onSubmit={handleSubmit(registerUser)}>
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
          <label>Username</label>
          <input type={"text"} value={username} onChange={handleChange} />
          <UsernameMessage
            username={username}
            isValid={nameReady}
            loading={loading}
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
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={styles.submit}>
          Continue
        </button>
        <a onClick={() => router.push(`/login`)}>Already have an account?</a>
      </form>
    </main>
  );
}
