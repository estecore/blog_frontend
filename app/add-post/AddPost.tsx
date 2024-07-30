"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

import { axiosInstance } from "@/axios";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

import { useSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/slices/auth";

import "easymde/dist/easymde.min.css";

import styles from "./AddPost.module.scss";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

export const AddPost = () => {
  const isAuth = useSelector(selectAuth);
  const router = useRouter();
  const params = useParams();

  const id = params.id;

  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const isEditing = !!id;

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axiosInstance.post("/upload", formData);

      setImageUrl(data.url);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    }
  };

  const onClickRemoveImage = () => setImageUrl("");

  const onChange = useCallback((value: string) => setText(value), []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = { title, imageUrl, tags, text };
      const request = isEditing
        ? axiosInstance.patch(`/posts/${id}`, fields)
        : axiosInstance.post("/posts", fields);

      const { data } = await request;
      const _id = isEditing ? id : data._id;

      router.push(`/posts/${_id}`);
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axiosInstance
      .get(`/posts/${id}`)
      .then((res) => {
        const { title, text, tags, imageUrl } = res.data;
        setTitle(title);
        setText(text);
        setTags(tags.join(","));
        setImageUrl(imageUrl);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        alert("Failed to fetch post");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!window.localStorage.getItem("token") && !isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

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

  if (typeof window === "undefined") return null;

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
              src={imageUrl}
              alt="Uploaded"
              width={600}
              height={600}
            />
          </>
        )}

        <br />
        <br />
        <TextField
          className={styles.title}
          variant="standard"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          className={styles.tags}
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
            {isEditing ? "Save" : "Publish"}
          </Button>
          <Link href="/" passHref>
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </Paper>
    </Container>
  );
};
