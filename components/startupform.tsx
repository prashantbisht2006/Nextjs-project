"use client";
import { client } from '@/sanity/lib/client';
import React, { use, useState } from 'react';
import {Textarea} from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { set } from 'sanity';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
 

const Startupform = () => {
  const [errors, seterrors] = useState<Record<string,string>>({});
  
  const[pitch, setPitch] = useState<string>('');

  const ispanding=false;



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

      <div data-color-mode="light">
        <label htmlFor='Pitch' className='startup-form_label'>Pitch</label>
       <MDEditor
  value={pitch}
  onChange={(value) => setPitch(value as string || '')}
  id="pitch"
  preview="edit"
  height={300}
  style={{
    borderRadius: '20px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    fontSize: '16px',
    color: '#333',
  }}
  textareaProps={{
    placeholder: "Briefly describe your startup..."
  }}
/>

        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}

      </div>
      <Button type='submit' className='startup-form_btn' disabled={ispanding}>
        {ispanding ? 'Submitting...' : 'Submit Your Startup'}
        <Send className="size-6 sm:size-5 ml-2 text-black" />


      </Button>

    </form>
  );
};

export default Startupform;
