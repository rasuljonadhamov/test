import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Descriptions, Button, Spin } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { companyService } from "../services/company-service"

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", id],
    queryFn: () => companyService.getCompanyById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return <Spin size="large" className="flex justify-center items-center h-screen" />
  }

  if (!company) {
    return <div>Company not found</div>
  }

  return (
    <Card
      title={
        <div className="flex items-center">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/companies")} className="mr-4">
            Назад
          </Button>
          <span>Детали компании</span>
        </div>
      }
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Название компании">{company.name}</Descriptions.Item>
        <Descriptions.Item label="Количество сотрудников">{company.count} человек</Descriptions.Item>
        <Descriptions.Item label="ID">{company.id}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

