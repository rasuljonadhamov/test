"use client"

import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button } from "antd"
import { authService } from "../services/auth-service"
import type { SignUpRequest } from "../types/auth"

export default function SignUp() {
  const navigate = useNavigate()

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    onSuccess: () => {
      navigate("/sign-in")
    },
  })

  const onFinish = (values: SignUpRequest) => {
    signUpMutation.mutate(values)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/bg.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Регистрация</h2>
        <Form name="sign-up" onFinish={onFinish} layout="vertical" requiredMark={false}>
          <Form.Item name="fullName" rules={[{ required: true, message: "Пожалуйста, введите ФИО" }]}>
            <Input size="large" placeholder="Введите Ф.И.О" className="rounded" />
          </Form.Item>

          <Form.Item name="login" rules={[{ required: true, message: "Пожалуйста, введите логин" }]}>
            <Input size="large" placeholder="Введите логин" className="rounded" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}>
            <Input.Password size="large" placeholder="Введите пароль" className="rounded" />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <a onClick={() => navigate("/sign-in")} className="text-blue-500 hover:text-blue-600 cursor-pointer">
              Вход
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={signUpMutation.isPending}
            className="w-full bg-green-500 hover:bg-green-600 rounded"
          >
            Регистрировать
          </Button>
        </Form>
      </div>
    </div>
  )
}

