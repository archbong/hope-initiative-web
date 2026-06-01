import type { BaseEntity } from './index'

export interface Story extends BaseEntity {
  id: string
  name: string
  age: number
  location: string
  story: string
  quote: string
  image: string
  fullImage: string
  date: string
  // category: 'Education' | 'Youth Development' | 'Humanitarian' | 'Family Welfare' | 'Health'
  category: string
  featured?: boolean
  videoUrl?: string
}

export interface StoryFilters {
  category?: string
  featured?: boolean
  search?: string
}