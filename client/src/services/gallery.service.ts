import type { ApiResponse } from '../types'
import galleryData from '../data/gallery.json'
import { API_CONFIG, simulateDelay } from './api.config'
import type { GalleryFilters, GalleryImage } from '../types/gallery.types'

class GalleryService {
  private gallery: GalleryImage[] = galleryData.gallery

  // Get all gallery images
  async getAll(): Promise<ApiResponse<GalleryImage[]>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future API call
    }

    await simulateDelay(300)

    return {
      success: true,
      data: this.gallery,
      total: this.gallery.length,
      message: 'Gallery images retrieved successfully'
    }
  }

  // Get image by ID
  async getById(id: number): Promise<ApiResponse<GalleryImage | null>> {
    await simulateDelay(200)

    const image = this.gallery.find(img => img.id === id)

    return {
      success: !!image,
      data: image || null,
      message: image ? 'Image retrieved successfully' : 'Image not found'
    }
  }

  // Get images by category
  async getByCategory(category: string): Promise<ApiResponse<GalleryImage[]>> {
    await simulateDelay(250)

    const filtered = this.gallery.filter(img => img.category === category)

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Images retrieved successfully'
    }
  }

  // Get recent images
  async getRecent(limit: number = 6): Promise<ApiResponse<GalleryImage[]>> {
    await simulateDelay(200)

    const recent = [...this.gallery]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: recent,
      total: recent.length,
      message: 'Recent images retrieved successfully'
    }
  }

  // Filter gallery images
  async filter(filters: GalleryFilters): Promise<ApiResponse<GalleryImage[]>> {
    await simulateDelay(300)

    let filtered = [...this.gallery]

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(img => img.category === filters.category)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(searchLower) ||
        img.description.toLowerCase().includes(searchLower) ||
        img.location.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Images filtered successfully'
    }
  }

  // Get categories with counts
  async getCategories(): Promise<ApiResponse<{ id: string; label: string; count: number }[]>> {
    await simulateDelay(100)

    const categoryMap = new Map<string, number>()

    this.gallery.forEach(img => {
      categoryMap.set(img.category, (categoryMap.get(img.category) || 0) + 1)
    })

    const categories = [
      { id: 'all', label: 'All', count: this.gallery.length },
      { id: 'food', label: 'Food Distribution', count: categoryMap.get('food') || 0 },
      { id: 'youth', label: 'Youth Programs', count: categoryMap.get('youth') || 0 },
      { id: 'events', label: 'Community Events', count: categoryMap.get('events') || 0 },
      { id: 'outreach', label: 'Outreach Activities', count: categoryMap.get('outreach') || 0 }
    ]

    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    }
  }

  // Get random images (for homepage)
  async getRandom(limit: number = 4): Promise<ApiResponse<GalleryImage[]>> {
    await simulateDelay(200)

    const shuffled = [...this.gallery].sort(() => 0.5 - Math.random())
    const random = shuffled.slice(0, limit)

    return {
      success: true,
      data: random,
      total: random.length,
      message: 'Random images retrieved successfully'
    }
  }
}

export const galleryService = new GalleryService()