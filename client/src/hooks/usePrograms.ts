import { useState, useEffect, useCallback } from 'react'
import { programService } from '../services/program.service'
import type { Program, ProgramFilters } from '../types/program.types'

interface UseProgramsReturn {
  programs: Program[]
  loading: boolean
  error: string | null
  total: number
  fetchPrograms: (filters?: ProgramFilters) => Promise<void>
  getProgramById: (id: string) => Promise<Program | null>
}

export const usePrograms = (initialFilters?: ProgramFilters): UseProgramsReturn => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)

  const fetchPrograms = useCallback(async (filters?: ProgramFilters) => {
    setLoading(true)
    setError(null)

    try {
      const response = await programService.filter(filters || {})
      if (response.success) {
        setPrograms(response.data)
        setTotal(response.total || 0)
      } else {
        setError(response.message || 'Failed to fetch programs')
      }
    } catch (err) {
      setError('An error occurred while fetching programs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getProgramById = useCallback(async (id: string): Promise<Program | null> => {
    try {
      const response = await programService.getById(id)
      return response.success ? response.data : null
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  useEffect(() => {
    fetchPrograms(initialFilters)
  }, [fetchPrograms, initialFilters]) // Add proper dependencies

  return {
    programs,
    loading,
    error,
    total,
    fetchPrograms,
    getProgramById
  }
}