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
}

export interface UserInfo {
  fullName: string
  login: string
}

