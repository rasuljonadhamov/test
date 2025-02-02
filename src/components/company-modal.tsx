import { useEffect } from "react"
import { Modal, Form, Input, InputNumber } from "antd"
import type { Company } from "../types/company"

interface CompanyModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: { name: string; count: number }) => void
  initialValues?: Company
  title: string
}

export default function CompanyModal({ open, onClose, onSubmit, initialValues, title }: CompanyModalProps) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { name: "", count: 0 })
    }
  }, [open, initialValues, form])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values)
      form.resetFields()
    })
  }

  return (
    <Modal
      open={open}
      title={title}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      onOk={handleSubmit}
      okText={initialValues ? "Сохранить" : "Добавить компанию"}
      cancelText="Отмена"
      okButtonProps={{
        className: "bg-[#00B2A9] hover:bg-[#00A099] border-none",
      }}
      className="company-modal"
    >
      <Form form={form} layout="vertical" initialValues={initialValues || { name: "", count: 0 }}>
        <Form.Item
          name="name"
          label="Название компании"
          rules={[{ required: true, message: "Пожалуйста, введите название компании" }]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>

        <Form.Item
          name="count"
          label="Количество сотрудников"
          rules={[{ required: true, message: "Пожалуйста, введите количество сотрудников" }]}
        >
          <InputNumber className="w-full" placeholder="Введите количество" min={0} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

