import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import * as moment from "moment";

const SOCKET_IO_ENDPOINT = "http://localhost:3000";

export default function socketChat(roomId: string) {
    
    // const [initialized, setInitialized] = useState(false);
    const [room, setRoom] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("Alice");
    const [messages, setMessages] = useState([]);

    //sends chat message data
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        setMessages(prev => [...prev, data]);
        conn.emit("message", {
            user,
            message: evt.target.message.value,
            roomId,
        });
        evt.target.message.value = "";
    };

    const websocketIDE = (value: any) => {
        console.log(value, room);
        conn.emit("IDE", { value, room });
    };

    
    const conn = socketIOClient(SOCKET_IO_ENDPOINT);
    useEffect(() => {
        // onConnection();
        const userName = "Alice";
        setUser(userName);

      //server connection
        conn.emit("join", { user, roomId });

        conn.on("displayUsers", (data: any) => {
            setUsers([...data.users]);
        });

        conn.on("message", (data: any) => {
            const now: string = moment().format("lll");
            data.date = now;
            setMessages(prev => [...prev, data]);
        });

        return () => {
            if (localStorage.getItem("session")) {
                const userName: string = JSON.parse(
                    localStorage.getItem("session") || "{}"
                ).username;

                conn.emit("leaveRoom", { userName, roomId });
                conn.close();
            }
        };
    }, []);

    return {
        handleSubmit,
        users,
        messages,
        websocketIDE,
        conn
    };
}