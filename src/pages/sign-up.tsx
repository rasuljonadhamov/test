"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Form, Input, Button, message } from "antd"
import { authService } from "../services/auth-service"
import type { SignUpRequest } from "../types/auth"

export default function SignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpRequest) => authService.signUp(data),
    onSuccess: () => {
      message.success("Successfully signed up! Please sign in.")
      navigate("/sign-in")
    },
    onError: (error) => {
      message.error("Failed to sign up. Please try again.")
    },
  })

  const onFinish = (values: SignUpRequest) => {
    signUpMutation.mutate(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <Form name="sign-up" onFinish={onFinish} layout="vertical" className="mt-8 space-y-6">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input size="large" />
          </Form.Item>

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
            <Button type="primary" htmlType="submit" size="large" className="w-full" loading={signUpMutation.isPending}>
              Sign up
            </Button>
          </Form.Item>

          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <a onClick={() => navigate("/sign-in")} className="text-blue-600 hover:text-blue-500 cursor-pointer">
              Sign in
            </a>
          </div>
        </Form>
      </div>
    </div>
  )
}

