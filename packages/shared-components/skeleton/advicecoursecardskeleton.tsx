import React from 'react'

const AdviceCourseCardSkeleton = () => {
  return (
    <div className='advice-course-container'>
        <div className='advicecourse-inner-wrap'>
            <div className='card flex flex-col bg-white rounded-[8px] shadow-custom-2'>
                <div className='card-header'>
                    <div className='skeleton skeleton-thumb-img skeleton-text-animated min-h-[221px]'></div>
                </div>            
                <div className='card-body flex flex-col gap-[10px] p-[16px]'>
                    <h5 className='card-title'>
                        <div className="skeleton skeleton-text skeleton-text-animated large_heading"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated small_heading"></div>
                    </h5>
                    <div className='card-description'>
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>
                        <div className="skeleton skeleton-text skeleton-text-animated"></div>                     
                    </div>
                    <div className='card-date'>
                        <div className="skeleton skeleton-text skeleton-text-animated !w-[100px]"></div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdviceCourseCardSkeleton