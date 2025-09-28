"use client"
import React, { useState } from 'react'
import ButtonWithPopup from './button-with-popup'

// Program data based on reference images
const UG_PROGRAMS = [
  {
    id: 'bba',
    abbreviation: 'BBA',
    title: 'Bachelor of Business Administration',
    icon: '💼', // briefcase icon
    duration: '3 Year',
    eligibility: '12th Passed',
    fees: '22,500/- Semester'
  },
  {
    id: 'bca',
    abbreviation: 'BCA',
    title: 'Bachelor of Computer Applications',
    icon: '🖥️', // desktop computer icon
    duration: '3 Year',
    eligibility: '12th Passed',
    fees: '22,500/- Semester'
  },
  {
    id: 'bcom',
    abbreviation: 'B.COM',
    title: 'Bachelor of Commerce',
    icon: '🧮', // calculator icon
    duration: '3 Year',
    eligibility: '12th Passed',
    fees: '16,500/- Semester'
  }
]

const PG_PROGRAMS = [
  {
    id: 'mba',
    abbreviation: 'MBA',
    title: 'Master of Business Administration',
    icon: '💼', // briefcase icon
    duration: '2 Year',
    eligibility: 'Graduation',
    fees: '43,750/- Semester'
  },
  {
    id: 'mca',
    abbreviation: 'MCA',
    title: 'Master of Computer Applications',
    icon: '🖥️', // desktop computer icon
    duration: '2 Year',
    eligibility: 'Graduation',
    fees: '43,750/- Semester'
  },
  {
    id: 'mcom',
    abbreviation: 'M.COM',
    title: 'Master of Commerce',
    icon: '🧮', // calculator icon
    duration: '2 Year',
    eligibility: 'Graduation',
    fees: '16,500/- Semester'
  },
  {
    id: 'ma-jmc',
    abbreviation: 'MA-JMC',
    title: 'Master of Arts In Journalism & Mass Communication',
    icon: '📰', // newspaper icon
    duration: '2 Year',
    eligibility: 'Graduation',
    fees: '16,500/- Semester'
  }
]

export default function HardcodedProgramsClient() {
  const [activeTab, setActiveTab] = useState<'ug' | 'pg'>('ug')

  return (
    <section style={{ 
      padding: '80px 1rem', 
      background: '#fff' 
    }}>
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Header */}
        <h2 style={{
          fontSize: '36px',
          fontWeight: 800,
          color: '#111827',
          margin: '0 0 16px 0',
          lineHeight: 1.2
        }}>
          Online Programme Offered
        </h2>
        
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          margin: '0 0 40px 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Get high-stature degree on completion of your programme.
        </p>

        {/* Tab Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => setActiveTab('ug')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'ug' ? '#ff6a00' : 'transparent',
              color: activeTab === 'ug' ? '#fff' : '#ff6a00',
              border: '2px solid #ff6a00',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Under-Graduate Course
          </button>
          <button
            onClick={() => setActiveTab('pg')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'pg' ? '#ff6a00' : 'transparent',
              color: activeTab === 'pg' ? '#fff' : '#ff6a00',
              border: '2px solid #ff6a00',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Post-Graduate Course
          </button>
        </div>

        {/* Programs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {(activeTab === 'ug' ? UG_PROGRAMS : PG_PROGRAMS).map((program) => (
            <div key={program.id} style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              {/* Program Icon */}
              <div style={{
                fontSize: '48px',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {program.icon}
              </div>

              {/* Program Details */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: '0 0 8px 0'
                }}>
                  {program.abbreviation}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0 0 16px 0',
                  lineHeight: 1.4
                }}>
                  {program.title}
                </p>
                
                {/* Program Info */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>Duration:</span>
                    <span>{program.duration}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>Eligibility:</span>
                    <span>{program.eligibility}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>Fees:</span>
                    <span style={{ color: '#ff6a00', fontWeight: 600 }}>₹{program.fees}</span>
                  </div>
                </div>
              </div>

              {/* Apply Now Button with Popup */}
              <div style={{ textAlign: 'center' }}>
                <ButtonWithPopup
                  buttonStyle={{
                    background: 'transparent',
                    border: '2px solid #ff6a00',
                    color: '#ff6a00',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (e.currentTarget) {
                      e.currentTarget.style.background = '#ff6a00'
                      e.currentTarget.style.color = '#fff'
                      e.currentTarget.style.borderColor = '#ff6a00'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.currentTarget) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#ff6a00'
                      e.currentTarget.style.borderColor = '#ff6a00'
                    }
                  }}
                >
                  Apply Now
                </ButtonWithPopup>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
