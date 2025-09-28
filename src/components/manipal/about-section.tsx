import React from 'react'

export default function AboutSection() {
  return (
    <section style={{ 
      padding: '80px 1rem', 
      background: '#fff' 
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Header */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: 800,
          color: '#111827',
          margin: '0 0 24px 0',
          lineHeight: 1.2
        }}>
          <span style={{ color: '#ff6a00' }}>About-</span> Why Join Manipal University
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '16px',
          color: '#000000',
          lineHeight: 1.7,
          margin: '0 0 60px 0',
          maxWidth: '1000px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 10px'
        }}>
          Manipal University Jaipur (MUJ) was launched in 2011 on an invitation from the Government of Rajasthan. The University has redefined academic excellence in the region, with Manipal's way of learning; one that inspires all students to learn and innovate through practical, hands-on experience. Manipal University Jaipur offers career-oriented courses across different streams. Access UGC-entitled degrees from world-class universities that are NAAC accredited. Pursue online degrees that are at par with conventional on-campus degrees and accepted by governments, corporate organizations, and higher education institutions. In Manipal University online mba will prepare you to become an effective leader in a modern world that keeps changing.
        </p>

        {/* Statistics Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginTop: '60px'
        }}>
          {/* Students */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 20px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#ff6a00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '24px',
              color: '#fff'
            }}>
              <i className="fas fa-user-graduate"></i>
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '8px'
            }}>
              30000+
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Students
            </div>
          </div>

          {/* Alumni */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 20px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#ff6a00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '24px',
              color: '#fff'
            }}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '8px'
            }}>
              50k+
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Alumni
            </div>
          </div>

          {/* Campus Events */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 20px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#ff6a00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '24px',
              color: '#fff'
            }}>
              <i className="fas fa-building"></i>
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '8px'
            }}>
              600+
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Campus Events
            </div>
          </div>

          {/* High Profile Visitor */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px 20px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#ff6a00',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '24px',
              color: '#fff'
            }}>
              <i className="fas fa-chart-line"></i>
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#111827',
              marginBottom: '8px'
            }}>
              600+
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              High Profile Visitor
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 