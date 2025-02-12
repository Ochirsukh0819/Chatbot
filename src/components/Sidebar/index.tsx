"use client"
import React from "react"
import { PanelLeftClose, SquarePen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/Button/button"
import { useGetChatHistory } from "@/hooks/api/queries"
import Link from "next/link"
import { modifyText } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useUser } from "@/providers/userContext"

function Sidebar() {
  const { user } = useUser()
  const { data: histories } = useGetChatHistory({ enabled: !!user })
  const router = useRouter()

  return (
    <section className="fixed z-50 h-full w-[240px] bg-[#171717] p-4 text-white">
      <div className="flex cursor-pointer items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>
                <PanelLeftClose className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Close Sidebar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  router.push("/chat")
                }}
              >
                <SquarePen className="bg-gray_400 size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>New chats</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <h2 className="text-sm">History</h2>
        {user ? (
          <div className="flex cursor-pointer flex-col gap-3 text-sm text-snow">
            {histories &&
              histories.length > 0 &&
              histories.map((history, index) => (
                <Link href={`/chat/${history.history_id}`} key={index} className="hover:underline">
                  {modifyText(history.bot_response)}
                </Link>
              ))}
          </div>
        ) : (
          <></>
        )}
        <div></div>
      </div>
    </section>
  )
}

export default Sidebar
