import React from "react";
import { Image } from "react-native";

const ImageViewer = ({ url, style, width, height, isLocalUrl }) => {
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
      width={width}
      height={height}
    />
  );
};

export default ImageViewer;
