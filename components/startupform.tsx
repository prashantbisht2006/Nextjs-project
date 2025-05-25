"use client";
import { client } from '@/sanity/lib/client';
import React, { use, useActionState, useState } from 'react';
import {Textarea} from '@/components/ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { set } from 'sanity';
import { Button } from './ui/button';
import { Router, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';

const Startupform = () => {
  const [errors, seterrors] = useState<Record<string,string>>({});
  
  const[pitch, setPitch] = useState<string>('');
  
  const handleFormSubmit = async(prevState:any,formData:FormData)=>{
    try{
      const formValues = {title:formData.get("title") as string,
        description:formData.get("description") as string,
        category:formData.get("category") as string,
        link:formData.get("link") as string,
        pitch
      }

      await FormSchema.parseAsync(formValues);

      console.log(formValues);
//       const result = await client.createIdea(prevState , formData, pitch);
//       if(result.status ==="SUCCESS"){
//          toast("SUCCESS", {
//   description: "Startup Pitch has been submitted successfully.",
//   duration: 4000,
// });
//      Router.push(href:`/startup/${result.id}`)
//       }
//       return result;
    




    }catch(error){
      if(error instanceof z.ZodError){
        const fieldErrors= error.flatten().fieldErrors;

        seterrors(fieldErrors as unknown as Record<string,string>);


        toast("Unexpected error occurred", {
  description: "Something went wrong.",
  duration: 4000,
});
        return{...prevState,error:"Validation Error", status:"ERROR"}
      };
       toast("Unexpected error occurred", {
  description: "Something went wrong.",
  duration: 4000,
});
      return{...prevState,error:"An unexpected error occurred", status:"ERROR"};
        
    }
  };

  const [state, formAction, pending]= useActionState(handleFormSubmit,{erros:"",status:"initial"});

  



  return (
    <form action={formAction} className='startup-form'>
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
  {errors.link && <p className='startup-form_error'>{errors.link}</p>}
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
      <Button type='submit' className='startup-form_btn' disabled={pending}>
        {pending ? 'Submitting...' : 'Submit Your Startup'}
        <Send className="size-6 sm:size-5 ml-2 " />


      </Button>

    </form>
  );
};

export default Startupform;
