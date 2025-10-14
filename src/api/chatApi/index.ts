import axios from "axios"
import { BASE_URL } from ".."

export const getDirectMessageByChatIds = async (payload) => {
  return await axios.post(`${BASE_URL}/chat/direct`, payload, {
    withCredentials: true,
  })
}

export const getGroupMessageByChatIds = async (payload) => {
  return await axios.post(`${BASE_URL}/chat/group`, payload, {
    withCredentials: true,
  })
}
