"use client"
import { MutationCache, QueryCache, QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { isAxiosError } from "axios"
import { ReactNode, useState } from "react"
import { toast } from "sonner"
import MESSAGES from "@/lib/constant"

function QueryProvider({ children }: { children: ReactNode }) {
  const errorHandler = (error: Error) => {
    toast.error(error.message)
  }

  const queryClientConfig: QueryClientConfig = {
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.meta?.errorMessage) {
          toast.error(query.meta.errorMessage as string)
        } else if (isAxiosError(error)) {
          toast.error(error.message)
        } else if (error instanceof Error) {
          errorHandler(error)
        } else {
          toast.error(MESSAGES.ERROR.UNKNOWN_FAILED())
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, variables) => {},
    }),
  }

  const [queryClient] = useState(() => new QueryClient(queryClientConfig))
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProvider
