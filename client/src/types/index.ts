export interface BaseEntity {
  id: string | number
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  total?: number
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}