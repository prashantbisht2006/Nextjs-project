import React from 'react'
export const experimental_ppr = true;
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const page = async({params}:{params:{id:string}}) => {
    const id = (await params).id;
    

    const post = await client.fetch(STARTUP_BY_ID_QUERY,{id});
    console.log("Fetched post:", post);
    if(!post){
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-semibold'>Startup not found</h1>
            </div>
        )
    }
    
  return (
    <>
    <section className="pink_container !min-h-[230px]">h
      <p className='tag'>{formatDate(post?._createdAt)}</p>
    
    <h1 className='heading-section'>{post.title}</h1>
    <p className='sub-heading !max-w-5xl'>{post.description}</p>
    
    </section>
    <section className='section_container '  >
      <img src={post.image}
      alt='thumbnail'
      width={900}
    height={400}
      className='rounded-xl object-cover '/>
      <div className='space-y-5 mt pt-10'>
        <Link href={`/user/${post.author?._id}`}
        className='flex gap-2 iteams-center mb-3'>
          <img src={post.author.image} alt="avatar"
          width={64} height={64} className='rounded-full drop-shadow-lg'/>
        <div>
          <p className='text-20-medium'>{post.author.name}</p>
          <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
        </div>
        </Link>
        <p className='category-tag'>{post.category}</p>


      </div>

    </section>
    </>
  )
}

export default page;
