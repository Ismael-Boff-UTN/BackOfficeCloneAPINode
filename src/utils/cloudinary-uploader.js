//Autenticacion Cloudinary

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL);

const cloudinaryUploadImage = async (img, carpeta = "") => {
  imgLink = await cloudinary.uploader.upload(img, {
    folder: `${carpeta}`,
  });

  return imgLink.secure_url;
};

export default {
  cloudinaryUploadImage,
};
