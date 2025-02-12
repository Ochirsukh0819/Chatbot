export interface ChatType {
  message: string
  historyId: string
}

export interface ChatHistoryType {
  history_id?: string
  user_message: string
  bot_response: string
}

export interface ChatHistoryResponse {
  history: ChatHistoryType[]
}
