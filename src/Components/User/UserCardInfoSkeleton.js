import React from 'react'

export const UserCardInfoSkeleton = () => {
  return (
    <div className="shadow p-4 rounded-md dark:bg-[#303030] bg-white">
      <div className="animate-pulse w-20 h-3 rounded-md bg-gray-200 mb-3" />
      <div className='flex gap-4  items-center justify-between'>
        <span className="animate-pulse w-20 h-3 rounded-md bg-gray-200" />
        <span className='animate-pulse w-20 h-3 rounded-md bg-gray-200'></span>
      </div>
    </div>
  )
}
