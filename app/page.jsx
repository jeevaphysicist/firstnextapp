"use client"
import React, { Fragment, useEffect, useState } from 'react'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

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
    console.log("data",data);
   }

   
  
  function extractFirstParagraph(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    if (paragraphs.length > 0) {
      return paragraphs[0].outerHTML;
    } else {
      return ''; // If no paragraphs found, return an empty string
    }
  }

  return (
    <Fragment>
    <div className='text-[50px] px-10 h-[5vh] flex items-center justify-center'>Blogs</div>
    <div className='grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10'>
       {
       blogs.length > 0 && blogs.map(post=>
       <div className='border '> 
        <ReactQuill
        value={extractFirstParagraph(post.blogdata)}
        readOnly={true}
        theme="bubble"
        style={{ Width:"300px" ,height:"300px",border:"1px" }}
        modules={{ toolbar: false }}
      />
        
      </div>
          
      )
      }
    </div>
    </Fragment>
  )
}

export default Page