import React from 'react'
import Image from 'next/image'

const Testimonialcardskeleton = () => {
  return (
    <div className='testimonials-container bg-white'> 
    <div className="max-w-container mx-auto"> 
        <div className='testimonials-card-container px-[16px] md:px-[20px] py-[34px] lg:py-[64px] lg:px-[0]'>
            <div className='testimonials-header mb-[26px] md:mb-[32px]'>
                <h2 className='font-bold'><div className="skeleton skeleton-text skeleton-text-animated large_heading !w-[20%]"></div></h2>
                <div className='font-normal small mt-[8px]'><div className="skeleton skeleton-text skeleton-text-animated page_heading !w-[40%]"></div></div>
            </div>
            <div className='testimonials-inner-wrap grid grid-cols-1 lg:grid-cols-2 gap-[16px]'>
                <div className='video-container min-h-[315px] flex justify-center items-center rounded-[8px] overflow-hidden relative'>
                    <div className="skeleton skeleton-text skeleton-text-animated skeleton-square-img !w-[100%] !min-h-[315px]"></div>
                </div>
                <div className='testimonial-card grid content-between p-[24px] rounded-[8px] gap-[16px] bg-grey-50'>
                    <div>
                        <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated descrip !w-[70%]"></div>
                    </div>
                    <div className='testimonial-footer'>
                    <div className="skeleton skeleton-text skeleton-text-animated page_heading !w-[30%]"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated descrip !w-[70%]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</div>
  )
}

export default Testimonialcardskeleton