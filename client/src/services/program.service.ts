import type { ApiResponse } from '../types'
import programsData from '../data/programs.json'
import { API_CONFIG, simulateDelay } from './api.config'
import type { Program, ProgramFilters } from '../types/program.types'

// Local data service (Phase 1)
class ProgramService {
  private programs: Program[] = programsData.programs

  // Get all programs
  async getAll(): Promise<ApiResponse<Program[]>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future: Replace with actual API call
      // const response = await apiRequest<ApiResponse<Program[]>>('/programs')
      // return response
    }

    // Simulate network delay for realistic testing
    await simulateDelay(300)

    return {
      success: true,
      data: this.programs,
      total: this.programs.length,
      message: 'Programs retrieved successfully'
    }
  }

  // Get program by ID
  async getById(id: string): Promise<ApiResponse<Program | null>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future: Replace with actual API call
      // const response = await apiRequest<ApiResponse<Program>>(`/programs/${id}`)
      // return response
    }

    await simulateDelay(200)

    const program = this.programs.find(p => p.id === id || p.slug === id)

    return {
      success: !!program,
      data: program || null,
      message: program ? 'Program retrieved successfully' : 'Program not found'
    }
  }

  // Get programs by category
  async getByCategory(category: string): Promise<ApiResponse<Program[]>> {
    await simulateDelay(250)

    const filtered = this.programs.filter(p => p.category === category)

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Programs retrieved successfully'
    }
  }

  // Get featured programs
  async getFeatured(): Promise<ApiResponse<Program[]>> {
    await simulateDelay(250)

    const featured = this.programs.filter(p => p.featured).sort((a, b) => (a.order || 0) - (b.order || 0))

    return {
      success: true,
      data: featured,
      total: featured.length,
      message: 'Featured programs retrieved successfully'
    }
  }

  // Filter programs
  async filter(filters: ProgramFilters): Promise<ApiResponse<Program[]>> {
    await simulateDelay(300)

    let filtered = [...this.programs]

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(p => p.featured === filters.featured)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      )
    }

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Programs filtered successfully'
    }
  }

  // Get program categories
  async getCategories(): Promise<ApiResponse<string[]>> {
    await simulateDelay(100)

    const categories = [...new Set(this.programs.map(p => p.category))]

    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    }
  }
}

export const programService = new ProgramService()