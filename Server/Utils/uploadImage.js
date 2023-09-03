const cloudinary = require('../Services/External/cloudinaryConfig');

const uploadImage = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      let secure_url = "";
      await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        async (error, result) => {
          if (error) {
            reject(error);
          } else {
            secure_url = result?.secure_url;
            resolve(secure_url);
          }
        }
      ).end(file.buffer);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = uploadImage;
