"use client";
import { client } from '@/sanity/lib/client'
import React from 'react'

const Startupform = () => {
  return (
    <form action={()=>{}} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form-label'>Title</label>
        <input id="title" name="title" className='startup-form_input
        required placeholder:Startup Title'/>
      </div>
    </form>
  )
}

export default Startupform
