"use client"
import React from 'react'

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: 'fas fa-globe-americas',
      title: 'Empowered Education',
      description: 'University programs are designed by industry leaders with degrees that are recognized globally and nationally. And give access to the programs anytime and anywhere'
    },
    {
      icon: 'fas fa-laptop',
      title: 'Study At Your Place',
      description: 'Manipal\'s digital platform makes it easy for students to learn on the go. They can attend live lectures, listen to recordings, and even learn from their mobile devices.'
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Experienced Faculty',
      description: 'The University work with faculty who have PhD\'s and are at the forefront of their field. They will give you real-world, practical advice to boost your confidence and communication.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Digital learning Platform',
      description: 'With this college, students can get access to 1000+ hours of tutorials and can take remotely proctored exams, quizzes, and practice tests, for the opportunity to interact with peers.'
    },
    {
      icon: 'fas fa-headset',
      title: '24*7 Student Support',
      description: 'Manipal University provides 24*7 student support. And the staff is always available to help students with academic or personal issues.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Expert\'s FREE Guidance',
      description: 'Manipal University provides free guidance from experts to help students with their studies. It also has a strong research focus and many facilities for students.'
    }
  ]

  return (
    <section style={{ 
      padding: '80px 1rem', 
      background: '#fdf8f4' 
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
          margin: '0 0 16px 0',
          lineHeight: 1.2
        }}>
          The Online Manipal Advantages
        </h2>
        
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 60px 0',
          lineHeight: 1.5
        }}>
          Here's what you can expect from our programmes
        </p>

        {/* Advantages Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginTop: '40px'
        }}>
          {advantages.map((advantage, index) => (
            <div
              key={index}
              style={{
                padding: '40px 30px',
                background: 'transparent',
                borderRadius: '12px',
                border: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                background: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                fontSize: '28px',
                color: '#ff6a00',
                border: '2px solid #ff6a00'
              }}>
                <i className={advantage.icon}></i>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#111827',
                margin: '0 0 16px 0',
                lineHeight: 1.3
              }}>
                {advantage.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                lineHeight: 1.6,
                margin: '0'
              }}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 