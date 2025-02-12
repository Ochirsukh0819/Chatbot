"use server"

import axios, { AxiosError } from "axios"
import { cookies } from "next/headers"
import MESSAGES from "@/lib/constant"

const CHATBOT_API_URL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL : ""

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: CHATBOT_API_URL,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookies().get("COOKIE_ACCESS_TOKEN")?.value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let ERROR_MESSAGE = "An error occurred"

    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response

      // Assign default error message if available
      ERROR_MESSAGE = data?.detail || ERROR_MESSAGE

      switch (status) {
        case 401:
          ERROR_MESSAGE = MESSAGES.ERROR.AUTH_FAILED
          break
        case 403:
          ERROR_MESSAGE = MESSAGES.ERROR.FORBIDDEN
          break
        case 500:
          ERROR_MESSAGE = MESSAGES.ERROR.SERVER_ERROR
          break
      }
    }

    return Promise.reject(new Error(ERROR_MESSAGE))
  }
)

// Export the axios instance
export default axiosInstance
