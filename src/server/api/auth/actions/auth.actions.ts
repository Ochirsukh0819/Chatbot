"use server"
import { isAxiosError, AxiosError } from "axios"
import dayjs from "dayjs"
import { cookies } from "next/headers"
import { decodeToken } from "@/lib/utils"
import { AuthResponse, AuthValues, JWTPayload, TokenData, User } from "@/server/api/auth/types/auth.types"
import axiosInstance from "@/server/axiosInstance"

const handleIsAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      data: null,
      error: error.message,
    }
  }
  return { data: null, error: "gg" }
}

export const login = async (username: string, password: string): Promise<AuthResponse<TokenData>> => {
  try {
    const res = await axiosInstance.post("/login", {
      username,
      password,
    })

    return { data: res.data, error: null }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export const signup = async (username: string, password: string) => {
  try {
    const res = await axiosInstance.post("/signup", {
      username,
      password,
    })
    return {
      data: res.data,
      status: "success",
    }
  } catch (error: any) {
    return { data: null, error: error.message }
  }
}

export async function decodeAndSaveToken(token: TokenData) {
  const { access_token, expireIn } = token
  const decodedToken = decodeToken(access_token) as JWTPayload
  const user: User = {
    username: decodedToken.sub,
    userid: decodedToken.user_id,
    exp: decodedToken.exp,
  }

  // ExpresIn is in seconds
  const expirationDate = dayjs().add(expireIn, "second").toDate()

  cookies().set("COOKIE_ACCESS_TOKEN", access_token, {
    expires: expirationDate,
    httpOnly: true,
    secure: false,
  })

  cookies().set("COOKIE_USER", JSON.stringify(user), {})
}

export async function loginUser({ username, password }: AuthValues) {
  const res = await login(username, password)

  if (res.error) {
    return {
      status: "error",
      message: res.error,
    }
  }

  if (!res.data) {
    return {
      status: "error",
      message: "Token missing from response.",
    }
  }
  await decodeAndSaveToken(res.data)

  return {
    status: "success",
    message: "Successfully authenticated the user",
  }
}

export async function getUser() {
  const cookiesStore = cookies()
  const user = cookiesStore.get("COOKIE_USER")?.value
  return user ? (JSON.parse(user) as User) : null
}

export async function logoutUser() {
  cookies().delete("COOKIE_ACCESS_TOKEN")
  cookies().delete("COOKIE_USER")
}
