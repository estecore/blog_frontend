import { ReactNode } from "react";

export interface User {
  avatarUrl: string;
  fullName: string;
}

export interface Post {
  text: ReactNode;
  _id: string;
  title: string;
  imageUrl: string;
  user: User;
  createdAt: string;
  viewsCount: number;
  commentsCount: number;
  tags: string[];
  isEditable: boolean;
}

export interface Tag {
  name: string;
  count: number;
}
