import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../../../components/typography/text.component";

const TimeCountdown = ({
  initialTimeInSeconds,
  color,
  fontSize,
  isStopWatch,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  console.log("timeLeft", timeLeft);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount or when timeLeft changes
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View style={{}}>
      <Text
        style={{ textAlign: "center" }}
        variant="custom"
        colorType={color ? color : "teal"}
        fontType="montserratBold"
        fontSize={fontSize ? fontSize : "body"}
        transform="capitalize">
        {timeLeft === 0 && !isStopWatch ? "Resume" : formatTime(timeLeft)}
      </Text>
    </View>
  );
};

export default TimeCountdown;
