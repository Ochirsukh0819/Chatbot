import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function decodeToken(token: string) {
  const base64 = token.split(".")[1]!.replace(/-/g, "+").replace(/_/g, "/")
  const decodedToken = JSON.parse(atob(base64))

  return decodedToken
}

export function modifyText(text: string) {
  if (text.length > 40) {
    const modifiedText = text.slice(0, 20) + "..."
    return modifiedText
  }
  return text
}
