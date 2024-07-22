const onloadVideoPlayer = async (videoRef, isFocused) => {
  if (isFocused) {
    // You might want to play the video if the screen is focused
  } else {
    // Pause or unload video when screen is not focused
    if (videoRef.current) {
      await videoRef.current.pauseAsync(); // or unloadAsync
    }
  }
};
export { onloadVideoPlayer };
