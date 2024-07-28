"use client";

import Link from "next/link";

import { useDispatch, useSelector } from "@/redux/hooks";
import { logout, selectAuth } from "@/redux/slices/auth";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} href="/">
            <div>ESTECORE BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link href="/posts/create">
                  <Button variant="contained">Write a post</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Exit
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
