import { apiClient } from "../lib/api-client"
import type { Company, AddCompanyRequest, UpdateCompanyRequest } from "../types/company"

export const companyService = {
  async getCompanies(): Promise<Company[]> {
    const response = await apiClient.get<Company[]>("/companies/get-all")
    return response.data
  },

  async getCompanyById(id: string): Promise<Company> {
    const response = await apiClient.get<Company>(`/companies/get/${id}`)
    return response.data
  },

  async addCompany(data: AddCompanyRequest): Promise<void> {
    await apiClient.post("/companies/add", data)
  },

  async updateCompany(data: UpdateCompanyRequest): Promise<void> {
    await apiClient.put("/companies/update", data)
  },

  async deleteCompany(id: string): Promise<void> {
    await apiClient.delete("/companies/delete/by-id", {
      data: id,
    })
  },
}

