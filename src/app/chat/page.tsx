"use client"
import { Button } from "@/components/ui/Button/button"
import { Textarea } from "@/components/ui/textarea"
import { useChat } from "@/hooks/api/mutation"
import { cn } from "lib/utils"
import { SendHorizonal } from "lucide-react"
import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useParams } from "next/navigation"

function ChatPage() {
  const [message, setMessage] = useState("")
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([])
  const [historyId, setHistoryId] = useState<string | null>(null)
  const [isChatStarted, setIsChatStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams<{ tag: string; item: string }>()

  const chat = useChat()

  useEffect(() => {
    if (!historyId && message) {
      setHistoryId(uuidv4())
    }
  }, [historyId, message])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message || !historyId) return
    setIsChatStarted(true)
    setIsLoading(true)

    setChatHistory((prev) => [...prev, { sender: "user", text: message }])

    const chatPayload = {
      message: message,
      historyId: historyId!,
    }
    const response = await chat.mutateAsync(chatPayload)

    setChatHistory((prev) => [...prev, { sender: "bot", text: response }])
    setIsLoading(false)
    setMessage("")
  }

  return (
    <section className="mt-10 flex h-[calc(100%-108px)] w-full flex-col gap-6 px-32">
      <section
        className={cn(
          "h-[calc(100%-238px)] grow flex-col gap-6 overflow-y-scroll text-snow-50",
          isChatStarted ? "flex" : "hidden"
        )}
      >
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`max-w-3xl rounded-xl px-4 py-3 ${
              chat.sender === "user" ? "self-end bg-dark-50" : "self-start bg-gray-700"
            }`}
          >
            {chat.text}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-3xl self-start rounded-xl bg-gray-700 px-4 py-5">
            <span className="animate-pulse">...</span>
          </div>
        )}
      </section>

      <section
        className={cn(
          "mx-auto flex w-full flex-col items-center gap-2 px-4 pb-4 md:max-w-3xl md:pb-6",
          !isChatStarted ? "h-full justify-center" : "justify-end"
        )}
      >
        {!isChatStarted && <h1 className="text-3xl text-snow-50">What can I help with?</h1>}
        <form
          className="flex w-full flex-col items-center rounded-2xl border border-gray-700 bg-input p-2"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Message Chatbot"
            className="h-[44px] w-full overflow-auto border-none bg-input text-white placeholder:text-gray-400 focus:outline-none focus:ring-0"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
              }
            }}
            disabled={isLoading}
          />
          <div className="mt-3 flex self-end">
            <Button
              variant="icon"
              size="icon"
              className="flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="size-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
              ) : (
                <SendHorizonal className="size-5 text-dark" />
              )}
            </Button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default ChatPage
