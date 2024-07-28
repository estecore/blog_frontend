"use client";
import { useEffect } from "react";

import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchAuthMe, selectAuth } from "@/redux/slices/auth";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "./theme";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
