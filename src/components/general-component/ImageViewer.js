import React from "react";
import { Image } from "react-native";
import { convertUrlToGrayscale } from "../../utilities/convertUrlTpGrayScale";

const ImageViewer = ({ url, style, isLocalUrl, isGrayscale }) => {
  const _url = isGrayscale ? convertUrlToGrayscale(url) : url;
  return (
    <Image
      source={
        isLocalUrl
          ? _url
          : {
              uri: `${_url}`,
            }
      }
      style={style}
    />
  );
};

export default ImageViewer;
