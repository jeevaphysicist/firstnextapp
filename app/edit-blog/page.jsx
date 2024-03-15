"use client"
import React, { Fragment, useEffect, useState } from 'react';
import CreateBlogPost from '@components/CreateBlog';
import { Suspense } from 'react'
import { useSearchParams ,useRouter } from 'next/navigation'
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});

const CreateBlog = () => {
    const [editblogdata,setEditBlogData] = useState(null);
    const [blogSize,setBlogSize] = useState(0);
    const searchParams = useSearchParams();
    let router = useRouter();
 
    const blogid = searchParams.get('id');
    // console.log("Blogid",blogid);

    useEffect(()=>{
         GetBlogData()
    },[]);

    const GetBlogData = async ()=>{
        let response = await fetch(`/api/blog/getsingleblog/${blogid}`);
        const data = await response.json();
        // console.log("data",data);
        setEditBlogData(data.blogdata);
        let blogsize = calculateVariableSize(data.blogdata);
    setBlogSize(blogsize);
    }

 
  
  var modules = {
    toolbar:[
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size","video","code-block","font","clean"
  ];

  const handleProcedureContentChange = async (content) => {
    // console.log("content---->", content);
    setEditBlogData(content);
    let blogsize = await calculateVariableSize(editblogdata);
    setBlogSize(blogsize);
  };

  

  const handleUpdateBlogData = async ()=>{
        let newdata = {
             Data: editblogdata,
             id: blogid         
        }
        let options = {
                       method:"PATCH",
                       body:JSON.stringify(newdata)
                      }
        let response = await fetch("/api/blog/edit",options);
        const data = await response.json();
        // console.log("data",data);
        if(response.status===200){
           router.push('/')
        }
      
        
  }

  function calculateVariableSize(variable) {
    const sizeInBytes = new Blob([variable]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024); // Convert bytes to megabytes
    return sizeInMB;
}




  return (
   <Fragment>
    {/* <div></div> */}
    <div >
      {/* <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1> */}
      <div className='w-[100%] flex flex-col items-center justify-center'>
        <div>Blog Size {blogSize}</div>
        <div className='w-[100%] md:w-[700px] h-[90vh] lg:w-[800px]'>
        
         
        <ReactQuill
        value={editblogdata}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={handleProcedureContentChange}
         className="h-[60vh]"
        >
        </ReactQuill>
        </div>
        </div>

       <div className="flex items-center mt-[100px] justify-center w-[100%]">
          <button className="bg-black text-white rounded-[10px] p-4" onClick={handleUpdateBlogData}>Save</button>
        </div>
     
     
    </div>
   </Fragment>
  )
}

export default CreateBlog