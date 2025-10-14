import { useSocket } from "@/context/socketContext"
import { type Message } from "@/store/slices/chatSlice"
import { useEffect } from "react"

export function useChatSocket(
  chatId: string,
  activeUserId: string,
  onNewMessage?: (message: Message) => void,
  onMembersAdded?: (newMembers: string[]) => void,
  onMembersRemoved?: (removed: string[]) => void
) {
  const socket = useSocket()

  useEffect(() => {
    if (!socket || !chatId) return

    socket.emit("chat:join", { chatId, userId: activeUserId })

    socket.on("chat:message", (message: Message) => {
      if (message.chatId === chatId) onNewMessage(message)
    })

    socket.on(
      "group:membersAdded",
      ({ chatId: changedId, newMembers }) => {
        if (changedId === chatId && onMembersAdded)
          onMembersAdded(newMembers)
      }
    )

    socket.on(
      "group:membersRemoved",
      ({ chatId: changedId, removedMembers }) => {
        if (changedId === chatId && onMembersRemoved)
          onMembersRemoved(removedMembers)
      }
    )

    return () => {
      socket.off("chat:message")
      socket.off("group:membersAdded")
      socket.off("group:membersRemoved")
    }
  }, [
    socket,
    chatId,
    onMembersAdded,
    onMembersRemoved,
    activeUserId,
    onNewMessage,
  ])
}
