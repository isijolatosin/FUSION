const convertUrlToGrayscale = (url) => {
  const cloudinaryBaseUrl = "http://res.cloudinary.com/dhdccvkyt/image/upload/";
  const transformation = "e_grayscale";
  const upscale = "e_upscale";

  // Extract the part of the URL after the base URL
  const urlParts = url.split("upload");

  if (urlParts.length !== 2) {
    throw new Error("Invalid Cloudinary URL");
  }

  const imageUrlPart = urlParts[1];

  // Construct the new URL with the transformation
  const grayscaleUrl = `${cloudinaryBaseUrl}${transformation}/${upscale}/${imageUrlPart}`;

  return grayscaleUrl;
};

export { convertUrlToGrayscale };
