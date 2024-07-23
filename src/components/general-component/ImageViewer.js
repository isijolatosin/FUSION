import React from "react";
import { Image } from "react-native";

const ImageViewer = ({ url, style, isLocalUrl }) => {
  return (
    <Image
      source={
        isLocalUrl
          ? url
          : {
              uri: `${url}`,
            }
      }
      style={style}
    />
  );
};

export default ImageViewer;
