import React from 'react'
import ButtonWithPopup from './button-with-popup'

export default function CertificateSection() {
  return (
    <section style={{ 
      padding: '100px 1rem', 
      background: '#fff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern - D-shaped/Jalebi pattern */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: `
          radial-gradient(circle at 30% 30%, rgba(255, 106, 0, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(255, 106, 0, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 50% 20%, rgba(255, 106, 0, 0.06) 0%, transparent 40%),
          radial-gradient(circle at 20% 80%, rgba(255, 106, 0, 0.04) 0%, transparent 45%)
        `,
        borderRadius: '50%',
        zIndex: 0,
        opacity: 0.7
      }} />
      
      <div style={{ 
        maxWidth: 1400, 
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '80px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left Side - Certificate Image */}
        <div style={{ 
          flex: '1',
          minWidth: '400px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '550px',
            width: '100%'
          }}>
            <img 
              src="/assets/images/manipal online certificate.webp" 
              alt="Manipal University Certificate" 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Right Side - Promotional Content */}
        <div style={{ 
          flex: '1',
          minWidth: '500px',
          padding: '60px 0'
        }}>
          <h2 style={{
            fontSize: '44px',
            fontWeight: 800,
            color: '#111827',
            margin: '0 0 24px 0',
            lineHeight: 1.1
          }}>
            Earn Your{' '}
            <span style={{ color: '#ff6a00' }}>Degree</span>{' '}
            Which Enhance Your career
          </h2>

          <p style={{
            fontSize: '17px',
            color: '#6b7280',
            lineHeight: 1.7,
            margin: '0 0 40px 0',
            maxWidth: '600px'
          }}>
            If you're looking for an online degree without leaving your home, then Manipal university has what you need! The university offers a variety of degrees and made it easy to access them from anywhere and anytime.
          </p>

          {/* Features List with FontAwesome Icons */}
          <div style={{ marginBottom: '45px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              fontSize: '16px',
              color: '#374151',
              fontWeight: 500
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '18px',
                color: '#ff6a00',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                <i className="fas fa-star"></i>
              </div>
              <span>Degree from Top Ranked University</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              fontSize: '16px',
              color: '#374151',
              fontWeight: 500
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '18px',
                color: '#ff6a00',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                <i className="fas fa-university"></i>
              </div>
              <span>No Difference From Campus Programme Degree</span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px',
              color: '#374151',
              fontWeight: 500
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                background: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                fontSize: '18px',
                color: '#ff6a00',
                fontWeight: 'bold',
                flexShrink: 0
              }}>
                <i className="fas fa-globe"></i>
              </div>
              <span>Universally Accepted</span>
            </div>
          </div>

          {/* Apply Now Button with Popup */}
          <ButtonWithPopup
            buttonStyle={{
              background: 'transparent',
              border: '2px solid #ff6a00',
              color: '#ff6a00',
              padding: '18px 36px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '180px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
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
    </section>
  )
} 