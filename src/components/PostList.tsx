import React from "react"
import PostListItem from "./PostListItem"

interface Props {
  posts: object[]
}

const PostsList = ({ posts }: Props): any => {

  if (!posts) { return null }
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
    )
  })
  return PostsList;
}

export default PostsList