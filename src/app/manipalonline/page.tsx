"use client"
import React, { useState } from 'react'
import { studentLeadsAPI } from '@/lib/api'
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [course, setCourse] = useState('')
  const [stateProvince, setStateProvince] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function submitLead(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!name || !email || !phone || !course || !stateProvince) {
      setMessage('Please fill all fields.')
      return
    }
    setLoading(true)
    try {
      const leadData = {
        name,
        email,
        phone,
        program: course,
        stateProvince,
        status: 'new',
        message: `Interested in ${course} program`,
        leadSource: 'manipal-online-hero',
        locale: 'en'
      }

      const res = await studentLeadsAPI.submit(leadData)
      if (!res.success) throw new Error(res.message || 'Submission failed')
      setMessage('Thank you! We will contact you soon.')
      setName('')
      setEmail('')
      setPhone('')
      setCourse('')
    } catch (err) {
      console.error(err)
      setMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
              <form onSubmit={submitLead} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
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
                <select
                  value={stateProvince}
                  onChange={(e) => setStateProvince(e.target.value)}
                  style={{
                    padding:'12px 16px',
                    border:'1px solid #d1d5db',
                    borderRadius:'6px',
                    fontSize:'14px',
                    outline:'none',
                    background:'#fff',
                    marginTop:8
                  }}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background:'#ff6a00',
                    color:'#fff',
                    border:'none',
                    padding:'12px 16px',
                    borderRadius:'6px',
                    fontSize:'14px',
                    fontWeight:600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    marginTop:'8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? 'Submitting...' : 'Get Free Counseling'}
                </button>

                {message && <div style={{fontSize:13,color:'#374151',paddingTop:6}}>{message}</div>}
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
      <div id="top" />
      <Hero />

      <section id="courses">
        <HardcodedProgramsClient />
      </section>

      <section id="approvals">
        <ApprovalsCarousel />
      </section>

      <section id="certificates">
        <CertificateSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="advantages">
        <AdvantagesSection />
      </section>

      <section id="contact">
        <FormSection />
      </section>
      <ManipalFooter />
    </main>
  )
}
