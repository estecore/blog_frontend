"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchAuth, selectAuth } from "@/redux/slices/auth";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Invalid email or password");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register("email", { required: "E-Mail is required" })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : "Write your E-Mail"}
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />
        <Button
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isValid}
        >
          Log in
        </Button>
      </form>
    </Paper>
  );
};
