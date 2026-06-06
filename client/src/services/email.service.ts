// src/services/email.service.ts

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface VolunteerFormData {
  fullName: string
  email: string
  phone: string
  interests: string[]
  availability: string
  message?: string
}

export interface DonationReceiptData {
  donorName: string
  donorEmail: string
  amount: number
  transactionId: string
  date: string
  paymentMethod: string
}

class EmailService {
  formAccessKey: string
  volunteerAccessKey: string
  donationAccessKey: string
  newsletterAccessKey: string
  private contactEmail: string
  private volunteerEmail: string

  constructor() {
    this.formAccessKey = import.meta.env.VITE_CONTACT_FORM_ID || ''
    this.volunteerAccessKey = import.meta.env.VITE_VOLUNTEER_FORM_ID || ''
    this.donationAccessKey = import.meta.env.VITE_DONATION_FORM_ID || ''
    this.newsletterAccessKey = import.meta.env.VITE_NEWSLETTER_FORM_ID || ''
    this.contactEmail = import.meta.env.VITE_WEB3FORMS_EMAIL || 'info@hopeforthehopeless.org'
    this.volunteerEmail = import.meta.env.VITE_WEB3FORMS_VOLUNTEER_EMAIL || 'volunteer@hopeforthehopeless.org'
  }

  /**
   * Generic sendEmail method - Core email sending logic
   * All other email methods use this to avoid code duplication
   */
  async sendEmail(formData: FormData): Promise<{ success: boolean; message: string }> {
    try {
      // Ensure required fields are present
      if (!formData.has('access_key')) {
        formData.append('access_key', this.formAccessKey)
      }

      if (!formData.has('to_email')) {
        formData.append('to_email', this.contactEmail)
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        console.log('Email sent successfully via Web3Forms')
        return { success: true, message: 'Email sent successfully' }
      } else {
        console.error('Web3Forms error:', result)
        return { success: false, message: result.message || 'Failed to send email' }
      }
    } catch (error) {
      console.error('Email send error:', error)
      return { success: false, message: 'Failed to send email' }
    }
  }

  /**
   * Send contact form submission
   */
  async sendContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData()
      formData.append('accessKey', this.formAccessKey)
      formData.append('subject', data.subject)
      formData.append('from_name', data.name)
      formData.append('from_email', data.email)
      formData.append('phone', data.phone || 'Not provided')
      formData.append('message', data.message)
      formData.append('replyto', data.email)

      return await this.sendEmail(formData)
    } catch (error) {
      console.error('Contact form email error:', error)
      return { success: false, message: 'Failed to send message. Please try again.' }
    }
  }

  /**
   * Send volunteer application
   */
  async sendVolunteerApplication(data: VolunteerFormData): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData()
      formData.append('accessKey', this.volunteerAccessKey)
      formData.append('subject', `Volunteer Application: ${data.fullName}`)
      formData.append('from_name', data.fullName)
      formData.append('from_email', data.email)
      formData.append('phone', data.phone)
      formData.append('interests', data.interests.join(', '))
      formData.append('availability', data.availability)
      formData.append('message', data.message || 'No additional message')
      formData.append('to_email', this.volunteerEmail)
      formData.append('replyto', data.email)

      return await this.sendEmail(formData)
    } catch (error) {
      console.error('Volunteer application email error:', error)
      return { success: false, message: 'Failed to submit application. Please try again.' }
    }
  }

  /**
   * Send donation receipt / notification
   */
  async sendDonationReceipt(data: DonationReceiptData): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData()
      formData.append('accessKey', this.donationAccessKey)
      formData.append('subject', `New Donation: ${data.donorName}`)
      formData.append('from_name', data.donorName)
      formData.append('from_email', data.donorEmail)
      formData.append('amount', `₦${data.amount.toLocaleString()}`)
      formData.append('transaction_id', data.transactionId)
      formData.append('date', data.date)
      formData.append('payment_method', data.paymentMethod)
      formData.append('message', `Donation of ₦${data.amount.toLocaleString()} received from ${data.donorName}`)

      return await this.sendEmail(formData)
    } catch (error) {
      console.error('Donation receipt email error:', error)
      return { success: false, message: 'Failed to send notification.' }
    }
  }

  /**
   * Send newsletter subscription confirmation
   */
  async sendNewsletterConfirmation(email: string, name?: string): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData()
      formData.append('accessKey', this.newsletterAccessKey)
      formData.append('subject', 'Newsletter Subscription')
      formData.append('from_name', name || 'New Subscriber')
      formData.append('from_email', email)
      formData.append('message', `New newsletter subscription request from ${email}`)

      return await this.sendEmail(formData)
    } catch (error) {
      console.error('Newsletter email error:', error)
      return { success: false, message: 'Failed to subscribe. Please try again.' }
    }
  }

  /**
   * Test the email configuration
   */
  async testConfig(): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData()
      formData.append('subject', 'Web3Forms Configuration Test')
      formData.append('from_name', 'System Test')
      formData.append('from_email', 'test@hopeforthehopeless.org')
      formData.append('message', '✅ This is a test email from Hope for the Hopeless Initiative.\n\nYour Web3Forms configuration is working correctly!')

      return await this.sendEmail(formData)
    } catch (error) {
      console.error('Test email error:', error)
      return { success: false, message: 'Test failed. Please check your configuration.' }
    }
  }
}

export const emailService = new EmailService()