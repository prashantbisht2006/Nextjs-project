import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'

const StartupCards = ({post}={post: StartupTypeCard}) => {
  const {_createdAt, views,author:{_id:author_id,name},title,category,_id,image} = post
  return (
    <li className='start-card group'>
      <div className='flex-between'>
        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary'/>
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <link href={`/user/${author_id?._id}`}>
          <p className='text-16-medium line-clamp-1'>
            {name}
          </p>
          </link>
          <link href={`/startup/${_id}`}>
          <h3 className='text-26-semibold line-clamp-1'></h3></link>
        </div>
      </div>
    </li>
  )
}

export default StartupCards
