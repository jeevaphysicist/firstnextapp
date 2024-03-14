"use client"
import React, { Fragment, useEffect, useState } from 'react'
import { useRouter, useSearchParams} from 'next/navigation';
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const page = () => {
    const [blog,setBlog] = useState('');
    const searchparmas = useSearchParams();
    const blogid = searchparmas.get('id');
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
   <Fragment>
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
   </Fragment>
  )
}

export default page