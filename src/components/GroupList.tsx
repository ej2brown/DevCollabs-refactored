import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGroup, setGroups } from "./groupListSlice"
import GroupListItem from "./GroupListItem"

interface Props {
    groups: any
    group: any
    setGroup: any
}

export default function GroupList({ groups, setGroup }: Props) {
    const GroupList = groups.map((group: any) => {
        return (
            <GroupListItem
                key={group.id}
                id={group.id}
                name={group.name}
                setGroup={setGroup}
            />
        )
    })
    return <div>{GroupList}</div>
}