"use client"
import React, { useState } from 'react'
import { studentLeadsAPI } from '@/lib/api'

interface PopupFormProps {
  triggerContent: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export default function PopupForm({ triggerContent, isOpen, onClose }: PopupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    state: '',
    mobile: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitMessage('')

    try {
      // Prepare data for API submission
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        program: formData.course,
        stateProvince: formData.state,
        status: 'new',
        message: `Interested in ${formData.course} program`,
        leadSource: 'manipal-online-website',
        locale: 'en'
      }

      const response = await studentLeadsAPI.submit(leadData)
      
      if (response.success) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you! Your information has been submitted successfully. Our team will contact you soon.')
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          course: '',
          state: '',
          mobile: ''
        })
        
        // Close popup after 3 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
          setSubmitMessage('')
        }, 3000)
      } else {
        setSubmitStatus('error')
        setSubmitMessage(response.message || 'Failed to submit your information. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setSubmitMessage('An error occurred while submitting your information. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '32px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          ×
        </button>

        {/* Form Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 8px 0',
            textAlign: 'center'
          }}>
            Get Your <span style={{ color: '#ff6a00' }}>Free Counseling</span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            textAlign: 'center',
            margin: '0'
          }}>
            Fill out the form below and our academic counselors will get in touch with you.
          </p>
        </div>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div style={{
            background: '#d1fae5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#065f46',
            fontSize: '14px'
          }}>
            ✅ {submitMessage}
          </div>
        )}

        {submitStatus === 'error' && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#991b1b',
            fontSize: '14px'
          }}>
            ❌ {submitMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: isSubmitting ? '#f9fafb' : '#fff',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onFocus={(e) => !isSubmitting && (e.target.style.borderColor = '#ff6a00')}
              onBlur={(e) => !isSubmitting && (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: isSubmitting ? '#f9fafb' : '#fff',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onFocus={(e) => !isSubmitting && (e.target.style.borderColor = '#ff6a00')}
              onBlur={(e) => !isSubmitting && (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          <div>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: isSubmitting ? '#f9fafb' : '#fff',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onFocus={(e) => !isSubmitting && (e.target.style.borderColor = '#ff6a00')}
              onBlur={(e) => !isSubmitting && (e.target.style.borderColor = '#d1d5db')}
            >
              <option value="">Select Course</option>
              <option value="BBA">BBA - Bachelor of Business Administration</option>
              <option value="BCA">BCA - Bachelor of Computer Applications</option>
              <option value="BCOM">B.COM - Bachelor of Commerce</option>
              <option value="MBA">MBA - Master of Business Administration</option>
              <option value="MCA">MCA - Master of Computer Applications</option>
              <option value="MCOM">M.COM - Master of Commerce</option>
              <option value="MA-JMC">MA-JMC - Master of Arts In Journalism & Mass Communication</option>
            </select>
          </div>

          <div>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: isSubmitting ? '#f9fafb' : '#fff',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onFocus={(e) => !isSubmitting && (e.target.style.borderColor = '#ff6a00')}
              onBlur={(e) => !isSubmitting && (e.target.style.borderColor = '#d1d5db')}
            >
              <option value="">Select State</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>

          <div>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                background: isSubmitting ? '#f9fafb' : '#fff',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box',
                opacity: isSubmitting ? 0.6 : 1
              }}
              onFocus={(e) => !isSubmitting && (e.target.style.borderColor = '#ff6a00')}
              onBlur={(e) => !isSubmitting && (e.target.style.borderColor = '#d1d5db')}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: isSubmitting ? '#9ca3af' : '#ff6a00',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '8px',
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting && e.currentTarget) {
                e.currentTarget.style.background = '#e55a00'
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting && e.currentTarget) {
                e.currentTarget.style.background = '#ff6a00'
              }
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
} 