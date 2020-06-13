import React from "react";
import UserListItem from "./UserListItem";

interface Props {
    users: any
}

const UserList = ({ users }: Props) => {
    return (
        <ul>
            {users.map((user: any, index: number) => {
                return <UserListItem key={index} index={index} user={user} />;
            })}
        </ul>
    );
};

export default UserList;