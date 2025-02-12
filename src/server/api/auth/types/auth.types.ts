export interface AuthResponse<T> {
  data: T | null
  error: string | null
}

export interface TokenData {
  access_token: string
  expireIn: number
}
export interface JWTPayload {
  sub: string
  user_id: string
  exp: number
}

export interface User {
  userid: string
  username: string
  exp: number
}
export interface AuthValues {
  username: string
  password: string
}
