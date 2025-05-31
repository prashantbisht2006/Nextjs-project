import React from 'react'
import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Startup ,Author} from '@/sanity/types';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';



export type StartupTypeCard = Omit< Startup,"author"> &{author?: Author};


const StartupCards = ({post}:{post: StartupTypeCard}) => {
  const {
  _createdAt,
  views,
  author,
  title,
  category,
  _id,
  image,
  description
} = post;

  return (
    <li className="startup-card group">

      <div className='flex-between'>
        <p className='startup_card_date'>
          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary'/>
          <span className='text-16-medium'>{post.views??0}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
  <p>{author?.name || "Unknown"}</p>
</Link>

<Link href={`/startup/${_id}`}>
  <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
</Link>
        </div>
        <Link href={`/user/${author?._id}`}>
         <Image
      src={author?.image || "https://placehold.co/600x400"}
      alt={author?.name || "Author"}
      width={48}
      height={48}
      className="rounded-full"
    />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
      <p className='startup-card_desc'>
        {description}
        </p>
      {image && (
  <Image
    src={image}
    alt="placeholder"
    width={300}
    height={200}
    className="rounded-xl object-cover"
  />
)}
 </Link>
      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category?.toLowerCase()}`}>
        <p className='text-16-medium'>
          {category}
          </p></Link>
          <Button className='startup-card_btn' asChild>
            <Link href={`/startup/${_id}`}>
            Details</Link>

          </Button>
      </div>


    </li>
  )
}


export const StartupcardSkeleton = () => {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index: number) => (
        <li key={index} className={cn("skeleton")}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
};


export default StartupCards