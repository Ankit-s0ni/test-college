"use client";

import React from 'react';
import ApplyNowButton from '@/components/amity/apply-now-button';
import AmityModalHost from '@/components/amity/amity-modal-host';

export default function ManipalPageNavbar(){
  const navHeight = 72;

  return (
    <>
      <header style={{position:'fixed',top:0,left:0,right:0,background:'#fff',borderBottom:'1px solid #eef2f7',zIndex:60,height:navHeight}} className="w-full">
        <div style={{maxWidth:1200,height:'100%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px'}} className="px-4">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <img src="/assets/images/online manipal logo.webp" alt="Online Manipal" style={{height:40}} className="h-10 md:h-12" />
          </div>

          <nav style={{display:'flex',alignItems:'center',gap:20}}>
            <a href="#" style={{color:'#111827'}}>Home</a>
            <a href="#" style={{color:'#111827'}}>About</a>
            <a href="#" style={{color:'#111827'}}>Approvals</a>
            <a href="#" style={{color:'#111827'}}>Courses</a>
          </nav>
        </div>

      </header>

      <div style={{height: navHeight}} aria-hidden />
      <AmityModalHost />
    </>
  )
}
