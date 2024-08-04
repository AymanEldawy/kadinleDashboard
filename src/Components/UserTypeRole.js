import React from 'react'

export const UserTypeRole = ({ type }) => {
  return (
    <span
      className={`${type?.number === 0 &&
        "text-black px-2 p-1 rounded-md text-xs bg-primary-yellow"
        } 
                ${type?.number === 1 &&
        "text-white px-2 p-1 rounded-md text-xs bg-indigo-500"
        }
                 ${type?.number === 2 &&
        "text-white px-2 p-1 rounded-md text-xs bg-primary-red"
        } 
                 ${type?.number === 3 &&
        "text-white px-2 p-1 rounded-md text-xs bg-primary-blue"
        } 
                 ${type?.number === 4 &&
        "text-white px-2 p-1 rounded-md text-xs bg-emerald-700"
        }`}
    >
      {type?.title}
    </span>
  )
}
