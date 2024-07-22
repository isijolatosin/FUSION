import { Video } from "expo-av";
import React from "react";

const VideoPlayer = ({ videoRef, url, isLooping, shouldPlay, style }) => {
  return (
    <Video
      ref={videoRef}
      source={{
        uri: `${url}`,
      }}
      useNativeControls
      resizeMode="cover"
      isLooping={isLooping}
      shouldPlay={shouldPlay}
      style={style}
    />
  );
};

export default VideoPlayer;
