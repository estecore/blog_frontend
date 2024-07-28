import Link from "next/link";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import styles from "./Header.module.scss";

export const Header = () => {
  const isAuth = false;

  const onClickLogout = () => {};

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
