import { useAuth } from "../contexts/auth-context"
import { useNavigate } from "react-router-dom"
import { LogoutOutlined } from "@ant-design/icons"
import { Layout, Button } from "antd"
import type React from "react"

const { Header, Content } = Layout

interface AppLayoutProps {
  children: React.ReactNode
  onAddClick?: () => void
}

export default function AppLayout({ children, onAddClick }: AppLayoutProps) {
  const {  logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/sign-in")
  }

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between px-6 bg-[#2D2D2D] h-[64px]">
        <div className="flex items-center">
          <h1 className="text-xl text-white m-0">Компании</h1>
        </div>
      
         <div>
            <Button  icon={<LogoutOutlined />} onClick={handleLogout} type="text">
            Выйти
          </Button>
        <Button type="primary" onClick={onAddClick} className="bg-[#00B2A9] hover:bg-[#00A099] border-none h-[32px]">
          Добавить компанию
        </Button>
         </div>
      </Header>
      <Content className="bg-white">{children}</Content>
    </Layout>
  )
}

