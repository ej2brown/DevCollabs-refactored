import React, { useEffect } from "react"

export default function UserListItem(props: any) {
    const index = props.index
    const user = props.user

    useEffect(() => {
    }, [])

    return (
        <div key={index}>
            {user.username}
        </div>
    )
}
