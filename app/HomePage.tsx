"use client";

import { useEffect } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchPosts, fetchTags } from "@/redux/slices/posts";

import { User, Post as PostType, Tag } from "@/types";

export const Home = () => {
  const dispatch = useDispatch();
  const stateData = useSelector(
    (state: { auth: { data: { userData: User } | null } }) => state.auth.data
  );
  const { posts, tags } = useSelector((state) => state.posts);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <div className="p-4">
      <Container maxWidth="lg">
        <Tabs
          style={{ marginBottom: 15 }}
          value={0}
          aria-label="basic tabs example"
        >
          <Tab label="New" />
          <Tab label="Popular" />
        </Tabs>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {(isPostsLoading ? [...Array(5)] : posts.items).map(
              (obj: PostType, index: number) =>
                isPostsLoading ? (
                  <Post
                    key={index}
                    isLoading
                    _id={""}
                    title={""}
                    createdAt={""}
                    imageUrl={""}
                    user={{
                      fullName: "",
                      avatarUrl: "",
                    }}
                    viewsCount={0}
                    commentsCount={0}
                    tags={[]}
                    isEditable={false}
                  />
                ) : (
                  <Post
                    key={obj._id}
                    _id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? process.env.BASE_URL + obj.imageUrl : ""
                    }
                    user={{
                      avatarUrl: obj.user.avatarUrl,
                      fullName: obj.user.fullName,
                    }}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.commentsCount}
                    tags={obj.tags}
                    isEditable={obj.user._id === stateData?.userData?._id}
                  />
                )
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: "Karl Kasun",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "I like it",
                },
                {
                  user: {
                    fullName: "Karl Kasun Two",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                },
              ]}
              isLoading={false}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
