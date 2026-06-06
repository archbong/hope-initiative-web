import newsletterTemplate from '../email-templates/newsletter.html?raw'

export interface NewsletterData {
  subscriberName: string
  subscriberEmail: string
  date: string
  mealsDistributed: number
  childrenSupported: number
  youthReached: number
  volunteersActive: number
  storyQuote: string
  storyName: string
  storyLocation: string
  storyLink: string
  events: Array<{
    title: string
    date: string
    location: string
    link: string
  }>
}

class NewsletterService {
  private accessKey: string
  private newsletterEmail: string

  constructor() {
    this.accessKey = import.meta.env.VITE_NEWSLETTER_FORM_ID || ''
    this.newsletterEmail = import.meta.env.VITE_NEWSLETTER_EMAIL || ''
  }

  // Generate HTML for newsletter email
  private generateNewsletterHTML(data: NewsletterData): string {
    let html = newsletterTemplate

    // Basic replacements
    html = html.replace(/{{subscriber_name}}/g, data.subscriberName)
    html = html.replace(/{{date}}/g, data.date)
    html = html.replace(/{{meals_distributed}}/g, data.mealsDistributed.toLocaleString())
    html = html.replace(/{{children_supported}}/g, data.childrenSupported.toLocaleString())
    html = html.replace(/{{youth_reached}}/g, data.youthReached.toLocaleString())
    html = html.replace(/{{volunteers_active}}/g, data.volunteersActive.toLocaleString())
    html = html.replace(/{{story_quote}}/g, data.storyQuote)
    html = html.replace(/{{story_name}}/g, data.storyName)
    html = html.replace(/{{story_location}}/g, data.storyLocation)
    html = html.replace(/{{story_link}}/g, data.storyLink)
    html = html.replace(/{{donate_link}}/g, `${window.location.origin}/donate`)
    html = html.replace(/{{volunteer_link}}/g, `${window.location.origin}/volunteer`)
    html = html.replace(/{{facebook_url}}/g, 'https://facebook.com/hopeforthehopeless')
    html = html.replace(/{{twitter_url}}/g, 'https://twitter.com/hopeforthehopeless')
    html = html.replace(/{{instagram_url}}/g, 'https://instagram.com/hopeforthehopeless')
    html = html.replace(/{{linkedin_url}}/g, 'https://linkedin.com/company/hopeforthehopeless')
    html = html.replace(/{{contact_email}}/g, 'info@hopeforthehopeless.org')
    html = html.replace(/{{contact_phone}}/g, '+234 123 456 7890')
    html = html.replace(/{{unsubscribe_link}}/g, `${window.location.origin}/unsubscribe?email=${encodeURIComponent(data.subscriberEmail)}`)
    html = html.replace(/{{year}}/g, new Date().getFullYear().toString())

    // Generate events HTML
    const eventsHtml = data.events.map(event => `
      <div class="event-item" style="display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid #e2e8f0;">
        <div class="event-date" style="min-width: 60px; text-align: center;">
          <div class="event-day" style="font-size: 24px; font-weight: 800; color: #0B5ED7; line-height: 1;">${new Date(event.date).getDate()}</div>
          <div class="event-month" style="font-size: 10px; font-weight: 600; color: #64748b; text-transform: uppercase;">${new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
        </div>
        <div class="event-info" style="flex: 1;">
          <div class="event-title" style="font-weight: 600; color: #1a1a2e; margin: 0 0 4px;">${event.title}</div>
          <div class="event-location" style="font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px;">
            <span>📍</span> ${event.location}
          </div>
        </div>
        <div>
          <a href="${event.link}" style="background-color: #0B5ED7; color: white; padding: 6px 16px; border-radius: 20px; text-decoration: none; font-size: 12px; font-weight: 500;">Details →</a>
        </div>
      </div>
    `).join('')

    html = html.replace(/{{events_list}}/g, eventsHtml)

    return html
  }

  // Send newsletter to a subscriber
  async sendNewsletter(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    try {
      const htmlContent = this.generateNewsletterHTML(data)

      const formData = new FormData()
      formData.append('access_key', this.accessKey)
      formData.append('subject', `Hope for the Hopeless - Monthly Newsletter (${data.date})`)
      formData.append('from_name', 'Hope for the Hopeless Initiative')
      formData.append('from_email', this.newsletterEmail)
      formData.append('to_email', data.subscriberEmail)
      formData.append('html', htmlContent)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        console.log('Newsletter sent successfully to:', data.subscriberEmail)
        return { success: true, message: 'Newsletter sent successfully!' }
      } else {
        console.error('Web3Forms error:', result)
        return { success: false, message: result.message || 'Failed to send newsletter' }
      }
    } catch (error) {
      console.error('Newsletter send error:', error)
      return { success: false, message: 'Failed to send newsletter. Please try again.' }
    }
  }

  // Send bulk newsletter to multiple subscribers
  async sendBulkNewsletter(subscribers: Array<{ name: string; email: string }>, baseData: Omit<NewsletterData, 'subscriberName' | 'subscriberEmail'>): Promise<{ success: number; failed: number }> {
    let success = 0
    let failed = 0

    for (const subscriber of subscribers) {
      const data: NewsletterData = {
        ...baseData,
        subscriberName: subscriber.name,
        subscriberEmail: subscriber.email
      }

      const result = await this.sendNewsletter(data)
      if (result.success) {
        success++
      } else {
        failed++
      }

      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    return { success, failed }
  }
}

export const newsletterService = new NewsletterService()