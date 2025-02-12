import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import QueryProvider from "@/providers/queryProvider"
import { UserProvider } from "@/providers/userContext"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "styles/tailwind.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Simple chatbot application",
  description: "Built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <QueryProvider>
            <main className="h-screen w-full overflow-hidden bg-primary">
              <Sidebar />
              <div className="float-right h-screen w-[calc(100%-240px)] bg-secondary">
                <Navbar />
                {children}
              </div>
            </main>
          </QueryProvider>
        </UserProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  )
}
