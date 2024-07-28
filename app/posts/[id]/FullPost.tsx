"use client";

import { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";

import ReactMarkdown from "react-markdown";

import { Container } from "@mui/material";

import { Post } from "@/components/Post";

import { Post as PostType } from "@/types";

import { axiosInstance } from "@/axios";

export const FullPost = () => {
  const [data, setData] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();

  const id = params.id;

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    setIsLoading(true);
    setError(null);
    axiosInstance
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch post data");
        setIsLoading(false);
        console.error("Error fetching post data:", err);
      });
  }, [id, router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
        <Post
          _id=""
          title=""
          imageUrl=""
          user={{ fullName: "", avatarUrl: "" }}
          createdAt=""
          viewsCount={0}
          commentsCount={0}
          tags={[]}
          isFullPost
          isLoading={isLoading}
        />
      </Container>
    );
  }

  if (!data) {
    return <h2>Post not found</h2>;
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? process.env.BASE_URL + data.imageUrl : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentsCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown>{data.text?.toString() || ""}</ReactMarkdown>
      </Post>
    </Container>
  );
};
