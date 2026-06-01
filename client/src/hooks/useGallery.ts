import { useState, useEffect, useCallback, useRef } from 'react'
import { galleryService } from '../services/gallery.service'
import type { GalleryImage, GalleryFilters } from '../types/gallery.types'

interface UseGalleryReturn {
  images: GalleryImage[]
  loading: boolean
  error: string | null
  total: number
  categories: { id: string; label: string; count: number }[]
  fetchImages: (filters?: GalleryFilters) => Promise<void>
  fetchCategories: () => Promise<void>
  getImageById: (id: number) => Promise<GalleryImage | null>
}

export const useGallery = (initialFilters?: GalleryFilters): UseGalleryReturn => {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [categories, setCategories] = useState<{ id: string; label: string; count: number }[]>([])
  const isMounted = useRef(true)
  const initialFiltersRef = useRef(initialFilters)

  const fetchImages = useCallback(async (filters?: GalleryFilters) => {
    if (!isMounted.current) return

    setLoading(true)
    setError(null)

    try {
      const response = await galleryService.filter(filters || {})
      if (isMounted.current && response.success) {
        setImages(response.data)
        setTotal(response.total || 0)
      } else if (isMounted.current && !response.success) {
        setError(response.message || 'Failed to fetch images')
      }
    } catch (err) {
      if (isMounted.current) {
        setError('An error occurred while fetching images')
      }
      console.error(err)
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    if (!isMounted.current) return

    try {
      const response = await galleryService.getCategories()
      if (isMounted.current && response.success) {
        setCategories(response.data)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }, [])

  const getImageById = useCallback(async (id: number): Promise<GalleryImage | null> => {
    try {
      const response = await galleryService.getById(id)
      return response.success ? response.data : null
    } catch (err) {
      console.error(err)
      return null
    }
  }, [])

  useEffect(() => {
    isMounted.current = true
    fetchImages(initialFiltersRef.current)
    fetchCategories()

    return () => {
      isMounted.current = false
    }
  }, [fetchImages, fetchCategories])

  return {
    images,
    loading,
    error,
    total,
    categories,
    fetchImages,
    fetchCategories,
    getImageById
  }
}