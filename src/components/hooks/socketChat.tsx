import { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"
import * as moment from "moment"

const ENDPOINT = "http://localhost:3001/"

export default function socketChat(roomId: string) {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})
    const [connection, setConnection] = useState(undefined)
    const [messages, setMessages] = useState([])

    const conn = socketIOClient(ENDPOINT)

    const handleSubmit = (event: any) => {
        event.preventDefault()

        connection.emit("message", {
            user,
            message: event.target.message.value,
            roomId,
        })
        event.target.message.value = ""
    }

    const websocketIDE = (value: any) => {
        connection.emit("IDE", { value, roomId })
    }

    const onConnection = () => {
        if (localStorage.getItem("session")) {
            const userName: string = JSON.parse(
                localStorage.getItem("session") || "{}"
            ).username
            setUser(userName)

            //server connection
            setConnection(conn)
            conn.emit("join", { userName, roomId })

            //users
            conn.on("displayUsers", (data: any) => {
                setUsers([...data.users])
            })

            conn.on("message", (data: any) => {
                let now: string = moment().format("lll")
                data.date = now
                setMessages(prev => [...prev, data])
            })
        }

        return () => {
            if (localStorage.getItem("session")) {
                const userName: string = JSON.parse(
                    localStorage.getItem("session") || "{}"
                ).username

                conn.emit("leaveRoom", { userName, roomId })
                conn.close()
            }
        }
    }

    useEffect(() => {
        onConnection()
    }, [])

    return { handleSubmit, users, messages, websocketIDE, conn }
}