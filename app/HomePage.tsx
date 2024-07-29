"use client";

import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Container, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";

import { useDispatch, useSelector } from "@/redux/hooks";
import { fetchPosts, fetchTags } from "@/redux/slices/posts";

import { User, Post as PostType, Tag } from "@/types";

export const Home = () => {
  const dispatch = useDispatch();
  const { data: stateData } = useSelector(
    (state: { auth: { data: { userData: User } | null } }) => state.auth
  );
  const { posts, tags } = useSelector((state) => state.posts);

  const [currentTab, setCurrentTab] = useState(0);
  const [sortOrders, setSortOrders] = useState<{
    [key: number]: "asc" | "desc";
  }>({
    0: "desc", // newest
    1: "desc", // most popular
  });

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts({ tab: currentTab, order: sortOrders[currentTab] }));
    dispatch(fetchTags());
  }, [dispatch, currentTab, sortOrders]);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  const toggleSortOrder = (tabIndex: number) => {
    setSortOrders((prev) => ({
      ...prev,
      [tabIndex]: prev[tabIndex] === "asc" ? "desc" : "asc",
    }));
  };

  const renderPosts = () => {
    if (isPostsLoading) {
      return [...Array(5)].map((_, index) => (
        <Post
          key={index}
          isLoading
          _id=""
          title=""
          createdAt=""
          imageUrl=""
          user={{ fullName: "", avatarUrl: "" }}
          viewsCount={0}
          commentsCount={0}
          tags={[]}
          isEditable={false}
        />
      ));
    }
    return posts.items.map((post) => (
      <Post
        key={post._id}
        _id={post._id}
        title={post.title}
        imageUrl={
          post.imageUrl ? `${process.env.BASE_URL}${post.imageUrl}` : ""
        }
        user={post.user}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
        tags={post.tags}
        isEditable={post.user._id === stateData?.userData?._id}
      />
    ));
  };

  return (
    <div className="p-4">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="New" />
            <Tab label="Popular" />
          </Tabs>
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            {currentTab === 0 && (
              <IconButton
                onClick={() => toggleSortOrder(0)}
                sx={{
                  color: sortOrders[0] === "desc" ? "black" : "gray",
                }}
              >
                {sortOrders[0] === "desc" ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </IconButton>
            )}
            {currentTab === 1 && (
              <IconButton
                onClick={() => toggleSortOrder(1)}
                sx={{
                  color: sortOrders[1] === "desc" ? "black" : "gray",
                }}
              >
                {sortOrders[1] === "desc" ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </IconButton>
            )}
          </Box>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {renderPosts()}
          </Grid>
          <Grid item xs={12} md={4}>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            {/* =================== TODO =================== */}
            <CommentsBlock
              items={[
                {
                  user: {
                    fullName: "Karl Kasun",
                    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                  },
                  text: "Block in development",
                },
                {
                  user: {
                    fullName: "Karl Kasun Two",
                    avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                  },
                  text: "Block in development",
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
