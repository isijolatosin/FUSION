import React from "react";
import { View, Pressable, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import {
  MessageBubble,
  MessageBubbleWrap,
} from "../../../components/Input-Forms/input.styles";
import {
  detectImageUrl,
  detectAudioFile,
  detectPhoneNumber,
  detectUrl,
  handleCallPress,
  handleUrlPress,
} from "../../../utilities/detectTextType";
import { Text } from "../../../components/typography/text.component";
import { getTime } from "../../../utilities/formatTimestamp";
import IconComponent from "../../../components/icon-components/IconComponent";

export default function MessageGroupComponent({
  theme,
  dateTitle,
  data,
  currentUser,
  setSelectedImage,
  setShowImageModal,
  // playAudio,
}) {
  function checkIfdateIsToday(targetDate) {
    // Get the current date in the same format
    const options = { timeZone: "UTC" };
    const now = new Date().toISOString().slice(0, 10);
    const currentDate = now.toLocaleString("en-US", options);
    const [year, month, day] = targetDate.split("-").map(Number);
    const dateObject = new Date(Date.UTC(year, month - 1, day))
      .toISOString()
      .slice(0, 10);

    // Check if the target date is equal to the current date
    const isToday = targetDate === currentDate;

    return isToday;
  }

  function changeDateToWordFormat(date) {
    const dateObject = new Date(date);

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  return (
    <View>
      <View
        style={{
          marginVertical: theme.spaceNumber[7],
        }}>
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="linesLight"
          fontType="montserratSemibold"
          fontSize="caption">
          {checkIfdateIsToday(dateTitle)
            ? "Today"
            : changeDateToWordFormat(dateTitle)}
        </Text>
      </View>
      {data?.map((item, idx) => (
        <MessageBubbleWrap
          key={idx}
          currentUser={currentUser?.phonenumber === item?.senderphonenumber}>
          <MessageBubble
            currentUser={currentUser?.phonenumber === item?.senderphonenumber}>
            {detectPhoneNumber(item?.message) ? (
              <Pressable onPress={() => handleCallPress(item?.message)}>
                <Text
                  variant="custom"
                  colorType={
                    detectPhoneNumber(item?.message) ? "brandFade" : "black"
                  }
                  fontType="montserratSemibold"
                  fontSize="body">
                  {item?.message}
                </Text>
              </Pressable>
            ) : detectUrl(item?.message) && !detectImageUrl(item?.message) ? (
              <Pressable onPress={() => handleUrlPress(item?.message)}>
                <Text
                  variant="custom"
                  colorType={detectUrl(item?.message) ? "brandFade" : "black"}
                  fontType="montserratSemibold"
                  fontSize="body">
                  {item?.message}
                </Text>
              </Pressable>
            ) : detectImageUrl(item?.message) ? (
              <TouchableOpacity
                onPress={() => {
                  setSelectedImage(item?.message);
                  setShowImageModal(true);
                }}
                style={{
                  width: theme.spaceNumberBy10[12],
                  height: theme.spaceNumberBy10[12],
                }}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumber[4],
                  }}
                  source={{
                    uri: item?.message,
                  }}
                />
              </TouchableOpacity>
            ) : detectAudioFile(item?.message) ? (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                // onPress={() => playAudio(item?.message)}
              >
                <IconComponent
                  iconFunction={() => {}}
                  iconName="multitrack-audio"
                  IconComponent={MaterialIcons}
                  size={20}
                  theme={theme}
                  horizontalRightSpace={theme.space[1]}
                  color={theme.colors.brand.base}
                />
                <View>
                  <Text
                    variant="custom"
                    colorType="base"
                    fontType="montserratSemibold"
                    fontSize="caption">
                    Play audio
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratSemibold"
                  fontSize="body">
                  {item?.message}
                </Text>
              </View>
            )}

            <Text
              style={{ position: "absolute", top: 5, left: 15 }}
              variant="custom"
              colorType="lines"
              fontType="montserratRegular"
              fontSize="xcaption">
              {getTime(item?.timestamp)}
            </Text>
          </MessageBubble>
        </MessageBubbleWrap>
      ))}
    </View>
  );
}
