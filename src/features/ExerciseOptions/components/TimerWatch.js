import React, { useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import InputNumberComponent from "../../../components/Input-Forms/InputNumberComponent";
import { MaterialIcons } from "@expo/vector-icons";
import IconComponent from "../../../components/icon-components/IconComponent";

const TimerWatch = ({ theme, setShowStopWatch }) => {
  const [time, setTime] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState("");
  const [selectedSeconds, setSelectedSeconds] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Format time in HH:MM:SS
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return { minutes, seconds, milliseconds };
  };

  // Start/Stop the stopwatch
  const toggleStopwatch = () => {
    if (time <= 0) return;

    if (isRunning) {
      clearInterval(intervalRef.current); // Stop the interval
    } else {
      const endTime = Date.now() + time; // Calculate the end time
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const remainingTime = endTime - Date.now(); // Calculate remaining time
          if (remainingTime <= 0) {
            clearInterval(intervalRef.current); // Stop when time runs out
            setIsRunning(false); // Ensure stopwatch stops
            return 0; // Ensure time doesn't go negative
          }
          return remainingTime; // Update remaining time
        });
      }, 10); // Update every 10ms for precision
    }
    setIsRunning(!isRunning); // Toggle running state
  };

  // Reset time to 0
  const resetTime = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const setInitialTime = () => {
    if (!selectedMinutes && !selectedSeconds) return;

    const _min = Number(selectedMinutes) * 60 * 1000;
    const _sec = Number(selectedSeconds) * 1000;
    const totalMilliseconds = _min + _sec;

    setTime(totalMilliseconds);
    setSelectedMinutes("");
    setSelectedSeconds("");
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <HorizontalPaddingSpace
      space={theme.space[3]}
      style={{
        position: "relative",
        width: "100%",
        height: "50%",
        maxheight: "50%",
        marginTop: theme.spaceNumberBy50[3],
      }}>
      <View
        style={{
          flexDirection: "row",
          height: "20%",
          width: "65%",
          justifyContent: "space-evenly",
          alignSelf: "center",
        }}>
        <InputNumberComponent
          autoFocus={false}
          centralize={true}
          setValue={(text) => setSelectedMinutes(Number(text))}
          value={selectedMinutes.toString()}
          width="33%"
          height="90%"
          backgroundColor="transparent"
          borderColor={theme.colors.brand.baseTint2}
          placeholder="M"
          fontSize="50px"
          fontColor={theme.colors.brand.base1}
          fontType={theme.fonts.montserratLight}
          allBorder={true}
          borderRadius={true}
        />
        <InputNumberComponent
          autoFocus={false}
          centralize={true}
          setValue={(text) => setSelectedSeconds(Number(text))}
          value={selectedSeconds.toString()}
          width="33%"
          height="90%"
          backgroundColor="transparent"
          borderColor={theme.colors.brand.baseTint2}
          placeholder="S"
          fontSize="50px"
          fontColor={theme.colors.brand.base1}
          fontType={theme.fonts.montserratLight}
          allBorder={true}
          borderRadius={true}
        />
      </View>
      <TouchableOpacity
        style={{
          marginBottom: theme.spaceNumberBy10[4],
          marginTop: theme.spaceNumberBy10[1],
          alignSelf: "center",
        }}
        onPress={setInitialTime}>
        <Text
          variant="custom"
          colorType="teal"
          fontType="montserratLight"
          fontSize="button">
          Set time
        </Text>
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: -theme.spaceNumberBy10[11],
          left: theme.spaceNumberBy10[0],
          backgroundColor: theme.colors.brand.baseTint2,
          padding: theme.spaceNumberBy10[0],
          borderRadius: theme.spaceNumberBy10[2],
        }}>
        <IconComponent
          iconFunction={() => setShowStopWatch(false)}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.base1}
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            position: "relative",
            flex: 1,
          }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              borderTopColor: theme.colors.brand.baseTint2,
              borderTopWidth: "1px",
            }}>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  width: 120,
                }}
                variant="custom"
                colorType="base7"
                fontType="montserratLight"
                fontSize="large"
                transform="capitalize"
                lineHeight={theme.lineHeights[34]}>
                {`${String(minutes).padStart(2, "0")}`}
              </Text>
            </View>
            <View>
              <Text
                variant="custom"
                colorType="base7"
                fontType="montserratLight"
                fontSize="large"
                transform="capitalize"
                lineHeight={theme.lineHeights[34]}>
                :
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  width: 120,
                }}
                variant="custom"
                colorType="base7"
                fontType="montserratLight"
                fontSize="large"
                transform="capitalize"
                lineHeight={theme.lineHeights[34]}>
                {`${String(seconds).padStart(2, "0")}`}
              </Text>
            </View>
            <View>
              <Text
                variant="custom"
                colorType="base7"
                fontType="montserratLight"
                fontSize="large"
                transform="capitalize"
                lineHeight={theme.lineHeights[34]}>
                .
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: "center",
                  width: 120,
                }}
                variant="custom"
                colorType="base7"
                fontType="montserratLight"
                fontSize="large"
                transform="capitalize"
                lineHeight={theme.lineHeights[34]}>
                {`${String(milliseconds).padStart(2, "0")}`}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              justifyContent: "space-around",
              marginTop: theme.spaceNumberBy10[3],
              alignSelf: "center",
            }}>
            <TouchableOpacity onPress={resetTime} style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: theme.colors.brand.baseTint,
                  height: theme.spaceNumberBy10[7],
                  width: theme.spaceNumberBy10[7],
                  borderRadius: theme.spaceNumberBy10[9],
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="custom"
                  colorType="base4"
                  fontType="montserratLight"
                  fontSize="caption"
                  transform="uppercase"
                  lineHeight={theme.lineHeights[14]}>
                  Reset
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleStopwatch} style={{ flex: 1 }}>
              <View
                style={{
                  backgroundColor: theme.colors.brand.baseTint,
                  height: theme.spaceNumberBy10[7],
                  width: theme.spaceNumberBy10[7],
                  borderRadius: theme.spaceNumberBy10[9],
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="custom"
                  colorType={time <= 0 ? "base7" : "teal"}
                  fontType="montserratLight"
                  fontSize="caption"
                  transform="uppercase"
                  lineHeight={theme.lineHeights[14]}>
                  {isRunning ? "Stop" : "Start"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </HorizontalPaddingSpace>
  );
};

export default TimerWatch;
