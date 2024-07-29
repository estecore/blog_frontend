"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchAuth, selectAuth } from "@/redux/slices/auth";

import { FormValues } from "@/types";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const response = await dispatch(fetchAuth(values));
      const data = response.payload;

      if (!data) {
        throw new Error("Invalid email or password");
      }

      if ("token" in data) {
        window.localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid login");
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <Paper className={styles.root}>
      <Typography className={styles.title} variant="h5">
        Log in
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register("email", { required: "E-Mail is required" })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message || "Write your E-Mail"}
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message || ""}
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
