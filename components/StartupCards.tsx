import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link';

const StartupCards = ({post}={post: StartupTypeCard}) => {
  const {
  _createdAt,
  views,
  authors: { _id: author_id, name }, // fix here
  title,
  category,
  _id,
  image
} = post;

  return (
    <li className="startup-card group">

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
          <Link href={`/user/${author_id}`}>
  <p>{name}</p>
</Link>

<Link href={`/startup/${_id}`}>
  <h3>{title}</h3>
</Link>
        </div>
      </div>
    </li>
  )
}

export default StartupCards
