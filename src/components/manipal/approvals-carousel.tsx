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

        {/* Approval Logos (responsive) */}
        <div className="approvals-row" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          {approvals.map((approval, index) => (
            <div key={index} className="approval-item" aria-hidden={false}>
              <div className="approval-outer" />
              <div className="approval-inner">
                <img src={approval.src} alt={approval.alt} className="approval-img" />
              </div>
            </div>
          ))}
        </div>

        {/* Inline responsive styles to keep this component self-contained */}
        <style>{`
          .approvals-row {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
          }

          .approval-item {
            position: relative;
            width: 140px;
            height: 140px;
            flex: 0 0 140px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .approval-outer {
            position: absolute;
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 4px solid #ff6a00;
            background: #fff;
            box-sizing: border-box;
          }

          .approval-inner {
            position: absolute;
            width: 128px;
            height: 128px;
            border-radius: 50%;
            border: 3px solid #ff6a00;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            box-sizing: border-box;
          }

          .approval-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            display: block;
          }

          /* Small screens: make badges smaller and wrap into rows */
          @media (max-width: 768px) {
            .approval-item {
              width: 96px;
              height: 96px;
              flex: 0 0 96px;
            }
            .approval-outer {
              width: 96px;
              height: 96px;
              border-width: 3px;
            }
            .approval-inner {
              width: 84px;
              height: 84px;
              border-width: 2px;
              padding: 8px;
            }
            h2 { font-size: 20px; }
          }

          @media (max-width: 420px) {
            .approval-item { width: 72px; height: 72px; flex: 0 0 72px; }
            .approval-outer { width: 72px; height: 72px; border-width: 2px; }
            .approval-inner { width: 64px; height: 64px; border-width: 1.5px; padding: 6px; }
            .approvals-row { gap: 12px; }
            h2 { font-size: 18px; }
          }
        `}</style>
      </div>
    </section>
  )
}
