"use client"
import Link from 'next/link'
import { signIn , signOut , useSession , getProviders } from "next-auth/react";
import Image from 'next/image';
import { Fragment, useEffect  ,  useState } from "react"

const Nav = () => {
    const [providers,setProviders] = useState('');
    const {data:session} = useSession();

    // console.log("session " ,session);
    useEffect(()=>{
        handleProviders()
    },[])
    const handleProviders = async()=>{
          let response = await getProviders();
          // console.log("response");
          setProviders(response);
    }
    // console.log("providers",providers)
  return (
    <div className='flex items-center justify-between gap-5 p-5'>
        <Link href='/'>Home</Link> 
        
       

        { 
        session?.user.image ?
        <>
        <Link href="/profile" className='flex gap-5 items-center'>
        <img src={session?.user.image} className='h-[40px] w-[40px] rounded-full' />
        <div>{session?.user.name}</div>
        </Link>
        <div>
         <Link href="/create-blog"> 
             <button className='bg-black text-white p-2'>Create Blog</button>
        </Link> 
        </div> 
        </>
        :
        null
        }

{
          session ? 
         
                  <button onClick={signOut} className='border-2 p-2 border-black'>Signout</button>
        
         
          :
          <Fragment>
          {
            providers && Object.values(providers).map(provider=>(
           <button onClick={()=>{signIn(provider.id)}} className=' p-2 bg-black text-white'>Sign in</button>
            ))
          }
         </Fragment>
        }
        
    </div>
  )
}

export default Nav