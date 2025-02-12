import { getChatHistory, getChatHistoryById } from "@/server/api/chat/actions/chat.actions"
import { useQuery } from "@tanstack/react-query"

interface UseGetChatHistoryOptions {
  enabled: boolean
}

export const useGetChatHistory = (options: UseGetChatHistoryOptions) =>
  useQuery({
    queryKey: ["chats"],
    queryFn: () => getChatHistory(),
    enabled: options.enabled,
  })

export const useGetChatHistoryById = (historyId: string) =>
  useQuery({
    queryKey: ["histories"],
    queryFn: () => getChatHistoryById(historyId),
  })
