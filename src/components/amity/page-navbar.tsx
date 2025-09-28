"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import ApplyNowButton from './apply-now-button';
import AmityModalHost from './amity-modal-host';

export default function PageNavbar() {

  // Navbar height used for spacer
  const navHeight = 72;

  return (
    <>
      <header style={{position:'fixed',top:0,left:0,right:0,background:'#fff',borderBottom:'1px solid #eef2f7',zIndex:60,height:navHeight}} className="w-full">
        <div style={{maxWidth:1200,height:'100%',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px'}} className="px-4">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            {/* Show Manipal logo on manipal page, otherwise Amity logo */}
            <img src={
              (usePathname() || '').startsWith('/manipalonline') ? '/assets/images/manipal-logo.jpg' : '/assets/images/amity online logo.png'
            } alt="Site Logo" style={{height:40}} className="h-10 md:h-12" />
          </div>

          <div>
            <ApplyNowButton>
              <button style={{background:'#FFD400',border:'none',padding:'8px 12px',borderRadius:6,fontWeight:700,cursor:'pointer'}} className="text-sm md:text-base">Apply Now</button>
            </ApplyNowButton>
          </div>
        </div>

        {/* Render modal when open. AutoPopupModal handles its own close and session logic; pass delaySeconds=0 so it opens immediately when mounted. */}
  {/* Modal rendered by ApplyNowButton when clicked */}
      </header>

      {/* Spacer to prevent content from sitting under fixed navbar */}
      <div style={{height: navHeight}} aria-hidden />
  {/* Global modal host for this page only */}
  <AmityModalHost />
    </>
  );
}
