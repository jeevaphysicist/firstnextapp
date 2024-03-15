"use client"
import React, { Fragment, useEffect, useState } from 'react';
import 'quill/dist/quill.bubble.css'
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), { // Dynamically import ReactQuill
  ssr: false, // Disable server-side rendering
}); 

const ProfilePage = () => {
 const [users,setUsers] = useState([]);
 const [blogs,setBlogs] = useState([]);

  useEffect(() => {
    GetAllUsers()       
   } , []) 

const GetAllUsers = async ()=>{
    let response = await fetch("/api/user/getall");
    const data = await response.json();
    setUsers(data);
    // console.log("data",data);
   }
useEffect(()=>{
    GetAllBlogs()
},[])

const GetAllBlogs = async ()=>{
let response = await fetch("/api/blog/new");
const data = await response.json();
setBlogs(data);
// console.log("data",data);
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

const DeleteBlogData = async (blogid)=>{
  let response = await fetch(`/api/blog/getsingleblog/${blogid}`,{method:"DELETE"});
  const data = await response.json();
  GetAllBlogs();
}



  return (
    <Fragment>
    {/* <div className='text-[50px] px-10 h-[60vh] flex items-center justify-center'>ProfilePage</div> */}
    <div className='flex gap-5 '>
        {users.length > 0 && users.map(user=>(
             <div>
                <div><img src={user.photo} alt=''/></div>
                <div>{user.username}</div>
                <div>{user.email}</div>
             </div>
        ))}
    </div>
    <div className='text-[50px] px-10 h-[5vh] flex items-center justify-center'>Blogs</div>
    <div className='grid px-5 md:px-10 mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-10'>
       {
       blogs.length > 0 && blogs.map(post=>
      //  <Link href={`/blog/q?id=${post._id}`} className='border '> 
       <div  className='border flex flex-col gap-5 pb-5 '> 
        <div><img src={post.coverimage} alt="coverimage..." /></div>
         <div className='px-5'>{post.title}</div>  
      <div className='flex items-center justify-center  gap-5'>
        <Link href={`/edit-blog?id=${post._id}`}>Edit</Link>
        <button onClick={()=>DeleteBlogData(post._id)}>Delete</button>
      </div>
        
      </div>
          
      )
      }
    </div>
    </Fragment>
  )
}
 
export default ProfilePage