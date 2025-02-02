"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button, message } from "antd"
import { authService } from "../services/auth-service"
import { useAuth } from "../contexts/auth-context"
import type { SignInRequest } from "../types/auth"

export default function SignIn() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const signInMutation = useMutation({
    mutationFn: (data: SignInRequest) => authService.signIn(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      setUser(data.user)
      message.success("Successfully signed in!")
      navigate("/companies")
    },
    onError: (error) => {
      message.error("Failed to sign in. Please check your credentials.")
    },
  })

  const onFinish = (values: SignInRequest) => {
    signInMutation.mutate(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <Form name="sign-in" onFinish={onFinish} layout="vertical" className="mt-8 space-y-6">
          <Form.Item label="Login" name="login" rules={[{ required: true, message: "Please input your login!" }]}>
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" className="w-full" loading={signInMutation.isPending}>
              Sign in
            </Button>
          </Form.Item>

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a onClick={() => navigate("/sign-up")} className="text-blue-600 hover:text-blue-500 cursor-pointer">
              Sign up
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}

