import React from "react"

interface Props {
  users: any
  messages: any
  handleSubmit: any
}

export function Chat({ users, messages, handleSubmit }: Props) {

  return (
    <div>
      <h4>ONLINE CHAT</h4>
      <div>
        {messages.map((msg: any, index: number) => (
          <>
            <div style={{ marginLeft: "10px" }}>{msg.date}</div>
            <b>{msg.user}</b>
            <div>{msg.message}</div>
          </>
        ))}
      </div>
      <button onSubmit={handleSubmit}
        name="message"
        placeholder="Send a Message"
        type="submit"
        value="Submit"
      >
      </button>
    </div>
  )
}

export default Chat
