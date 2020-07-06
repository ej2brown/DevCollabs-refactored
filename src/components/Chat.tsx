import React from "react";

interface Props {
  users: any
  messages: any
  handleSubmit: any
}

export default function Chat({ users, messages, handleSubmit }: Props) {
  console.log(messages)
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
      <form className="form" >
      <input
              type="text"
              name="message"
              // value={message || ""}
              // onChange={evt => setMessage(evt.target.value)}
              />
      </form>
      <button onClick={(evt) => {handleSubmit(evt);}}
        name="message"
        placeholder="Send a Message"
        type="submit"
        value="Submit"
      > Send
      </button>
    </div>
  );
}