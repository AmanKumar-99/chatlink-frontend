import type { Socket } from "socket.io-client"
import { io } from "socket.io-client"

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:9000"

let socket: Socket

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    })
  }
  return socket
}
