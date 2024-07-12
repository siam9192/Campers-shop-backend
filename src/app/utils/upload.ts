
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from "fs"
cloudinary.config({ 
    cloud_name: 'ddlfpv4gl', 
    api_key: config.cloudinary_api_key, 
    api_secret: config.cloudinary_api_secret
});


export const uploadImageInToCloundinary = async (path:string,imageName:string)=>{
 
    // Upload an image
    const uploadResult = await cloudinary.uploader
    .upload(
        path, {
            public_id: imageName,
        }
    )
    fs.unlinkSync(path)
    return uploadResult;
}