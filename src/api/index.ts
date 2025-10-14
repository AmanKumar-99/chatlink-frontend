import axios from "axios"

export const BASE_URL = "http://localhost:9000/api"

export const registerUser = async (payload: unknown) => {
  return await axios.post(`${BASE_URL}/auth/register`, payload, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  })
}

export const loginUser = async (payload: unknown) => {
  return await axios.post(`${BASE_URL}/auth/signin`, payload, {
    withCredentials: true,
  })
}
