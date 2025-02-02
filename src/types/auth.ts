export interface SignUpRequest {
  fullName: string
  login: string
  password: string
}

export interface SignInRequest {
  login: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    fullName: string
    login: string
  }
}

export interface UserInfo {
  id: string
  fullName: string
  login: string
}

