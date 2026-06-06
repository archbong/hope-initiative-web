import { Helmet } from 'react-helmet-async'
import type { OrganizationSchemaProps } from '../../interfaces/SEO/seo'

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name,
  url,
  logo,
  description,
  email,
  phone,
  address,
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: name,
    url: url,
    logo: logo,
    description: description,
    email: email,
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: address,
      addressCountry: 'NG',
    },
    sameAs: [
      'https://www.facebook.com/hopeforthehopeless',
      'https://twitter.com/hopeforthehopeless',
      'https://www.instagram.com/hopeforthehopeless',
      'https://www.linkedin.com/company/hopeforthehopeless',
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export const EventSchema: React.FC<any> = ({ event, url }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location,
        addressCountry: 'NG',
      },
    },
    image: event.image,
    url: url,
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}