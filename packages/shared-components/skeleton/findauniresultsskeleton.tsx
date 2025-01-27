import React from 'react'

const Findauniresultsskeleton = () => {
  return (
    <div className='uniresults-inner-wrap flex flex-col md:flex-row shadow-[0px_1px_2px_-1px_rgba(16,24,40,0.1),0px_1px_3px_0px_rgba(16,24,40,0.1)] rounded-[8px]'>
    <div className='uniresults-left w-full md:w-[200px] h-[130px] relative z-0  rounded-t-[8px] md:rounded-t-[0] md:!rounded-l-[8px] overflow-hidden'>
        <div className="skeleton skeleton-text skeleton-thumb-img skeleton-text-animated !h-[100%] !rounded-[0] !bg-neutral-50"></div>
      <div className='absolute z-0 top-[8px] left-[8px] rounded-[8px] overflow-hidden min-h-[64px]'>
        <div className="skeleton skeleton-text skeleton-square-img skeleton-text-animated !m-[0]"></div>
      </div>
    </div>
    <div className='uniresults-right flex flex-col justify-between p-[16px] w-full md:w-[calc(100%_-_200px)] gap-[16px] md:flex-row'>
      <div className='uniresults-content-left flex flex-col gap-[3px] w-full md:w-[calc(100%_-_334px)]'>
        <div className="skeleton skeleton-text skeleton-text-animated !w-[100%]"></div>
        <div className='rating-pod flex items-center gap-[8px]'>
          <div className='rating-card flex items-center'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8587 4.71248C11.218 3.60691 12.782 3.60691 13.1413 4.71248L14.4248 8.66264C14.5854 9.15706 15.0462 9.49182 15.566 9.49182H19.7195C20.8819 9.49182 21.3653 10.9794 20.4248 11.6626L17.0646 14.104C16.644 14.4095 16.468 14.9512 16.6287 15.4456L17.9122 19.3958C18.2714 20.5013 17.006 21.4207 16.0655 20.7374L12.7053 18.2961C12.2848 17.9905 11.7152 17.9905 11.2947 18.2961L7.93446 20.7374C6.994 21.4207 5.72862 20.5013 6.08785 19.3958L7.37133 15.4456C7.53198 14.9512 7.35599 14.4095 6.9354 14.104L3.5752 11.6626C2.63474 10.9794 3.11808 9.49182 4.28054 9.49182H8.43398C8.95386 9.49182 9.4146 9.15706 9.57525 8.66264L10.8587 4.71248Z" fill="#e6e6e6"/>
            </svg>
            <span className='w-[40px]'><div className="skeleton skeleton-text skeleton-text-animated !w-[100%]"></div></span>
          </div>
          <div className="skeleton skeleton-text skeleton-text-animated !w-[30%]"></div>
        </div>
        <div>
            <div className="skeleton skeleton-text skeleton-text-animated !w-[50%]"></div>
        </div>
      </div>
      <div className='uniresults-content-right flex items-end'>
        <div className='btn-pod flex gap-[8px]'>
            <div className="skeleton skeleton_btn skeleton-text-animated"></div>
            <div className="skeleton skeleton_btn skeleton-text-animated"></div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Findauniresultsskeleton