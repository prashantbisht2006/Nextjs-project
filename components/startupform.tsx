"use client";
import { client } from '@/sanity/lib/client';
import React, { use, useState } from 'react';
import {Textarea} from '@/components/ui/textarea';
 

const Startupform = () => {
  const [errors, seterrors] = useState<Record<string,string>>({});
  
  return (
    <form action={() => {}} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>Title</label>
        <input
          id="title"
          name="title"
          className='startup-form_input'
          required
          placeholder="Startup Title..."
        />
        {errors.title && <p className='startup-form_error'>{errors.title}</p>}

      </div>


      <div>
        <label htmlFor='description' className='startup-form_label'>Description</label>
        <Textarea
          id="description"
          name="description"
          className='startup-form_textarea'
          required
          placeholder="Description..."
        />
        {errors.description && <p className='startup-form_error'>{errors.description}</p>}

      </div>


      <div>
        <label htmlFor='category' className='startup-form_label'>Category</label>
        <input
          id="category"
          name="category"
          className='startup-form_input'
          required
          placeholder="Startup Category eg.Tech,Healthcare etc..."
        />
        {errors.category && <p className='startup-form_error'>{errors.category}</p>}

      </div>


      <div>
        <label htmlFor='link' className='startup-form_label'>Image Link</label>
        <input
          id="link"
          name="link"
          className='startup-form_input'
          required
          placeholder="Startup Image URL"
        />
        {errors.imge && <p className='startup-form_error'>{errors.imge}</p>}

      </div>
    </form>
  );
};

export default Startupform;
