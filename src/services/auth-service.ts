import { apiClient } from "../lib/api-client"
import type { SignUpRequest, SignInRequest, AuthResponse, UserInfo } from "../types/auth"

export const authService = {
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/auths/sign-up", data)
    return response.data
  },

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    const response = await apiClient.post<string>("/auths/sign-in", data)
    return { token: response.data }
  },

  async getUserInfo(): Promise<UserInfo> {
    const response = await apiClient.get<UserInfo>("/auths/get-info")
    return response.data
  },

  logout() {
    localStorage.removeItem("token")
  },
}

