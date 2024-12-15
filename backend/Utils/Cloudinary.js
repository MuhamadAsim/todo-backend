import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: 'dzqsdk84y', 
    api_key: '236339527654683', 
    api_secret: 'KDr6GNSvXc6J0dhKXKgBDEW6KzA' 
});



const uploadOnCloudinary= async(localpath)=>{
    try{
        if(!localpath){
            return null;
        }
      const res= await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        });
        return res;
    }
    catch(error){
    fs.unlinkSync(localpath);
    return null;
    }
    
}


export {uploadOnCloudinary};