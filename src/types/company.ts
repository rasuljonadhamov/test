export interface Company {
  id: string
  name: string
  count: number
}

export interface AddCompanyRequest {
  name: string
  count: number
}

export interface UpdateCompanyRequest {
  id: string
  name: string
  count: number
}

