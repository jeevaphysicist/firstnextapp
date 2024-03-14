"use client"

import React from "react";
import 'quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
});
    
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateBlogPost = () => {
  const [blogData,setBlogData] = useState('');
  const [coverimage,setCoverimage] = useState('');
  const [title,setTitle] = useState('');

  let router = useRouter();
  const {data:session} = useSession();
  
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

  const handleProcedureContentChange = (content) => {
    // console.log("content---->", content);
    setBlogData(content);
  };

  

  const handleUploadBlogData = async ()=>{
        let newdata = {
             Data: blogData,
             id: session?.user.id         
        }
        let options = {
                       method:"POST",
                       body:JSON.stringify(newdata)
                      }
        let response = await fetch("/api/blog/new",options);
        const data = await response.json();
        if(response.status===200){
           router.push('/')
        }
      
        
  }
 
  return (
    <div >
      {/* <h1 style={{ textAlign: "center" }}>Text Editor In React JS</h1> */}
      <div className='w-[100%] flex items-center justify-center'>
        
        <div className='w-[100%] md:w-[700px] h-[90vh] lg:w-[800px]'>
        
         
        <ReactQuill
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
          <button className="bg-black text-white rounded-[10px] p-4" onClick={handleUploadBlogData}>Submit</button>
        </div>
     
     
    </div>
  );

}

export default CreateBlogPost;