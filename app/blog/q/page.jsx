'use client'

import React, { Fragment, useEffect, useState } from 'react'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const page = () => {
    const [blog,setBlog] = useState('');
    const searchParams = useSearchParams()
 
    const blogid = searchParams.get('id');
    // console.log("Blogid",blogid);

    useEffect(()=>{
         GetBlogData()
    },[]);

    const GetBlogData = async ()=>{
        let response = await fetch(`/api/blog/getsingleblog/${blogid}`);
        const data = await response.json();
        setBlog(data);
    }


  return (
   <Suspense>
    {
        blog ? 
        <div className='w-[100%] flex items-center justify-center'>
        
         <div className='w-[100%] md:w-[700px] lg:w-[800px]'>
        <ReactQuill
        value={blog.blogdata}
        readOnly={true}
        theme="bubble"
        modules={{ toolbar: false }}
        />
      </div>
        
      </div>
     
      :
      <div>No Blog Found</div>
    }
   </Suspense>
  )
}

export default page