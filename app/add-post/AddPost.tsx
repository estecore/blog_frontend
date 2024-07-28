import React from "react";

import Image from "next/image";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";

import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const imageUrl = "";
  const [value, setValue] = React.useState("");

  const handleChangeFile = () => {};

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value: React.SetStateAction<string>) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Upload preview
      </Button>
      <input type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Delete
        </Button>
      )}
      {imageUrl && (
        <Image
          className={styles.image}
          src={`http://localhost:1337${imageUrl}`}
          alt="Uploaded"
          width={600}
          height={600}
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained">
          Publish
        </Button>
        <Link href="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
