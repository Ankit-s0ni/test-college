"use client"
import React, { useState } from 'react'
import { studentLeadsAPI } from '@/lib/api'

export default function FormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    state: '',
    mobile: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      e.currentTarget.style.background = '#ff6a00'
      e.currentTarget.style.color = '#fff'
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget) {
      e.currentTarget.style.background = '#ff6a00'
      e.currentTarget.style.color = '#fff'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    const { name, email, mobile, course } = formData
    if (!name || !email || !mobile || !course) {
      setMessage('Please fill all required fields.')
      return
    }
    setLoading(true)
    try {
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        program: formData.course,
        stateProvince: formData.state || '',
        status: 'new',
        message: `Interested in ${formData.course} program`,
        leadSource: 'manipal-online-form-section',
        locale: 'en'
      }

      const res = await studentLeadsAPI.submit(leadData)
      if (!res.success) throw new Error(res.message || 'Submission failed')
      setMessage('Thank you! We will contact you soon.')
      setFormData({ name: '', email: '', course: '', state: '', mobile: '' })
    } catch (err) {
      console.error(err)
      setMessage('Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ 
      padding: '80px 1rem', 
      background: '#fff' 
    }}>
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        flexWrap: 'wrap'
      }}>
        {/* Left Side - Form Image */}
        <div style={{ 
          flex: '1',
          minWidth: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <img 
            src="/assets/images/forrmm.webp" 
            alt="Student Form" 
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '12px'
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div style={{ 
          flex: '1',
          minWidth: '400px',
          padding: '40px 0'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 16px 0',
            lineHeight: 1.2
          }}>
            Get Your <span style={{ color: '#ff6a00' }}>Free Counseling</span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: 1.6,
            margin: '0 0 32px 0'
          }}>
            Fill out the form below and our academic counselors will get in touch with you to guide you through the admission process.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            <div>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
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
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '15px',
                  background: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff6a00'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Submit Button with Simple Hover */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px 24px',
                background: '#ff6a00',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop: '8px'
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            {message && <div style={{marginTop:12,color:'#374151'}}>{message}</div>}
          </form>
        </div>
      </div>
    </section>
  )
}   