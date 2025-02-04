import React from 'react'

const Faqskeleton = () => {
  return (
    <div className="faq-container bg-white">
        <div className="max-w-container mx-auto">
            <div className="faq-card-container flex flex-col gap-[32px] px-[16px] py-[40px] md:py-[64px] lg:px-[20px] xl:px-[0]">
                <div className="faq-header flex flex-col gap-[4px]">                
                    <div className="skeleton skeleton-text-animated large_heading !w-[20%]"></div>
                    <div className="skeleton skeleton-text-animated descrip !w-[60%]"></div>
                </div>
                <div className="accordion flex flex-col rounded-[6px] border border-grey-200 px-[16px]">
                    <div className="accordion-item flex flex-col gap-[8px] py-[16px] border-b border-b-grey-200 last:border-b-0 cursor-pointer">
                                <div className='accordion-header flex items-center justify-between gap-[48px] para font-semibold text-grey-600'>
                                <div className="skeleton skeleton-text-animated page_heading !w-[70%]"></div>
                                <span>
                                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1L6 6L1 1" stroke="#e6e6e6" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>                           
                                </span>
                                </div>
                                <div className={`accordion-body`}>
                                    <div className="mt-[16px]">
                                        <div className="skeleton skeleton-text-animated descrip !w-[100%]"></div>
                                        <div className="skeleton skeleton-text-animated descrip !w-[100%]"></div>
                                        <div className="skeleton skeleton-text-animated descrip !w-[40%]"></div>
                                    </div>                              
                                </div>                       
                    </div>
                    <div className="accordion-item flex flex-col gap-[8px] py-[16px] border-b border-b-grey-200 last:border-b-0 cursor-pointer">
                                <div className='accordion-header flex items-center justify-between gap-[48px] para font-semibold text-grey-600'>
                                <div className="skeleton skeleton-text-animated page_heading !w-[70%]"></div>
                                <span>
                                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1L6 6L1 1" stroke="#e6e6e6" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>                           
                                </span>
                                </div>
                                <div className={`accordion-body`}>
                                    <div className="mt-[16px]">
                                        <div className="skeleton skeleton-text-animated descrip !w-[100%]"></div>
                                        <div className="skeleton skeleton-text-animated descrip !w-[100%]"></div>
                                        <div className="skeleton skeleton-text-animated descrip !w-[40%]"></div>
                                    </div>                              
                                </div>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Faqskeleton