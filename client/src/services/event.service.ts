import type { ApiResponse } from '../types'
import eventsData from '../data/events.json'
import { API_CONFIG, simulateDelay } from './api.config'
import type { Event, EventFilters } from '../types/event.types'

class EventService {
  private events: Event[] = eventsData.events

  // Get all events/news
  async getAll(): Promise<ApiResponse<Event[]>> {
    if (API_CONFIG.USE_REAL_API) {
      // Future API call
    }

    await simulateDelay(300)

    // Sort by date (newest first)
    const sorted = [...this.events].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    return {
      success: true,
      data: sorted,
      total: sorted.length,
      message: 'Events retrieved successfully'
    }
  }

  // Get event by ID or slug
  async getById(id: string): Promise<ApiResponse<Event | null>> {
    await simulateDelay(200)

    const event = this.events.find(e => e.id === id || e.slug === id)

    return {
      success: !!event,
      data: event || null,
      message: event ? 'Event retrieved successfully' : 'Event not found'
    }
  }

  // Get upcoming events
  async getUpcoming(limit: number = 3): Promise<ApiResponse<Event[]>> {
    await simulateDelay(250)

    const today = new Date().toISOString().split('T')[0]
    const upcoming = this.events
      .filter(e => e.type === 'event' && e.date >= today && e.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: upcoming,
      total: upcoming.length,
      message: 'Upcoming events retrieved successfully'
    }
  }

  // Get featured events/news
  async getFeatured(limit: number = 3): Promise<ApiResponse<Event[]>> {
    await simulateDelay(250)

    const featured = this.events
      .filter(e => e.featured)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: featured,
      total: featured.length,
      message: 'Featured events retrieved successfully'
    }
  }

  // Get latest news
  async getLatestNews(limit: number = 5): Promise<ApiResponse<Event[]>> {
    await simulateDelay(250)

    const news = this.events
      .filter(e => e.type === 'news')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: news,
      total: news.length,
      message: 'Latest news retrieved successfully'
    }
  }

  // Filter events
  async filter(filters: EventFilters): Promise<ApiResponse<Event[]>> {
    await simulateDelay(300)

    let filtered = [...this.events]

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(e => e.category === filters.category)
    }

    if (filters.type) {
      filtered = filtered.filter(e => e.type === filters.type)
    }

    if (filters.status) {
      filtered = filtered.filter(e => e.status === filters.status)
    }

    if (filters.featured !== undefined) {
      filtered = filtered.filter(e => e.featured === filters.featured)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchLower) ||
        e.description.toLowerCase().includes(searchLower) ||
        e.content.toLowerCase().includes(searchLower) ||
        e.location.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      success: true,
      data: filtered,
      total: filtered.length,
      message: 'Events filtered successfully'
    }
  }

  // Get categories
  async getCategories(): Promise<ApiResponse<{ id: string; label: string; count: number }[]>> {
    await simulateDelay(100)

    const categoryMap = new Map<string, number>()

    this.events.forEach(event => {
      categoryMap.set(event.category, (categoryMap.get(event.category) || 0) + 1)
    })

    const categories = [
      { id: 'all', label: 'All', count: this.events.length },
      { id: 'outreach', label: 'Outreach', count: categoryMap.get('outreach') || 0 },
      { id: 'announcement', label: 'Announcements', count: categoryMap.get('announcement') || 0 },
      { id: 'youth', label: 'Youth Programs', count: categoryMap.get('youth') || 0 },
      { id: 'partnership', label: 'Partnerships', count: categoryMap.get('partnership') || 0 },
      { id: 'health', label: 'Health', count: categoryMap.get('health') || 0 },
      { id: 'milestone', label: 'Milestones', count: categoryMap.get('milestone') || 0 }
    ]

    return {
      success: true,
      data: categories,
      message: 'Categories retrieved successfully'
    }
  }

  // Get event by slug
  async getBySlug(slug: string): Promise<ApiResponse<Event | null>> {
    await simulateDelay(200)

    const event = this.events.find(e => e.slug === slug)

    return {
      success: !!event,
      data: event || null,
      message: event ? 'Event retrieved successfully' : 'Event not found'
    }
  }

  // Get related events
  async getRelated(eventId: string, limit: number = 3): Promise<ApiResponse<Event[]>> {
    await simulateDelay(200)

    const currentEvent = this.events.find(e => e.id === eventId || e.slug === eventId)

    if (!currentEvent) {
      return {
        success: true,
        data: [],
        total: 0,
        message: 'No related events found'
      }
    }

    const related = this.events
      .filter(e => e.id !== eventId && e.category === currentEvent.category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: related,
      total: related.length,
      message: 'Related events retrieved successfully'
    }
  }
}

export const eventService = new EventService()