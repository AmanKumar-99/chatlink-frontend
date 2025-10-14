import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { getSocket } from "@/api/socket"
import { Socket } from "socket.io-client"

const SocketContext = createContext<Socket | null>(null)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const s = getSocket()
    setSocket(s)

    s.on("connect", () => console.log("✅ Connected to Socket.io"))
    s.on("disconnect", () => console.log("❌ Disconnected from Socket.io"))

    return () => {
      s.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext)
