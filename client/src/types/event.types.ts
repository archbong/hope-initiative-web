import type { BaseEntity } from './index'

export interface Event extends BaseEntity {
  id: string
  title: string
  slug: string
  description: string
  content: string
  date: string
  endDate?: string
  location: string
  // category: 'outreach' | 'announcement' | 'youth' | 'partnership' | 'health' | 'milestone'
  category: string
  // type: 'event' | 'news'
  type: string
  image: string
  thumbnail?: string
  author: string
  readTime: string
  featured?: boolean
  // status: 'upcoming' | 'ongoing' | 'completed' | 'past'
  status?: string
  registrationLink?: string
  contactEmail?: string
  contactPhone?: string
  gallery?: string[]
  tags?: string[]
}

export interface EventFilters {
  category?: string
  // type?: 'event' | 'news'
  type?: string
  status?: string
  featured?: boolean
  search?: string
}

export interface EventFormData {
  title: string
  description: string
  content: string
  date: string
  location: string
  category: string
  // type: 'event' | 'news'
  type: string
  author: string
}