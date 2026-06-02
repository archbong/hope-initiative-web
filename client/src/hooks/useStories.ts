import { useState, useEffect, useCallback, useRef } from 'react'
import { storyService } from '../services/story.service'
import type { Story, StoryFilters } from '../types/story.types'

interface UseStoriesReturn {
  stories: Story[]
  loading: boolean
  error: string | null
  total: number
  fetchStories: (filters?: StoryFilters) => Promise<void>
  getStoryById: (id: string) => Promise<Story | null>
}

export const useStories = (initialFilters?: StoryFilters): UseStoriesReturn => {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)

  // Fix: Capture filters in a ref to prevent infinite re-render loop cycles
  const initialFiltersRef = useRef(initialFilters)

  const fetchStories = useCallback(async (filters?: StoryFilters) => {
    setLoading(true)
    setError(null)

    try {
      const response = await storyService.filter(filters || {})
      if (response.success) {
        setStories(response.data)
        setTotal(response.total || 0)
      } else {
        setError(response.message || 'Failed to fetch stories')
      }
    } catch (err) {
      setError('An error occurred while fetching stories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getStoryById = useCallback(async (id: string): Promise<Story | null> => {
    try {
      const response = await storyService.getById(id)
      return response.success ? response.data : null
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  useEffect(() => {
    fetchStories(initialFiltersRef.current)
  }, [fetchStories]) // Clear of warnings

  return {
    stories,
    loading,
    error,
    total,
    fetchStories,
    getStoryById
  }
}