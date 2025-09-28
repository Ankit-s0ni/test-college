import React from 'react'

export default function ApprovalsCarousel() {
  const approvals = [
    {
      src: '/assets/images/approvals/wes.png',
      alt: 'WES - World Education Services'
    },
    {
      src: '/assets/images/approvals/icas.png',
      alt: 'ICAS'
    },
    {
      src: '/assets/images/approvals/ices.jpeg',
      alt: 'ICES'
    },
    {
      src: '/assets/images/approvals/iqas.webp',
      alt: 'IQAS - Excellence in Quality'
    },
    {
      src: '/assets/images/approvals/naac.jpeg',
      alt: 'NAAC A+'
    },
    {
      src: '/assets/images/approvals/download (7).jpeg',
      alt: 'AICTE'
    },
    {
      src: '/assets/images/approvals/acu.png',
      alt: 'The Association of Commonwealth Universities'
    },
    {
      src: '/assets/images/approvals/ugc.png',
      alt: 'UGC'
    }
  ]

  return (
    <section style={{ 
      padding: '48px 1rem', 
      background: '#f8fafc' 
    }}>
      <div style={{ 
        maxWidth: '100%', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#111827',
          margin: '0 0 40px 0'
        }}>
          Approved & Recognized by
        </h2>

        {/* Approval Logos */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'nowrap',
          padding: '0 20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {approvals.map((approval, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1'
              }}
            >
              {/* Outer Circle */}
              <div style={{
                position: 'absolute',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: '4px solid #ff6a00',
                background: '#fff'
              }} />
              
              {/* Inner Circle */}
              <div style={{
                position: 'absolute',
                width: '128px',
                height: '128px',
                borderRadius: '50%',
                border: '3px solid #ff6a00',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}>
                <img
                  src={approval.src}
                  alt={approval.alt}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
