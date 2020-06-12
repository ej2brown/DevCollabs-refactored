import React, { useState, useEffect } from "react"

import { CodeEditor } from '../components/CodeEditor';
import { Chat } from '../components/Chat';

import socketChat from "../components/hooks/socketChat"

const messages = [{
  date: "05-05-2020",
  user: "aliceLand",
  message: 'Hi!'
}]

const welcomeHTML = `<h1>Welcome Devs!</h1>`;

const CodeEditorPage = () => {
  const RoomName = location.state.roomID

  const [snippetValue, setSnippetValue] = useState(welcomeHTML)

  const { users, messages, handleSubmit, websocketIDE, conn } = socketChat(RoomName)

  conn.on("IDE", (data :any) => {
    setSnippetValue(data.value)
  })
  
  useEffect(() => {
    document.getElementById('live-html').innerHTML = snippetValue
  }, [snippetValue])

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
  )
};

export default CodeEditorPage;
