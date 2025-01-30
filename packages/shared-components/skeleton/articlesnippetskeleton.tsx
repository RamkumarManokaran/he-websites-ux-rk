import React from 'react'

const Articlesnippetskeleton = () => {
  return (
    <div className='articlesnippet-container bg-white'> 
        <div className="max-w-container mx-auto">
            <div className='articlesnippet-card-container flex flex-col lg:flex-row justify-between gap-[20px] px-[16px] md:px-[20px] xl:px-[0] py-[40px] md:py-[64px]'>
                <div className='h5'><div className="skeleton skeleton-text-animated large_heading !w-[200px]"></div></div>
                <div className='flex flex-col gap-[8px] w-full lg:w-[calc(100%_-_289px)]'>
                    <div className='flex flex-col gap-[4px]'>
                        <div className="skeleton skeleton-text-animated descrip !w-full"></div>
                        <div className="skeleton skeleton-text-animated descrip !w-full"></div>
                        <div className="skeleton skeleton-text-animated descrip !w-full"></div>
                    </div>
                    <div className='small font-semibold'>
                        <div className="skeleton skeleton-text-animated descrip !w-[100px]"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Articlesnippetskeleton