import React from "react";
import styled from "styled-components"

import PostListItem from "./PostListItem";

interface Props {
  posts: object[]
}

const PostContainer = styled.div`
  @media (max-width:620px) {
    width: '80%';
    margin-left: 2em;
    min-width: 80vw;
  }
`;

const PostsList = ({ posts }: Props): any => {
  if (!posts) {
    return (
      <div className="post-preview">Loading...</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="post-preview">
        No posts are here... yet.
      </div>
    );
  }
  const PostsList = posts.map((post: any) => {
    return (
      <PostListItem
        key={post.id}
        id={post.id}
        user={post.username}
        created_at={post.created_at}
        image_url={post.image_url}
      >
        {post.data}
      </PostListItem>
    );
  });
  return PostsList;
};

export { PostsList, PostContainer }