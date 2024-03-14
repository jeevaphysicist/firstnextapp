"use client"
import React, { Fragment, useEffect, useState } from 'react'

const ProfilePage = () => {
 const [users,setUsers] = useState([]);


  useEffect(() => {
    GetAllUsers()       
   } , []) 

const GetAllUsers = async ()=>{
    let response = await fetch("/api/user/getall");
    const data = await response.json();
    setUsers(data);
    // console.log("data",data);
   }

  //  console.log("users",users)


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
    </Fragment>
  )
}
 
export default ProfilePage