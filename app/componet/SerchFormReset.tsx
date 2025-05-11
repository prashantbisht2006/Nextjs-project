"use client"
import React from 'react'

const SerchFormReset = () => {
    const reset =()=>{
        const form =document.querySelector('.search-form')as HTMLFormElement;
    if(form) form.reset;
    }
  return (
    
      <button type="reset" onClick={reset}>
        <link href="/" className='search-btn text-white'>
        
        </link></button>
        
    
  )
}

export default SerchFormReset
