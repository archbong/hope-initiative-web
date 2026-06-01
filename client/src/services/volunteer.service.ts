import type { ApiResponse } from '../types'
import type { VolunteerApplication, VolunteerFormData } from '../types/volunteer.types'
import { API_CONFIG, simulateDelay } from './api.config'

class VolunteerService {
  // Submit volunteer application
  async submitApplication(data: VolunteerFormData): Promise<ApiResponse<VolunteerApplication>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future: Replace with actual API call
      // const response = await apiRequest<ApiResponse<VolunteerApplication>>('/volunteer', {
      //   method: 'POST',
      //   body: JSON.stringify(data)
      // })
      // return response
    }

    await simulateDelay(1000) // Simulate form submission delay

    // Create application record
    const application: VolunteerApplication = {
      id: Date.now().toString(),
      ...data,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    // Store in localStorage for demo purposes
    const applications = this.getLocalApplications()
    applications.push(application)
    localStorage.setItem('volunteer_applications', JSON.stringify(applications))

    // In a real scenario, this would send an email
    console.log('Volunteer Application Submitted:', application)

    return {
      success: true,
      data: application,
      message: 'Application submitted successfully! We will contact you soon.'
    }
  }

  // Get all applications (for admin - future use)
  async getAllApplications(): Promise<ApiResponse<VolunteerApplication[]>> {
    await simulateDelay(300)

    const applications = this.getLocalApplications()

    return {
      success: true,
      data: applications,
      total: applications.length,
      message: 'Applications retrieved successfully'
    }
  }

  // Get application by ID
  async getApplicationById(id: string): Promise<ApiResponse<VolunteerApplication | null>> {
    await simulateDelay(200)

    const applications = this.getLocalApplications()
    const application = applications.find(a => a.id === id)

    return {
      success: !!application,
      data: application || null,
      message: application ? 'Application retrieved successfully' : 'Application not found'
    }
  }

  // Update application status (for admin)
  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<ApiResponse<VolunteerApplication>> {
    await simulateDelay(300)

    const applications = this.getLocalApplications()
    const index = applications.findIndex(a => a.id === id)

    if (index === -1) {
      return {
        success: false,
        data: null as any,
        message: 'Application not found'
      }
    }

    applications[index].status = status
    applications[index].updatedAt = new Date().toISOString()
    localStorage.setItem('volunteer_applications', JSON.stringify(applications))

    return {
      success: true,
      data: applications[index],
      message: `Application ${status} successfully`
    }
  }

  // Helper to get local applications
  private getLocalApplications(): VolunteerApplication[] {
    const stored = localStorage.getItem('volunteer_applications')
    return stored ? JSON.parse(stored) : []
  }

  // Get volunteer opportunities
  async getOpportunities(): Promise<ApiResponse<any[]>> {
    await simulateDelay(200)

    const opportunities = [
      {
        id: '1',
        title: 'Food Distribution Assistant',
        description: 'Help pack and distribute food to vulnerable families',
        commitment: '4 hours/week',
        slots: 10
      },
      {
        id: '2',
        title: 'Youth Mentor',
        description: 'Mentor young people in our youth development program',
        commitment: '2-3 hours/week',
        slots: 5
      },
      {
        id: '3',
        title: 'Event Organizer',
        description: 'Help organize community outreach events',
        commitment: 'Flexible',
        slots: 8
      }
    ]

    return {
      success: true,
      data: opportunities,
      message: 'Opportunities retrieved successfully'
    }
  }
}

export const volunteerService = new VolunteerService()