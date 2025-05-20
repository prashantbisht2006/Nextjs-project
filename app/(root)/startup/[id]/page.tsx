import React from 'react'
export const experimental_ppr = true;
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';

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
    <h1 className='text-3xl font-semibold'>{post.description}</h1>
    </>
  )
}

export default page;
