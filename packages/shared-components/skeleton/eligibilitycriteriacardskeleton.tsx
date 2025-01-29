import React from 'react'
import Image from 'next/image'
import Ctabutton from '../cards/interaction-button/ctabutton'

const Eligibilitycriteriacardskeleton = () => {
  return (
    <div className='card group flex flex-col bg-white border border-grey-100 rounded-[8px] shadow-custom-2 overflow-hidden p-[16px] gap-[16px]'> 
    <div className='card-body flex flex-col gap-[8px]'>
        <div className='card-header w-[48px]'>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 24C0 10.7452 10.7452 0 24 0H48V24C48 37.2548 37.2548 48 24 48H0V24Z" fill="#E6E6E6"/>
            <path d="M28.0855 28.0855C25.8291 30.3419 22.1709 30.3419 19.9145 28.0855M19.6667 21.1111H19.6811M28.3333 21.1111H28.3478M37 24C37 31.1797 31.1797 37 24 37C16.8203 37 11 31.1797 11 24C11 16.8203 16.8203 11 24 11C31.1797 11 37 16.8203 37 24Z" stroke="#E6E6E6" stroke-width="2.67" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div> 
        <div className='card-title'>
            <div className="skeleton skeleton-text-animated small_heading !w-[50%]"></div>
        </div>
        <p className='card-description'>
            <div className="skeleton skeleton-text-animated page-heading !w-full"></div>
            <div className="skeleton skeleton-text-animated descrip !w-[30%]"></div>
        </p>
    </div>
    <div className="skeleton skeleton_btn skeleton-text-animated !w-[120px]"></div>
  </div>
  )
}

export default Eligibilitycriteriacardskeleton