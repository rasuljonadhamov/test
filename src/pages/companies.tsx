"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Table, Button, Dropdown, message } from "antd"
import { MoreOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import AppLayout from "../components/layout"
import CompanyModal from "../components/company-modal"
import { companyService } from "../services/company-service"
import type { Company } from "../types/company"
import type { MenuProps } from "antd"

export default function CompaniesPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: companyService.getCompanies,
    staleTime: 0,
    refetchOnWindowFocus: true,
  })

  const addCompanyMutation = useMutation({
    mutationFn: companyService.addCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      message.success("Компания успешно добавлена")
      setModalOpen(false)
      setEditingCompany(null)
    },
  })

  const updateCompanyMutation = useMutation({
    mutationFn: companyService.updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      message.success("Компания успешно обновлена")
      setModalOpen(false)
      setEditingCompany(null)
    },
  })

  const deleteCompanyMutation = useMutation({
    mutationFn: companyService.deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] })
      message.success("Компания успешно удалена")
    },
  })

  const handleAddEdit = (values: { name: string; count: number }) => {
    if (editingCompany) {
      updateCompanyMutation.mutate({
        id: editingCompany.id,
        ...values,
      })
    } else {
      addCompanyMutation.mutate(values)
    }
  }

  const getDropdownItems = (record: Company): MenuProps["items"] => [
    {
      key: "view",
      label: "Просмотреть",
      onClick: () => navigate(`/companies/${record.id}`),
    },
    {
      key: "edit",
      label: "Редактировать",
      onClick: () => {
        setEditingCompany(record)
        setModalOpen(true)
      },
    },
    {
      key: "delete",
      label: "Удалить",
      danger: true,
      onClick: () => deleteCompanyMutation.mutate(record.id),
    },
  ]

  const columns = [
    {
      title: "Название компании",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Company) => <a onClick={() => navigate(`/companies/${record.id}`)}>{text}</a>,
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count",
      key: "count",
      render: (count: number) => `${count} человек`,
    },
    {
      key: "actions",
      width: 50,
      render: (_: any, record: Company) => (
        <Dropdown menu={{ items: getDropdownItems(record) }} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<MoreOutlined />} className="border-none hover:bg-transparent" />
        </Dropdown>
      ),
    },
  ]

  return (
    <AppLayout onAddClick={() => setModalOpen(true)}>
      <div className="p-0">
        <Table
          columns={columns}
          dataSource={companies}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            showTotal: false,
            size: "small",
            className: "companies-pagination",
          }}
          className="companies-table"
        />
      </div>

      <CompanyModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingCompany(null)
        }}
        onSubmit={handleAddEdit}
        initialValues={editingCompany || undefined}
        title={editingCompany ? "Редактировать компанию" : "Добавить компанию"}
      />
    </AppLayout>
  )
}

