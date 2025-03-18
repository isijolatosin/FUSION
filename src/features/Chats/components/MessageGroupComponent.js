import React from "react";
import { View, Pressable, TouchableOpacity } from "react-native";
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
import ImageViewer from "../../../components/general-component/ImageViewer";

export default function MessageGroupComponent({
  theme,
  dateTitle,
  data,
  currentUser,
  handleReplyConfig,
  setSelectedImage,
  setShowImageModal,
  // playAudio,
}) {
  function checkIfdateIsToday(targetDate) {
    // Get the current date in the same format
    const options = { timeZone: "UTC" };
    const now = new Date().toISOString().slice(0, 10);
    const currentDate = now.toLocaleString("en-US", options);

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
          onLongPress={() =>  handleReplyConfig({
            isFocus: true,
            item: {
              name: item.firstname,
              id: item.id,
              message: item.message,
              timestamp: item.timestamp
            }
          })}
          currentUser={currentUser?.phonenumber === item?.senderphonenumber}>
          <MessageBubble
            isImage={detectImageUrl(item?.message)}
            currentUser={currentUser?.phonenumber === item?.senderphonenumber}>
              {item?.replyingTo?.message && (
                <View style={{backgroundColor: theme.colors.brand.base, borderRadius: theme.spaceNumber[2], padding: theme.spaceNumber[2], borderLeftWidth: theme.spaceNumber[2], borderLeftColor: theme.colors.brand.base5, marginBottom: theme.spaceNumber[5]}}>
                  <View style={{marginBottom: theme.spaceNumber[4]}}>
                    <Text variant="custom"
                      colorType="base1"
                      fontType="montserratSemibold"
                      fontSize="xcaption">
                        {item.replyingTo.name}
                    </Text>
                  </View>
                  <View>
                    <Text variant="custom"
                      colorType="base1"
                      fontType="montserratSemibold"
                      fontSize="caption">
                        {item.replyingTo.message}
                    </Text>
                  </View>
                </View>
              )}
            {detectPhoneNumber(item?.message) ? (
              <Pressable onPress={() => handleCallPress(item?.message)}>
                <Text
                  variant="custom"
                  colorType={
                    detectPhoneNumber(item?.message) ? "teal" : "base1"
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
                  colorType={detectUrl(item?.message) ? "teal" : "base1"}
                  fontType="montserratSemibold"
                  fontSize="caption">
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
                <ImageViewer
                  url={item?.message}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderBottomRightRadius:
                      currentUser?.phonenumber !== item?.senderphonenumber
                        ? theme.spaceNumber[4]
                        : 0,
                    borderBottomLeftRadius:
                      currentUser?.phonenumber === item?.senderphonenumber
                        ? theme.spaceNumber[4]
                        : 0,
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
                  colorType="base1"
                  fontType="montserratRegular"
                  fontSize="body">
                  {item?.message}
                </Text>
              </View>
            )}

            <Text
              style={{
                position: "absolute",
                top: 5,
                left: theme.spaceNumber[7],
              }}
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
