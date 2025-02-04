import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Wuscacomponentskeleton = () => {
  return (
    <section className='wusca-container bg-neutral-50'>
      <div className="max-w-container mx-auto">
        {/* container */}
        <div className="wusca-card-container flex flex-col-reverse md:flex-row-reverse justify-between  px-[16px] py-[40px] md:px-[20px] md:pt-[0] md:pb-[64px] xl:p-[0] gap-[24px] md:gap-[20px] xl:gap-x-[20px] xl:gap-y-[24px]">
          <div className="wusca-content flex flex-col flex-1 justify-center gap-[16px]">
              <div className='flex flex-col gap-[8px]'>
                <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                  <div className="font-normal">
                    <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                    <div className="skeleton skeleton-text skeleton-text-animated descrip"></div>
                  </div>
              </div>
              <div className="skeleton skeleton_btn skeleton-text-animated !w-[120px]"></div>           
            </div>
              <div className="flex justify-center px-[20px] md:px-[16px] md:py-[36px] xl:px-[0]">
                <div className='w-[300px]'>
                  <svg width="100%" height="408" viewBox="0 0 417 408" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M414.329 0L415.713 209.739C416.424 317.432 329.698 405.311 222.004 406.021L2.67098 407.469L1.2868 197.73C0.576077 90.037 87.3025 2.15823 194.996 1.4475L414.329 0Z" fill="#E6E6E6"/>
                  </svg>
                </div>
            </div>
          </div>
          {/* container */}
        </div>
    </section>
  )
}

export default Wuscacomponentskeleton