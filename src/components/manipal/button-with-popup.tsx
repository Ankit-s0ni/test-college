"use client"
import React, { useState } from 'react'
import PopupForm from './popup-form'

interface ButtonWithPopupProps {
  children: React.ReactNode
  buttonStyle?: React.CSSProperties
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function ButtonWithPopup({ 
  children, 
  buttonStyle, 
  onMouseEnter, 
  onMouseLeave 
}: ButtonWithPopupProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleButtonClick = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <>
      <button
        style={buttonStyle}
        onClick={handleButtonClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </button>
      
      <PopupForm
        triggerContent={null}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  )
} 