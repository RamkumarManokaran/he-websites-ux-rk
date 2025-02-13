import React from 'react'
import Image from 'next/image'

const Viewprofile = () => {
  return (
    <button type='button' className='btn btn-primary flex items-center justify-center min-w-[153px] md:min-w-[162px] gap-[8px]'>View profile <Image src="/assets/icons/right_white_arrow.svg" width="17" height="14" alt="arrow icon" />
    </button>
  )
}

export default Viewprofile