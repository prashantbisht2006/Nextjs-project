import React from 'react'
import Startupform from '@/components/startupform'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';


const page = async() => {
    const session = await auth();

    if(!session)redirect("/")
  return (
    <>
      <section className='pink_container !min-h-[230px] md:text-5xl'>
        <h1 className='heading-section'>Submit your <br/>startup</h1>

      </section>
      
      <Startupform />
    </>
  )
}

export default page
