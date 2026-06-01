import type { BaseEntity } from './index'

export interface ProgramInitiative {
  name: string
  description: string
  achievements: string
  icon?: string
}

export interface Program extends BaseEntity {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string
  impact: string
  duration: string
  eligibility: string
  // category: 'youth' | 'humanitarian' | 'family' | 'sustainable'
  category: string,
  featured?: boolean
  order?: number
  initiatives: ProgramInitiative[]
  image: string
  gallery?: string[]


}

export interface ProgramFilters {
  category?: string
  featured?: boolean
  search?: string
}