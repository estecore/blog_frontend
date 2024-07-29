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
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    const fetchPost = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/posts/${id}`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch post data");
        console.error("Error fetching post data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (isLoading) {
    return <LoadingPost />;
  }

  if (!data) {
    return <ErrorMessage message="Post not found" />;
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={
          data.imageUrl ? `${process.env.BASE_URL}${data.imageUrl}` : ""
        }
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

const ErrorMessage = ({ message }: { message: string }) => (
  <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
    <h2>{message}</h2>
  </Container>
);

const LoadingPost = () => (
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
      isLoading
    />
  </Container>
);
