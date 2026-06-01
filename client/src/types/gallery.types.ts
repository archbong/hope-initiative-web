import type { BaseEntity } from './index'

export interface GalleryImage extends BaseEntity {
  id: number
  title: string
  description: string
  // category: 'food' | 'youth' | 'events' | 'outreach'
  category: string
  date: string
  location: string
  image: string
  thumbnail: string
  photographer?: string
}

export interface GalleryFilters {
  category?: string
  search?: string
}