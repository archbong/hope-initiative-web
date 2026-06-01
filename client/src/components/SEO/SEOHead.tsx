import { Helmet } from 'react-helmet-async'
import { SEO_CONFIG } from '../../config/seo.config'

interface SEOProps {
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

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  author = SEO_CONFIG.siteName,
  tags = [],
  noIndex = false,
}) => {
  const siteTitle = SEO_CONFIG.siteName
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`
  const metaDescription = description || SEO_CONFIG.siteDescription
  const metaKeywords = keywords || SEO_CONFIG.pages.home.keywords
  const metaImage = image || SEO_CONFIG.siteImage
  const canonicalUrl = url || `${SEO_CONFIG.siteUrl}${window.location.pathname}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />

      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Event Specific */}
      {type === 'event' && publishedTime && (
        <meta property="event:start_time" content={publishedTime} />
      )}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0B5ED7" />
      <meta name="format-detection" content="telephone=no" />

      {/* Geo Tags */}
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Abuja" />
      <meta name="geo.position" content="9.072264;7.491302" />
      <meta name="ICBM" content="9.072264, 7.491302" />

      {/* Business Info */}
      <meta name="business:contact_data:street_address" content={SEO_CONFIG.address} />
      <meta name="business:contact_data:locality" content="Abuja" />
      <meta name="business:contact_data:country_name" content="Nigeria" />
      <meta name="business:contact_data:email" content={SEO_CONFIG.email} />
      <meta name="business:contact_data:phone_number" content={SEO_CONFIG.phone} />
    </Helmet>
  )
}

export default SEOHead