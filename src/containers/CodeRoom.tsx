import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import * as moment from "moment";
import CodeEditor from "../components/CodeEditor";
import Chat from "../components/Chat";

import socketChat from "../components/hooks/socketChat";
import { createModifiersFromModifierFlags } from "typescript";

// const messages = [{
//   date: "05-05-2020",
//   user: "aliceLand",
//   message: "Hi!"
// }];

function CodeEditorPage({ roomId }: any) {
// 
const SOCKET_IO_ENDPOINT = "http://localhost:3001";

    // const [initialized, setInitialized] = useState(false);
    const [room, setRoom] = useState([]);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("Alice");
    const [messages, setMessages] = useState([]);

    //sends chat message data
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        conn.emit("message", {
            user,
            // message: evt.target.message.value,
            message: "hi",
            roomId,
        });
        // evt.target.message.value = "";
    };

    const websocketIDE = (value: any) => {
        console.log(value, room);
        setSnippetValue(data.value);
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
// 
  const welcomeHTML = "<h1>Welcome Devs!</h1>";

  // const { users, messages, handleSubmit, websocketIDE, conn } = socketChat(roomId);

  const [snippetValue, setSnippetValue] = useState(welcomeHTML);

  conn.on("IDE", (data: any) => {
    console.log(data);
    setSnippetValue(data.value);
  });

  useEffect(() => {
    document.getElementById("live-html").innerHTML = snippetValue;
    console.log(snippetValue);
  }, [snippetValue]);

  return (
    <>
      <header>
        <h2>Code Editor Page</h2>
      </header>
      <section>
        <CodeEditor function={websocketIDE} snippetValue={snippetValue} />
        <Chat users={users} messages={messages} handleSubmit={handleSubmit} />
      </section>
    </>
  );
}

export default CodeEditorPage;