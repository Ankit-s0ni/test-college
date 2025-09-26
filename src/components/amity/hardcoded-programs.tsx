"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ApplyNowButton from './apply-now-button'

const HARDCODED_PROGRAMS = [
  { id: 1, category: 'pg', popular: true, badge: '24 Specialization', tag: 'Online MBA', title: 'Master of Business Administration', eligibility: 'Bachelors', duration: '2 Year', fees: '49,750/Semester', image: '/assets/images/programs/images.jpeg' },
  { id: 2, category: 'pg', popular: true, badge: '3 Specialization', tag: 'Online M.Com', title: 'Master of Commerce', eligibility: 'Bachelors', duration: '2 Year', fees: '30,000/Semester', image: '/assets/images/programs/images (1).jpeg' },
  { id: 3, category: 'pg', popular: true, badge: '3 Specialization', tag: 'Online MCA', title: 'Master of Computer Applications', eligibility: 'Bachelors', duration: '2 Year', fees: '42,500/Semester', image: '/assets/images/programs/images (2).jpeg' },
  { id: 4, category: 'pg', popular: false, badge: '', tag: 'Online M.Sc', title: 'Master of Science', eligibility: 'Bachelors', duration: '2 Year', fees: '62,500/Semester', image: '/assets/images/programs/images (3).jpeg' },
  { id: 5, category: 'pg', popular: false, badge: '', tag: 'Online MA(JMC)', title: 'Master of Arts in Journalism and Mass Communication', eligibility: 'Bachelors', duration: '2 Year', fees: '42,500/Semester', image: '/assets/images/programs/images (4).jpeg' },
  { id: 6, category: 'ug', popular: false, badge: '', tag: 'Online BBA', title: 'Bachelor of Business Administration', eligibility: '12th pass out', duration: '3 Year', fees: '27,500/Semester', image: '/assets/images/programs/download (3).jpeg' },
  { id: 7, category: 'ug', popular: false, badge: '2 Specialization', tag: 'Online BCA', title: 'Bachelor of Computer Applications', eligibility: '12th pass out', duration: '3 Year', fees: '25,000/Semester', image: '/assets/images/programs/download (4).jpeg' },
  { id: 8, category: 'ug', popular: false, badge: '6 Specialization', tag: 'Online BA', title: 'Bachelor of Arts', eligibility: '12th pass out', duration: '3 Year', fees: '16,500/Semester', image: '/assets/images/programs/images.jpeg' },
]

export default function HardcodedProgramsClient(){
  const [filter, setFilter] = useState<'all'|'popular'|'ug'|'pg'>('all')

  const visible = HARDCODED_PROGRAMS.filter(p => {
    if (filter === 'all') return true
    if (filter === 'popular') return !!p.popular
    return p.category === filter
  })

  return (
    <section style={{padding:'32px 1rem'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:12}}>
          <div style={{display:'inline-flex',gap:8}}>
            <Button onClick={() => setFilter('all')} variant={filter==='all' ? 'default' : 'outline'} size='sm'>All Courses</Button>
            <Button onClick={() => setFilter('popular')} variant={filter==='popular' ? 'default' : 'outline'} size='sm'>Popular Courses</Button>
            <Button onClick={() => setFilter('ug')} variant={filter==='ug' ? 'default' : 'outline'} size='sm'>UG Courses</Button>
            <Button onClick={() => setFilter('pg')} variant={filter==='pg' ? 'default' : 'outline'} size='sm'>PG Courses</Button>
          </div>
        </div>

        <h2 style={{textAlign:'center',fontSize:28,fontWeight:700,marginBottom:18}}>
          {filter === 'ug' ? "Online Bachelor's Program" : filter === 'pg' ? "Online Master's Program" : 'Online Master’s & Bachelor’s Program'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map(p => (
            <div key={p.id} className="w-full bg-white p-3 rounded-md shadow-sm border border-[#e6edf6]">
              <div style={{height:110,background:'#f3f4f6',borderRadius:6,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {p.badge && <div style={{position:'absolute',left:8,top:8,background:'#0b4ea2',color:'#fff',padding:'4px 8px',borderRadius:4,fontSize:12}}>{p.badge}</div>}
                {p.image && <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}} />}
              </div>
              <div style={{marginTop:8}}>
                <div style={{display:'inline-block',background:'#dff3ff',padding:'6px 10px',borderRadius:6,color:'#0b4ea2',fontWeight:600,fontSize:13}}>{p.tag}</div>
                <h4 style={{margin:'10px 0 6px 0'}}>{p.title}</h4>
                <hr style={{border:'none',borderTop:'1px solid #eef2f7',margin:'8px 0'}} />
                <ul style={{listStyle:'none',padding:0,margin:0,color:'#475569',fontSize:13}}>
                  <li>Eligibility : {p.eligibility}</li>
                  <li style={{marginTop:4}}>Duration : {p.duration}</li>
                  <li style={{marginTop:4}}>Fees : {p.fees}</li>
                </ul>
                <div style={{marginTop:12}}>
                  <ApplyNowButton>
                    <Button size='sm' className='w-full'>Apply Now</Button>
                  </ApplyNowButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:18}}>
          <button style={{background:'#FFD400',padding:'10px 18px',borderRadius:6,border:'none',fontWeight:700}}>View More</button>
        </div>
      </div>
    </section>
  )
}
