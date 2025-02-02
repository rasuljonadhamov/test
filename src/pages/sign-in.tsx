"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { authService } from "../services/auth-service"
import { useAuth } from "../contexts/auth-context"
import type { SignInRequest } from "../types/auth"

export default function SignIn() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const queryClient = useQueryClient()

  const signInMutation = useMutation({
    mutationFn: async (data: SignInRequest) => {
      const authResponse = await authService.signIn(data)
      localStorage.setItem("token", authResponse.token)
      const userInfo = await authService.getUserInfo()
      return userInfo
    },
    onSuccess: (userInfo) => {
      setUser(userInfo)
      queryClient.setQueryData(["user"], userInfo)
      navigate("/companies")
    },
    onError: (_) => {
      localStorage.removeItem("token")
    },
  })

  const onFinish = (values: SignInRequest) => {
    signInMutation.mutate(values)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/bg.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-6">Вход</h2>
        <Form name="sign-in" onFinish={onFinish} layout="vertical" requiredMark={false}>
          <Form.Item name="login" rules={[{ required: true, message: "Введите логин" }]}>
            <Input size="large" placeholder="Введите логин" className="rounded" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Введите пароль" }]}>
            <Input.Password size="large" placeholder="Введите пароль" className="rounded" />
          </Form.Item>

          <div className="flex justify-between items-center mb-4">
            <a onClick={() => navigate("/sign-up")} className="text-blue-500 hover:text-blue-600 cursor-pointer">
              Регистрация
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={signInMutation.isPending}
            className="w-full bg-green-500 hover:bg-green-600 rounded"
          >
            Вход
          </Button>
        </Form>
      </div>
    </div>
  )
}
