import { ConnectToDB } from "@utils/database";
import Blogs from "@models/blogs";

export const  PATCH = async (req) =>{
  // console.log("post method",req);
   const  { Data , id }  = await req.json();
   
      try{
        let newData = {
               blogdata:Data,
              }
          await ConnectToDB();
          let blog = await Blogs.updateOne({_id:id},newData);
           return new Response (JSON.stringify(blog),{status:200});
      }
      catch(error){
        return new Response ({status:500});
      }
}