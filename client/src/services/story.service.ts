import type { ApiResponse } from '../types'
import storiesData from '../data/stories.json'
import { API_CONFIG, simulateDelay } from './api.config'
import type { Story, StoryFilters } from '../types/story.types'

class StoryService {
  private stories: Story[] = storiesData.stories

  // Get all stories
  async getAll(): Promise<ApiResponse<Story[]>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future API call
    }

    await simulateDelay(300)

    return {
      success: true,
      data: this.stories,
      total: this.stories.length,
      message: 'Stories retrieved successfully'
    }
  }

  // Get story by ID
  async getById(id: string): Promise<ApiResponse<Story | null>> {
    await simulateDelay(200)

    const story = this.stories.find(s => s.id === id)

    return {
      success: !!story,
      data: story || null,
      message: story ? 'Story retrieved successfully' : 'Story not found'
    }
  }

  // Get featured stories
  async getFeatured(limit: number = 3): Promise<ApiResponse<Story[]>> {
    await simulateDelay(250)

    const featured = this.stories.filter(s => s.featured).slice(0, limit)

    return {
      success: true,
      data: featured,
      total: featured.length,
      message: 'Featured stories retrieved successfully'
    }
  }

  // Filter stories
  async filter(filters: StoryFilters): Promise<ApiResponse<Story[]>> {
    await simulateDelay(300)

    let filtered = [...this.stories]

    if (filters.category) {
      filtered = filtered.filter(s => s.category === filters.category)
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(s => s.featured === filters.featured)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchLower) ||
        s.story.toLowerCase().includes(searchLower) ||
        s.location.toLowerCase().includes(searchLower)
      )
    }

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Stories filtered successfully'
    }
  }

  // Get story categories
  async getCategories(): Promise<ApiResponse<string[]>> {
    await simulateDelay(100)

    const categories = [...new Set(this.stories.map(s => s.category))]

    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    }
  }
}

export const storyService = new StoryService()