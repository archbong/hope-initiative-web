export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'event'
  publishedTime?: string
  author?: string
  tags?: string[]
  noIndex?: boolean
}

export interface OrganizationSchemaProps {
  name: string
  url: string
  logo: string
  description: string
  email: string
  phone: string
  address: string
}