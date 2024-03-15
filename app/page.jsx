"use client"
import React, { Fragment, useEffect, useState } from 'react'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
}); 

const Page = () => {
  const [blogs,setBlogs] = useState([]);

  useEffect(()=>{
        GetAllBlogs()
  },[])
  
  const GetAllBlogs = async ()=>{
    let response = await fetch("/api/blog/new");
    const data = await response.json();
    setBlogs(data);
    // console.log("data",data);
   }

   
  
  console.log("blogs",blogs);

  return (
    <Fragment>
    <div className='text-[50px] px-10 h-[5vh] flex items-center justify-center'>Blogs</div>
    <div className='grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10'>
       {
       blogs.length > 0 && blogs.map(post=>
       <Link href={`/blog/q?id=${post._id}`} className='border '> 
         <div><img src={post.coverimage} alt="coverimage..." /></div>
         <div>{post.title}</div>        
      </Link>
          
      )
      }
    </div>
    </Fragment>
  )
}

export default Page