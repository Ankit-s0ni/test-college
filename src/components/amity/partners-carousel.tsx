"use client"
import React from 'react'

const PARTNERS = [
  'adobe.png','google.png','hdfc.png','IBM.png','metlife.png','microsoft.png','nokia.png','samsung.png','sbilife.png','spicejet.png','tatapower.jpeg','the times of india.png'
]

export default function PartnersCarousel(){
  const items = PARTNERS.concat(PARTNERS)

  return (
    <section style={{padding:'24px 1rem',background:'#f8fafc'}}>
      <div style={{maxWidth:1100,margin:'0 auto',textAlign:'center'}}>
        <h2 style={{margin:0,fontSize:22,fontWeight:700}}>Our learners works at</h2>
        <div style={{color:'#475569',marginTop:6}}>Top hiring partners at Amity Online</div>
        <div style={{overflow:'hidden',marginTop:18}}>
          <div style={{display:'flex',gap:16,alignItems:'center',width:'max-content',animation:'partners-scroll 18s linear infinite'}}
               onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.animationPlayState='paused'}}
               onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.animationPlayState='running'}}>
            {items.map((f, i) => (
              <div key={i} style={{width:160,height:72,background:'#fff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',padding:12,border:'1px solid #eef2f7'}}>
                <img src={`/assets/images/hiring partners/${f}`} alt={`partner-${i}`} style={{maxWidth:'100%',maxHeight:56,objectFit:'contain'}} loading="lazy" />
              </div>
            ))}
          </div>
          <style>{`
            @keyframes partners-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
