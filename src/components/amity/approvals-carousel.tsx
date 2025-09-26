"use client"
import React, { useState } from 'react'

const ITEMS = [
  { id: 1, title: 'All India Council for Technical Education (AICTE)', logo: '/assets/images/approvals/acu.png' },
  { id: 2, title: 'University Grants Commission (UGC)', logo: '/assets/images/approvals/ugc.png' },
  { id: 3, title: 'World Education Services (WES)', logo: '/assets/images/approvals/wes.png' },
  { id: 4, title: 'The Association of Commonwealth Universities (ACU)', logo: '/assets/images/approvals/acu.png' },
  { id: 5, title: 'International Credential Assessment Service of Canada', logo: '/assets/images/approvals/icas.png' },
  { id: 6, title: 'International Qualifications Assessment Service (IQAS)', logo: '/assets/images/approvals/iqas.png' },
  { id: 7, title: 'International Credential Evaluation Service (ICES)', logo: '/assets/images/approvals/ices.jpeg' },
  { id: 8, title: 'National Assessment and Accreditation Council (NAAC) A+', logo: '/assets/images/approvals/naac.jpeg' },
]

export default function ApprovalsCarousel(){
  // Duplicate items so animation can loop seamlessly
  const loopItems = ITEMS.concat(ITEMS)

  return (
    <section style={{padding:'48px 1rem'}}>
      <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
        <h2 style={{margin:0,fontSize:28,fontWeight:700}}>Amity Online University</h2>
        <p style={{marginTop:6,color:'#374151'}}>How about getting a degree from the top ranked university?</p>

        <div style={{position:'relative',marginTop:28,overflow:'hidden'}}>
          <div
            className="auto-carousel"
            style={{display:'flex',gap:24,alignItems:'center',width:'max-content',paddingBottom:12,animation: 'scroll-left 20s linear infinite'}}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
          >
            {loopItems.map((it, idx) => (
              <div key={idx} style={{minWidth:240,background:'#fff',padding:18,borderRadius:12,boxShadow:'0 1px 6px rgba(2,6,23,0.06)',display:'flex',alignItems:'center',gap:18}}>
                <div style={{width:70,height:70,flex:'0 0 70px',borderRadius:999,boxShadow:'0 6px 18px rgba(0,0,0,0.08)',display:'flex',alignItems:'center',justifyContent:'center',border:'4px solid #fff'}}>
                  <img src={it.logo} alt={it.title} style={{width:56,height:56,objectFit:'contain',borderRadius:999}} loading="lazy" />
                </div>
                <div style={{textAlign:'left'}}>
                  <div style={{fontSize:15,color:'#111827'}}>{it.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline keyframes style tag for cross-environment simplicity */}
          <style>{`
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50%)); }
            }
            .auto-carousel { will-change: transform; }
          `}</style>
        </div>
      </div>
    </section>
  )
}
