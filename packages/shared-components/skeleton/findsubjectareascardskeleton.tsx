import React from 'react'

const Findsubjectareascardskeleton = () => {
  return (
    <div className='subjectarea-pod shadow-custom-3 rounded-[4px] overflow-hidden'>
    <div className='subjectarea-header'>
      <h3 className='bg-neutral-200 p-[16px]'><div className="skeleton skeleton-text skeleton-text-animated !w-[80%]"></div></h3>
    </div>
    <div className='subjectarea-body'>
      <div className='custom-vertical-scrollbar max-h-[282px] overflow-y-hidden mr-[8px]'>
        <ul className='flex flex-col gap-[4px] p-[16px]'>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[20%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[50%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[45%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[60%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[55%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[70%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[30%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[60%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[75%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[65%]"></div></li>
          <li><div className="skeleton skeleton-text skeleton-text-animated !w-[90%]"></div></li>

        </ul>
      </div>
    </div>
    <div className='subjectarea-footer shadow-custom-4'>
      <div className='flex items-center gap-[8px] p-[16px]'>
      <div className="skeleton skeleton-text skeleton-text-animated !w-[90%]"></div> 
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.4814 0.814819L14.6666 6M14.6666 6L9.4814 11.1852M14.6666 6L1.33325 6" stroke="#e6e6e6" strokeWidth="1.48148" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      </div>
    </div>
  </div>
  )
}

export default Findsubjectareascardskeleton