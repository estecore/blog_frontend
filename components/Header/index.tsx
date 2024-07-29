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

  const onClickLogout = async () => {
    if (window.confirm("Are you sure you want to exit?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <header className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} href="/" passHref>
            <div>ESTECORE BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link href="/add-post" passHref>
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
                <Link href="/login" passHref>
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link href="/register" passHref>
                  <Button variant="contained">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
