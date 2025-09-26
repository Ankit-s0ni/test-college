import React from 'react'
import PageNavbar from '@/components/amity/page-navbar'
import HardcodedProgramsClient from '@/components/amity/hardcoded-programs'
import ApprovalsCarousel from '@/components/amity/approvals-carousel'
import PartnersCarousel from '@/components/amity/partners-carousel'
import { Button } from '@/components/ui/button'
import HeroStudentLeadForm from '@/components/amity/hero-student-lead-form'
import ApplyNowButton from '@/components/amity/apply-now-button'

export const metadata = {
  title: 'Amity Online — Replica',
  description: 'Replica landing page for Amity Online University',
}

const approvals = [
  '/assets/images/naac.jpg',
  '/assets/images/amity.png',
]

function Hero() {
  return (
    <section style={{position:'relative',minHeight:360,overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,backgroundImage:"url('/assets/images/amity.jpg')",backgroundSize:'cover',backgroundPosition:'center',filter:'brightness(0.45)'}} />
      <div className="relative z-10 mx-auto max-w-[1200px] flex flex-col md:flex-row gap-6 items-center px-4 py-12">
            <div className="flex-1 max-w-[680px] text-white">
          <h1 style={{fontSize:56,lineHeight:1.02,margin:0,color:'#FFD400',fontWeight:700}}>Online Degree from Amity<br/>Online University</h1>
          <p style={{color:'rgba(255,255,255,0.9)',marginTop:12}}>University Certified by NAAC with A+ Grade</p>
          <div style={{marginTop:20}}>
            {/* page-local Apply Now opens popup form */}
            <ApplyNowButton>
              <button style={{background:'#FFD400',border:'none',padding:'12px 18px',borderRadius:8,fontWeight:700}}>Apply Now</button>
            </ApplyNowButton>
          </div>
          <p style={{marginTop:18,color:'rgba(255,255,255,0.9)'}}>Admission Closing In 5 Days</p>
        </div>

        <div className="w-full md:w-[420px] md:ml-auto">
          <HeroStudentLeadForm />
        </div>
      </div>
    </section>
  )
}

// Approvals carousel replaced by component file

function Features(){
  // Use simple symbol icons (emoji) instead of image files
  const items = [
    {symbol: '📚', title:'Diverse learning mediums', desc:'E-books, printed & audio books, videos to cater your preferences & unique learning style'},
    {symbol: '🧑‍🏫', title:'Dedicated Academic Advisor', desc:'Dedicated experts and advisor to guide you at every step of your professional career'},
    {symbol: '🤖', title:'AI-Professor AMI', desc:'Powered by Chat-GPT 4 and open AI-driven technology for online learning'},
    {symbol: '💼', title:'Career Services', desc:'Be job-ready with resume building workshops, internships & industry mentorship'},
    {symbol: '📦', title:'Doorstep delivery of books', desc:'India’s only online university to provide physical books to read at your door step'},
    {symbol: '🏫', title:'Metaverse Campus', desc:'Discovering endless possibilities of Amity campus through our metaverse tour experience'},
    {symbol: '🎓', title:'Offline Experiences', desc:'Weave a close bond with faculty & peers, via on campus orientation programs and activities'},
    {symbol: '🚀', title:'Placement opportunities', desc:'Job interview prep, placement assistance & resume building for students to be job-ready'},
  ]

  return (
    <section style={{padding:'40px 1rem',background:'#f8fafc'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{background:'#fff',padding:28,borderRadius:8,boxShadow:'0 1px 2px rgba(2,6,23,0.04)'}}>
          <h3 style={{fontSize:28,fontWeight:700,margin:0}}>Why Choose Amity online?</h3>
          <hr style={{border:'none',borderTop:'1px solid #eef2f7',margin:'18px 0'}} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((it, idx) => (
              <div key={idx} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                <div style={{width:56,height:56,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff',borderRadius:8,border:'1px solid #eef2f7',fontSize:24}} aria-hidden>
                  <span>{it.symbol}</span>
                </div>
                <div>
                  <h4 style={{margin:'0 0 8px 0',fontSize:20}}>{it.title}</h4>
                  <p style={{margin:0,color:'#6b7280'}}>{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ProgramsSection (client) will fetch categories + programs same as home page

function Partners(){
  return (
    <section style={{padding:'2rem 1rem',background:'#f8fafc'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <h3>Top hiring partners</h3>
  <div className="flex flex-wrap gap-3 mt-3">
          {[
            'adobe.png','google.png','hdfc.png','IBM.png','metlife.png','microsoft.png','nokia.png','samsung.png','sbilife.png','spicejet.png','tatapower.jpeg','the times of india.png'
          ].map((f,i) => (
            <div key={i} style={{width:140,height:72,background:'#fff',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',padding:8,border:'1px solid #eef2f7'}}>
              <img src={`/assets/images/hiring partners/${f}`} alt={`partner-${i}`} style={{maxWidth:'100%',maxHeight:56,objectFit:'contain'}} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps(){
  const steps = ['Fill the registration form','Fill details & pay fees','Upload documents','Submit application']
  return (
    <section style={{padding:'2rem 1rem'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <h3>Admission Process</h3>
        <div style={{display:'flex',gap:12,alignItems:'center',marginTop:18}}>
          {steps.map((s,i) => (
            <div key={i} style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:999,background:i===0? '#0b4ea2' : '#fff',color:i===0? '#fff' : '#0b4ea2',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid #0b4ea2',fontWeight:700}}>{i+1}</div>
              <div style={{minWidth:180}}>
                <div style={{fontWeight:700}}>{s}</div>
              </div>
              {i < steps.length - 1 && <div style={{width:60,height:2,background:'#e6eef6'}} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Using client component for hardcoded programs with working filters

export default function Page(){
  return (
    <main>
  <PageNavbar />
      <Hero />
  <ApprovalsCarousel />
  <Features />
  <HardcodedProgramsClient />

      {/* Degree showcase section */}
      <section style={{padding:'48px 1rem',background:'#07345a',color:'#fff'}}>
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-8 items-center px-4">
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img src="/assets/images/amity_degree-online.png" alt="degree" className="max-w-full rounded-md shadow-[0_8px_30px_rgba(2,6,23,0.3)]" />
          </div>
          <div className="flex-1">
            <h2 style={{fontSize:32,margin:0,color:'#0b4ea2'}}>Online Degree from Amity Online University</h2>
            <p style={{marginTop:12,color:'rgba(255,255,255,0.9)'}}>Amity Online provides amity plus services that has the benefits of e-lectures, counselling from academic advisors, career assistance, etc.</p>

            <h4 style={{marginTop:18}}>Benefits of Amity Online</h4>
            <div className="grid grid-cols-1 gap-3 mt-3">
              <div className="pl-3 border-l-4 border-white/20">Daily LIVE Classes by Faculty of International Repute</div>
              <div className="pl-3 border-l-4 border-white/20">Career Assistance & Exclusive Virtual Job Fairs</div>
              <div className="pl-3 border-l-4 border-white/20">International Accredited Days with Ivy League Universities</div>
              <div className="pl-3 border-l-4 border-white/20">Hands-on & Immersive Learning through world-Class LMS</div>
            </div>
          </div>
        </div>
      </section>
      <Steps />
      <PartnersCarousel />

      {/* Call Now CTA */}
      <section style={{padding:'40px 1rem'}}>
        <div className="max-w-[1100px] mx-auto overflow-hidden rounded-lg flex flex-col md:flex-row items-center">
          <div className="w-full md:flex-1 bg-[#07345a] text-white p-6 md:p-8">
            <div style={{fontSize:14,opacity:0.9}}>Connect for any queries</div>
            <h3 style={{marginTop:8}}>Amity Online University</h3>
            <div style={{marginTop:14}}>
              <ApplyNowButton>
                <button style={{background:'#FFD400',border:'none',padding:'10px 16px',borderRadius:6,fontWeight:700}}>📞 Call Now</button>
              </ApplyNowButton>
            </div>
          </div>
          <div className="w-full md:flex-1">
            <img src="/assets/images/hero-img.png" alt="students" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
      <footer style={{padding:'2rem 1rem',background:'#0f172a',color:'#fff'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <h4 style={{margin:0,marginBottom:12}}>Top Query</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
            {[
              'amity university distance learning mca fees structure',
              'amity online mca fees',
              'amity university bba online course',
              'amity university distance mba',
              'amity university mba distance fees',
              'amity online bba',
              'amity university distance',
              'mca amity university distance learning',
              'amity distance mca',
              'amity mca distance',
              'amity university online bba',
              'online amity',
              'amity distance learning mca',
              'amity distance mca',
              'amity mba correspondence fees',
              'mba finance from amity distance learning',
              'distance learning bba from amity university',
              'amity university distance learning bba',
              'amity online university',
              'amity university distance education',
              'amity university distance mca',
              'amity university online mca',
              'amity mba online fees',
              'amity university online mba',
              'amity university mba online fees',
              'fees for online mba in amity university',
              'amity university distance mba program',
              'amity online degree',
              'mca from amity university distance learning',
              'distance mca from amity university',
              'online mba amity fees',
              'mba distance from amity university',
              'amity university online mba fees',
              'amity distance education',
              'amity university online mba courses',
              'amity university distance learning',
              'amity distance bba fees',
              'amity distance learning courses',
              'amity mca online',
              'amity online mba fees',
              'mba amity online',
              'amity university online bba fees',
              'amity university mba online',
              'amity university mba distance learning',
              'amity apply online',
              'amity open learning',
              'amity mca distance',
              'amity distance learning mba fees structure',
              'amity university distance mba fees',
              'distance mba fees in amity university',
              'amity university mba fees distance',
              'amity university online courses fees',
              'online mca from amity university',
              'amity distance mca fees',
              'amity university distance education bba',
              'amity university online degree',
              'amity distance mba',
              'distance mba amity fees',
              'mba distance amity university',
              'amity university distance education fee structure',
              'amity university distance education courses list',
              'amity online mca',
              'amity distance mca fees',
              'amity correspondence mba',
              'amity distance learning mba fees',
              'amity university bba distance learning',
              'amity university mba correspondence fees',
              'amity university mba distance learning fees',
              'distance learning mba in amity university',
              'amity distance',
              'amity mba distance learning',
              'distance mba from amity university',
              'amity distance learning bba fees',
              'amity bba distance learning',
              'amity university open mba fees',
              'amity university distance education mba fees',
              'amity university for mbadistance learning',
              'amity mba online courses',
              'amity distance learning mca',
              'amity online courses',
              'amity distance education mba',
              'amity distance mba fees',
              'amity open mba',
              'amity university distance learning mba fees',
              'distance learning mca from amity university',
              'amity distance bba',
              'amity online mba courses',
              'amity online mba',
              'amity mba fees distance',
              'amity university online mba program',
              'mba online amity university',
              'online amity university',
              'amity university online courses',
              'amity online bba course',
              'amity university distance learning mba courses',
              'online mba courses amity university',
              'amity online programs',
              'amity distance learnin',
              'amity online mba degree',
              'mba amity university online',
              'correspondence mba from amity university',
              'amity online bba fees',
              'amity open mba fees',
              'distance mba admission in amity university'
            ].map((t, idx) => (
              <ApplyNowButton key={idx}>
                <button aria-label={`Top query ${idx+1}`} className="block text-[#cbd5e1] text-sm text-left w-full text-decoration-none px-0 py-0">{t}</button>
              </ApplyNowButton>
            ))}
          </div>

          <div style={{fontSize:13,color:'#9ca3af',marginBottom:8}}>
            I authorize a representative to contact me via phone and/or email. This will override registry on DND/NDNC.
          </div>

          <div style={{fontSize:13,color:'#9ca3af'}}>Copyright © 2025 | Amity University</div>
        </div>
      </footer>
    </main>
  )
}
