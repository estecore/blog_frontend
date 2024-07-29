import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

interface User {
  fullName: string;
  avatarUrl: string;
}

interface Comment {
  user: User;
  text: string;
}

interface CommentsBlockProps {
  items: Comment[];
  children?: React.ReactNode;
  isLoading?: boolean;
}

const LoadingSkeleton = () => (
  <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Skeleton variant="circular" width={40} height={40} />
    </ListItemAvatar>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Skeleton variant="text" height={25} width={120} />
      <Skeleton variant="text" height={18} width={230} />
    </div>
  </ListItem>
);

export const CommentsBlock: React.FC<CommentsBlockProps> = ({
  items,
  children,
  isLoading = true,
}) => {
  return (
    <SideBlock title="Comments">
      <List>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <React.Fragment key={index}>
                <LoadingSkeleton />
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))
          : items.map((obj, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
      </List>
      {children}
    </SideBlock>
  );
};
