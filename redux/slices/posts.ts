import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/axios";
import { Post } from "@/types";

interface PostsState {
  items: Post[];
  status: "loading" | "loaded" | "error";
}

interface TagsState {
  items: string[];
  status: "loading" | "loaded" | "error";
}

interface InitialState {
  posts: PostsState;
  tags: TagsState;
}

export const fetchPosts = createAsyncThunk<
  Post[],
  { tab: number; order: string },
  { rejectValue: string }
>("posts/fetchPosts", async ({ tab, order }, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<Post[]>("/posts", {
      params: {
        sortBy: tab === 0 ? "createdAt" : "viewsCount",
        order,
      },
    });
    return data;
  } catch (err) {
    console.error("Error fetching posts slice:", err);
    return rejectWithValue("Failed to fetch posts");
  }
});

export const fetchTags = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("posts/fetchTags", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<string[]>("/posts/tags");
    return data;
  } catch (err) {
    console.error("Error fetching tags slice:", err);
    return rejectWithValue("Failed to fetch tags");
  }
});

export const fetchRemovePost = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("posts/fetchRemovePost", async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/posts/${id}`);
    return id;
  } catch (err) {
    console.error("Error deleting post slice:", err);
    return rejectWithValue("Failed to delete post");
  }
});

const initialState: InitialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.posts.items = [];
        state.posts.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = "loaded";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.items = [];
        state.posts.status = "error";
      })
      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.tags.items = [];
        state.tags.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = "loaded";
      })
      .addCase(fetchTags.rejected, (state) => {
        state.tags.items = [];
        state.tags.status = "error";
      })
      // Remove post
      .addCase(fetchRemovePost.pending, (state, action) => {
        state.posts.status = "loading";
      })
      .addCase(fetchRemovePost.fulfilled, (state, action) => {
        state.posts.items = state.posts.items.filter(
          (obj) => obj._id !== action.meta.arg
        );
        state.posts.status = "loaded";
      })
      .addCase(fetchRemovePost.rejected, (state) => {
        state.posts.status = "error";
      });
  },
});

export const postsReducer = postsSlice.reducer;
