import { ConnectToDB } from "@utils/database";
import Blogs from "@models/blogs";

export const  POST = async (req) =>{
  // console.log("post method",req);
   const  { Data , id }  = await req.json();
   
      try{
        let newData = {
               blogdata:Data,
               creator:id
              }
          await ConnectToDB();
          let blog= await Blogs.create(newData);
           return new Response (JSON.stringify(blog),{status:200});
      }
      catch(error){
        return new Response ({status:500});
      }
}

export const  GET = async (req) =>{
  // console.log("get all user controlers");
    try{
       await ConnectToDB();
        let blogs= await Blogs.find({});
         return new Response (JSON.stringify(blogs),{status:200});
    }
    catch(error){
      return new Response ({status:500});
    }
}