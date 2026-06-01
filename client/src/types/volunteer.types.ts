import type { BaseEntity } from './index'

export interface VolunteerApplication extends BaseEntity {
  fullName: string
  email: string
  phone: string
  interests: string[]
  availability: string
  message?: string
  status?: 'pending' | 'approved' | 'rejected'
  submittedAt: string
}

export interface VolunteerFormData {
  fullName: string
  email: string
  phone: string
  interests: string[]
  availability: string
  message?: string
}