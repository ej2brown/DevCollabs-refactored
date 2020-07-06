/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import styled from "styled-components";
import { Button, Input } from "@material-ui/core";

//components
import UserList from "../components/UserList";
import { PostsList, PostContainer } from "../components/PostList";
import PostForm from "../components/PostForm";
import GroupList from "../components/GroupList";
import CodeRoom from "./CodeRoom";

//hooks
import useApplicationData from "../components/hooks/useApplicationData";
import { render } from "react-dom";

import { users, posts } from "../data/data";

toast.configure();

const Main = styled.div`
  display: flex;

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 80%;
`;

const Section = styled.section`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const HideChat = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const Group = () => {
    const { state, setGroup, fetchGroups } = useApplicationData();
    const { group, groups, posts } = state;
    const [roomID, setRoomID] = useState("");
    const [groupName, setGroupName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const createRoomAndNotify = async (evt: any) => {
        evt.preventDefault();

        const username = "AliceLand";

        localStorage.setItem("roomData", JSON.stringify(roomID));
        console.log(roomID);
        console.log(evt.target.querySelector("input").value);

        setTimeout(() => {
            setRedirect(true);
        }, 2000);

        toast(`${username} will be redirected to ${roomID} shortly`, {
            position: "bottom-right",
            autoClose: 2000,
            closeOnClick: false,
            pauseOnHover: false,
            hideProgressBar: true,
        });
    };

    if (redirect) {
        return <Redirect to="/coderoom" />;
    }

    const handlePost = (groupID: number) => {
        setGroup(groupID);
    };


    return (
        <>
            <header>
                <h2>Group Page</h2>
            </header>

            <section>
                <GroupList groups={groups} group={group} setGroup={setGroup} />

                <UserList users={users} />
                <Section>
                    <div
                        title="Create or Join A Room"
                    >
                        <Form onSubmit={createRoomAndNotify}>
                            <Input
                                type="text"
                                placeholder="Room Name"
                                value={roomID || ""}
                                disableUnderline
                                onChange={evt => setRoomID(evt.target.value.trim().toLowerCase())}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Create/Join
                            </Button>
                        </Form>
                    </div>
                    <PostContainer>
                        <PostForm group={group} postFunction={handlePost} />
                        <PostsList posts={posts} />
                    </PostContainer>
                </Section>
                <PostContainer>
                    <PostForm group={group} postFunction={handlePost} />
                    <PostsList posts={posts} />
                </PostContainer>
            </section>
        </>
    );
};

export default Group;
