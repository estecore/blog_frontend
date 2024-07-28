"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { axiosInstance } from "@/axios";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import SimpleMDE from "react-simplemde-editor";

import { useSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";

import "easymde/dist/easymde.min.css";

import styles from "./AddPost.module.scss";

export const AddPost = () => {
  const isAuth = useSelector(selectAuth);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const files = event.target?.files;
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0]);

        const { data } = await axiosInstance.post("/upload", formData);

        setImageUrl(data.url);
      }
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Failed to upload image to post");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((value: React.SetStateAction<string>) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags: tags.split(",").map((tag) => tag.trim()),
        text,
      };

      const { data } = await axiosInstance.post("/posts", fields);

      const _id = data._id;

      router.push(`/posts/${_id}`);
    } catch (err) {
      console.error("Error adding post:", err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "add-post-editor",
      },
    }),
    []
  );

  useEffect(() => {
    if (!window.localStorage.getItem("token") && !isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  return (
    <Container maxWidth="lg">
      <Paper style={{ padding: 30, marginBottom: 30 }}>
        <Button
          onClick={() => inputFileRef.current?.click()}
          variant="outlined"
          size="large"
          style={{ marginRight: 10 }}
        >
          Upload preview
        </Button>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        {imageUrl && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={onClickRemoveImage}
            >
              Delete
            </Button>
            <Image
              className={styles.image}
              src={process.env.BASE_URL + imageUrl}
              alt="Uploaded"
              width={600}
              height={600}
            />
          </>
        )}

        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            Publish
          </Button>
          <Link href="/">
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
};
