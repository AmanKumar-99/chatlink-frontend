import axios from "axios"

const BASE_URL = "http://localhost:9000/api/auth"

export const registerUser = async (payload: unknown) => {
  return await axios.post(`${BASE_URL}/register`, payload, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })
}

export const loginUser = async (payload: unknown) => {
  return await axios.post(`${BASE_URL}/signin`, payload, {
    withCredentials: true,
  })
}
