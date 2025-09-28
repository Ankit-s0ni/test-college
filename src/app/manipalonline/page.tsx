"use client"
import React from 'react'
import PageNavbar from '@/components/manipal/page-navbar'
import HardcodedProgramsClient from '@/components/manipal/hardcoded-programs'
import ApprovalsCarousel from '@/components/manipal/approvals-carousel'
import ManipalFooter from '@/components/manipal/footer'
import CertificateSection from '@/components/manipal/certificate-section'
import AboutSection from '@/components/manipal/about-section'
import AdvantagesSection from '@/components/manipal/advantages-section'
import FormSection from '@/components/manipal/form-section'
import ButtonWithPopup from '@/components/manipal/button-with-popup'

function Hero() {
  return (
    <section style={{position:'relative',minHeight:520,overflow:'hidden'}}>
  {/* Background image with teal/blue left tint */}
  <div style={{position:'absolute',inset:0,backgroundImage:"url('/assets/images/manipal online.webp')",backgroundSize:'cover',backgroundPosition:'center'}} />
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:220,background:'linear-gradient(90deg, rgba(6,182,212,0.18), rgba(255,255,255,0))'}} aria-hidden />

  <div className="relative z-10 mx-auto max-w-[1200px] flex flex-col md:flex-row gap-6 items-start px-4 pt-4 pb-12">
        {/* Left content panel (semi-transparent white) */}
        <div style={{flex:1,maxWidth:760,background:'rgba(255,255,255,0.85)',padding:28,borderRadius:6,backdropFilter:'blur(2px)',marginTop:0}}>
          <div style={{maxWidth:620}}>
            <div style={{color:'#111827',fontSize:14}}>Welcome To Manipal University</div>
            <h1 style={{fontSize:56,lineHeight:1.02,margin:'8px 0 0 0',color:'#111827',fontWeight:800}}>Enhance Your Career</h1>
            <h2 style={{fontSize:48,margin:'6px 0 0 0',color:'#ff6a00',fontWeight:800}}>Pursue Online Degree Now</h2>

            <div style={{height:6,width:120,background:'#ff6a00',marginTop:12,borderRadius:2}} />

            <p style={{marginTop:16,color:'#374151',background:'rgba(0,0,0,0.06)',display:'inline-block',padding:'6px 8px'}}>Study at Manipal University Jaipur where Online Degree Courses gives you the flexibility to study at home, or anywhere anytime.</p>

            {/* Orange programs banner */}
            <div style={{marginTop:22,background:'#ff6a00',color:'#fff',padding:'26px 28px',display:'inline-block',fontSize:22,fontWeight:700}}>
              BBA | BCOM | BCA | MBA | MCA | MCOM | MA-JMC
            </div>
          </div>
        </div>

        {/* Right card: Free Counseling form */}
        <div style={{width:'100%',maxWidth:420,marginLeft:'auto',marginTop:0}}>
          <div style={{background:'#fff',padding:20,borderRadius:8,boxShadow:'0 8px 30px rgba(2,6,23,0.08)'}}>
            <div style={{textAlign:'center',fontSize:22,fontWeight:800,color:'#ff6a00',marginBottom:12}}>Free Counseling</div>
            <div style={{marginTop:8}}>
              <form style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  style={{
                    padding:'12px 16px',
                    border:'1px solid #d1d5db',
                    borderRadius:'6px',
                    fontSize:'14px',
                    outline:'none'
                  }}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  style={{
                    padding:'12px 16px',
                    border:'1px solid #d1d5db',
                    borderRadius:'6px',
                    fontSize:'14px',
                    outline:'none'
                  }}
                />
                <input 
                  type="tel" 
                  placeholder="Mobile Number" 
                  style={{
                    padding:'12px 16px',
                    border:'1px solid #d1d5db',
                    borderRadius:'6px',
                    fontSize:'14px',
                    outline:'none'
                  }}
                />
                <select 
                  style={{
                    padding:'12px 16px',
                    border:'1px solid #d1d5db',
                    borderRadius:'6px',
                    fontSize:'14px',
                    outline:'none',
                    background:'#fff'
                  }}
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
                <ButtonWithPopup
                  buttonStyle={{
                    background:'#ff6a00',
                    color:'#fff',
                    border:'none',
                    padding:'12px 16px',
                    borderRadius:'6px',
                    fontSize:'14px',
                    fontWeight:600,
                    cursor:'pointer',
                    marginTop:'8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (e.currentTarget) {
                      e.currentTarget.style.background = '#e55a00'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (e.currentTarget) {
                      e.currentTarget.style.background = '#ff6a00'
                    }
                  }}
                >
                  Get Free Counseling
                </ButtonWithPopup>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default function Page(){
  return (
    <main>
      <PageNavbar />
      <Hero />
      <HardcodedProgramsClient />
      <ApprovalsCarousel />
      <CertificateSection />
      <AboutSection />
      <AdvantagesSection />
      <FormSection />
      <ManipalFooter />
    </main>
  )
}
