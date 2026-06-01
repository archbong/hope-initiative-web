import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  tags?: string[]
}

const SEOHead: React.FC<SEOProps> = ({
  title = 'Hope for the Hopeless Initiative - Restoring Hope, Transforming Lives',
  description = 'Hope for the Hopeless Initiative provides humanitarian support, youth empowerment, counseling services, and community development programs across Nigeria.',
  image = '/images/og-image.jpg',
  url = 'https://hopeforthehopeless.org',
  type = 'website',
  publishedTime,
  author = 'Hope for the Hopeless Initiative',
  tags = []
}) => {
  const siteTitle = 'Hope for the Hopeless Initiative'
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Keywords */}
      <meta name="keywords" content={[
        'NGO Nigeria',
        'Hope for the Hopeless',
        'humanitarian aid',
        'youth empowerment',
        'orphan support',
        'food distribution',
        'community development',
        'volunteer Nigeria',
        'donate to charity',
        ...tags
      ].join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="NG" />
      <meta name="geo.placename" content="Abuja" />
      <meta name="geo.position" content="9.072264;7.491302" />
      <meta name="ICBM" content="9.072264, 7.491302" />

      {/* Favicon Links */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  )
}

export default SEOHead