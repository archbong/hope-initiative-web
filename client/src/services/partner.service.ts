import type { ApiResponse } from '../types'
import partnersData from '../data/partners.json'
import { simulateDelay } from './api.config'

export interface Partner {
  id: number
  name: string
  logo: string
  description: string
  website: string
  type: string
  featured: boolean
}

class PartnerService {
  private partners = partnersData.partners

  // Get all partners
  async getAll(): Promise<ApiResponse<Partner[]>> {
    await simulateDelay(300)

    const allPartners = [
      ...this.partners.corporate,
      ...this.partners.international,
      ...this.partners.local
    ]

    return {
      success: true,
      data: allPartners,
      total: allPartners.length,
      message: 'Partners retrieved successfully'
    }
  }

  // Get corporate partners
  async getCorporate(): Promise<ApiResponse<Partner[]>> {
    await simulateDelay(250)

    return {
      success: true,
      data: this.partners.corporate,
      total: this.partners.corporate.length,
      message: 'Corporate partners retrieved successfully'
    }
  }

  // Get international partners
  async getInternational(): Promise<ApiResponse<Partner[]>> {
    await simulateDelay(250)

    return {
      success: true,
      data: this.partners.international,
      total: this.partners.international.length,
      message: 'International partners retrieved successfully'
    }
  }

  // Get local partners
  async getLocal(): Promise<ApiResponse<Partner[]>> {
    await simulateDelay(250)

    return {
      success: true,
      data: this.partners.local,
      total: this.partners.local.length,
      message: 'Local partners retrieved successfully'
    }
  }

  // Get featured partners
  async getFeatured(): Promise<ApiResponse<Partner[]>> {
    await simulateDelay(200)

    const allPartners = [
      ...this.partners.corporate,
      ...this.partners.international,
      ...this.partners.local
    ]

    const featured = allPartners.filter(p => p.featured)

    return {
      success: true,
      data: featured,
      total: featured.length,
      message: 'Featured partners retrieved successfully'
    }
  }

  // Get partner by ID
  async getById(id: number): Promise<ApiResponse<Partner | null>> {
    await simulateDelay(200)

    const allPartners = [
      ...this.partners.corporate,
      ...this.partners.international,
      ...this.partners.local
    ]

    const partner = allPartners.find(p => p.id === id)

    return {
      success: !!partner,
      data: partner || null,
      message: partner ? 'Partner retrieved successfully' : 'Partner not found'
    }
  }

  // Get partner types
  async getTypes(): Promise<ApiResponse<string[]>> {
    await simulateDelay(100)

    return {
      success: true,
      data: ['corporate', 'international', 'local'],
      message: 'Partner types retrieved successfully'
    }
  }

  // Get partner count
  async getCounts(): Promise<ApiResponse<Record<string, number>>> {
    await simulateDelay(100)

    return {
      success: true,
      data: {
        corporate: this.partners.corporate.length,
        international: this.partners.international.length,
        local: this.partners.local.length,
        total: this.partners.corporate.length + this.partners.international.length + this.partners.local.length
      },
      message: 'Partner counts retrieved successfully'
    }
  }
}

export const partnerService = new PartnerService()