"use client"
import React from 'react'
import ButtonWithPopup from './button-with-popup'

export default function ManipalFooter(){
  return (
    <footer style={{
      padding: '60px 1rem 20px 1rem',
      background: '#374151',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Left Section - About Manipal University Jaipur */}
          <div>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                fontSize: '24px',
                color: '#ff6a00',
                fontWeight: 'bold'
              }}>
                M
              </div>
              <div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff'
                }}>
                  Online MANIPAL
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  marginTop: '2px'
                }}>
                  INSPIRED BY LIFE
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '14px',
              color: '#d1d5db',
              lineHeight: 1.6,
              margin: '0'
            }}>
              Manipal University Jaipur (MUJ) was launched in 2011, started online MBA, MCA, and BBA classes in April 2021, and began offering online BCom and MCom degrees in December 2021.
            </p>
          </div>

          {/* Middle Section - More Courses */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ff6a00',
              margin: '0 0 20px 0'
            }}>
              More courses
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  BCA - Bachelor of Computer Application
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  BBA - Bachelor of Business Administration
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  B.COM - Bachelor of Commerce
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  MBA - Master of Business Administration
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  MCA - Master of Computer Application
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  M.COM - Master of Commerce
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  MA-JMC - Master of Arts In Journalism & Mass Communication
                </span>
              </li>
            </ul>
          </div>

          {/* Right Section - Accreditation & Approvals */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ff6a00',
              margin: '0 0 20px 0'
            }}>
              Accreditation & Approvals
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  University Grant Commission (UGC)
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  National Institutional Ranking Framework (NIRF)
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  All India Council for Technical Education (AICTE)
                </span>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#d1d5db' }}>
                  The World University Ranking 2022
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Contact Us */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ff6a00',
              margin: '0 0 16px 0'
            }}>
              Contact Us
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#d1d5db',
              lineHeight: 1.6,
              margin: '0'
            }}>
              Manipal University Jaipur, Dehmi Kalan, Off Jaipur-Ajmer Expressway, Jaipur, (Raj.) Rajasthan 303007.
            </p>
          </div>

          {/* Call to Action */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#ff6a00',
              margin: '0 0 16px 0'
            }}>
              Make A Step Towards A Success Journey
            </h3>
            <p style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#fff',
              margin: '0 0 8px 0'
            }}>
              Have Any Query?
            </p>
            <p style={{
              fontSize: '14px',
              color: '#d1d5db',
              margin: '0 0 20px 0'
            }}>
              Take academic Mentor Guidance
            </p>
            <ButtonWithPopup
              buttonStyle={{
                background: 'transparent',
                border: '2px solid #ff6a00',
                color: '#ff6a00',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (e.currentTarget) {
                  e.currentTarget.style.background = '#ff6a00'
                  e.currentTarget.style.color = '#fff'
                }
              }}
              onMouseLeave={(e) => {
                if (e.currentTarget) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#ff6a00'
                }
              }}
            >
              <span style={{ color: '#dc2626', fontSize: '16px' }}>📞</span>
              Request a Call Back
            </ButtonWithPopup>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <hr style={{
          border: 'none',
          borderTop: '1px solid #4b5563',
          margin: '0 0 20px 0'
        }} />

        {/* Copyright */}
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          color: '#9ca3af'
        }}>
          © Copyright Online Manipal University
        </div>
      </div>
    </footer>
  )
}
