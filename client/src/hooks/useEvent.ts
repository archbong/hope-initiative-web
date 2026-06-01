import { useState, useEffect, useCallback, useRef } from 'react'
import { eventService } from '../services/event.service'
import type { Event, EventFilters } from '../types/event.types'

interface UseEventsReturn {
  events: Event[]
  loading: boolean
  error: string | null
  total: number
  categories: { id: string; label: string; count: number }[]
  upcomingEvents: Event[]
  featuredEvents: Event[]
  latestNews: Event[]
  fetchEvents: (filters?: EventFilters) => Promise<void>
  getEventById: (id: string) => Promise<Event | null>
  getEventBySlug: (slug: string) => Promise<Event | null>
  fetchCategories: () => Promise<void>
  fetchUpcoming: () => Promise<void>
  fetchFeatured: () => Promise<void>
  fetchLatestNews: () => Promise<void>
}

export const useEvents = (initialFilters?: EventFilters): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [categories, setCategories] = useState<{ id: string; label: string; count: number }[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [latestNews, setLatestNews] = useState<Event[]>([])
  const isMounted = useRef(true)

  const fetchEvents = useCallback(async (filters?: EventFilters) => {
    if (!isMounted.current) return

    setLoading(true)
    setError(null)

    try {
      const response = await eventService.filter(filters || {})
      if (isMounted.current && response.success) {
        setEvents(response.data)
        setTotal(response.total || 0)
      } else if (isMounted.current && !response.success) {
        setError(response.message || 'Failed to fetch events')
      }
    } catch (err) {
      if (isMounted.current) {
        setError('An error occurred while fetching events')
      }
      console.error(err)
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }, [])

  const getEventById = useCallback(async (id: string): Promise<Event | null> => {
    try {
      const response = await eventService.getById(id)
      return response.success ? response.data : null
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  const getEventBySlug = useCallback(async (slug: string): Promise<Event | null> => {
    try {
      const response = await eventService.getBySlug(slug)
      return response.success ? response.data : null
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const response = await eventService.getCategories()
      if (isMounted.current && response.success) {
        setCategories(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }, [])

  const fetchUpcoming = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const response = await eventService.getUpcoming(3)
      if (isMounted.current && response.success) {
        setUpcomingEvents(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch upcoming events:', err)
    }
  }, [])

  const fetchFeatured = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const response = await eventService.getFeatured(3)
      if (isMounted.current && response.success) {
        setFeaturedEvents(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch featured events:', err)
    }
  }, [])

  const fetchLatestNews = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const response = await eventService.getLatestNews(5)
      if (isMounted.current && response.success) {
        setLatestNews(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch latest news:', err)
    }
  }, [])

  useEffect(() => {
    isMounted.current = true
    fetchEvents(initialFilters)
    fetchCategories()
    fetchUpcoming()
    fetchFeatured()
    fetchLatestNews()

    return () => {
      isMounted.current = false
    }
  }, [fetchEvents, fetchCategories, fetchUpcoming, fetchFeatured, fetchLatestNews, initialFilters])

  return {
    events,
    loading,
    error,
    total,
    categories,
    upcomingEvents,
    featuredEvents,
    latestNews,
    fetchEvents,
    getEventById,
    getEventBySlug,
    fetchCategories,
    fetchUpcoming,
    fetchFeatured,
    fetchLatestNews
  }
}