import React from "react"

interface Props {
    key: number,
    id: number,
    user: string,
    children: string,
    created_at: string,
    image_url: string
}

const PostListItem = ({ user, children, created_at, image_url }: Props): any => {

    return (
        <>
            <header>{user}</header>
            <div>{image_url}</div>
            <div>{created_at}</div>
            <div>{children}</div>
        </>
    )
}

export default PostListItem