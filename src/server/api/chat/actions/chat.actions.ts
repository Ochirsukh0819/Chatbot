"use server"

import { ChatHistoryResponse, ChatType } from "@/server/api/chat/types/chat.types"
import axiosInstance from "@/server/axiosInstance"
import { AxiosResponse } from "axios"

export const chat = async (chat: ChatType) => {
  try {
    const res = await axiosInstance.post("/chat", {
      message: chat.message,
      historyId: chat.historyId,
    })
    return res.data.response
  } catch (error) {
    return "error"
  }
}

export const getChatHistory = async () => {
  const response: AxiosResponse<ChatHistoryResponse> = await axiosInstance.get("/chat/history")
  return response.data.history
}

export const getChatHistoryById = async (historyId: string) => {
  const response: AxiosResponse<ChatHistoryResponse> = await axiosInstance.get(`/chat/history/${historyId}`)
  return response.data.history
}
