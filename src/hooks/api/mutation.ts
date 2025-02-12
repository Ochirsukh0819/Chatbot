import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import MESSAGES from "@/lib/constant"
import { chat } from "@/server/api/chat/actions/chat.actions"
import { ChatType } from "@/server/api/chat/types/chat.types"

export const useChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (chatPayload: ChatType) => chat(chatPayload),
    onSuccess: () => {
      //   toast.success(MESSAGES.SUCCESS.SAVED())
      queryClient.invalidateQueries({ queryKey: ["chats"] })
      queryClient.invalidateQueries({ queryKey: ["histories"] })
    },
    onError: () => {
      toast.error(MESSAGES.ERROR.SAVE_FAILED())
    },
  })
}
