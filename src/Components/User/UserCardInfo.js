import React from 'react'
import { Link } from 'react-router-dom'

export const UserCardInfo = ({ total, title, msg, link, empty, user }) => {
  return (
    <div className="shadow p-4 rounded-md dark:bg-[#303030] bg-white">
      <h4 className=" capitalize mb-3 text-primary-blue font-medium">
        {title}
      </h4>
      {total ? (
        <div className='flex gap-4  items-center justify-between'>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {msg}
          </p>
          {
            link && total && title !== 'like' ? (
              <Link state={user} to={link} className='underline italic text-[10px] text-primary-blue hover:underline'>Show more</Link>
            ) : null
          }
        </div>
      ) : (
        <p className="text-red-400 text-xs">
          {empty}
        </p>
      )
      }

    </div>
  )
}
