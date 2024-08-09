import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { handlePickImageAsync } from "../../../utilities/handleUploadImage";
import firebase, { database } from "../../../../config";
import { SafeArea } from "../../../components/utility/safe-area.component";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import { Text } from "../../../components/typography/text.component";
import IconComponent from "../../../components/icon-components/IconComponent";

const EventForm = ({ currentUser, setReload, theme, setShowEventForm }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  async function handleUploadImage() {
    const image = await handlePickImageAsync(
      () => {},
      () => {},
      "",
      false,
      false,
      () => {},
      true,
      () => {}
    );
    setImage(image);
  }

  function submitData() {
    if (!title && !time && !date && !eventLocation && !description) return;

    database.collection("events").add({
      date: date,
      description: description,
      creator: currentUser?.phonenumber,
      location: eventLocation,
      time: time,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: title,
      image: image,
    });
    setTitle("");
    setTime("");
    setEventLocation("");
    setDescription("");
    setImage("");
    setDate("");
    setReload(true);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    const _date = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };

    setDate(_date.toLocaleDateString("en-US", options));

    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);

    hideTimePicker();
  };

  return (
    <SafeArea
      style={{ width: "100%", backgroundColor: theme.colors.brand.base }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <Spacer
            position="bottom"
            size="large"
            style={{ width: "100%", position: "relative" }}>
            <HeaderComponent
              title="Create Event Form"
              theme={theme}
              LeftComp={() => <></>}
              RightComp={() => <></>}
            />
            <View style={{ marginLeft: -theme.spaceNumber[0] }}>
              <Text
                style={{
                  textAlign: "center",
                }}
                variant="custom"
                colorType="base"
                fontType="montserratSemibold"
                fontSize="caption">
                All fields are required
              </Text>
            </View>
            <Pressable
              onPress={() => {
                Keyboard.dismiss();
                const eventBackId = setTimeout(() => {
                  setShowEventForm(false);
                }, 100);
              }}
              style={{
                position: "absolute",
                top: theme.spaceNumberBy10[1] + theme.spaceNumber[0],
                left: -theme.spaceNumber[5],
              }}>
              <IconComponent
                iconFunction={() => {
                  Keyboard.dismiss();
                  const eventBackId = setTimeout(() => {
                    setShowEventForm(false);
                  }, 100);
                }}
                iconName="keyboard-arrow-left"
                IconComponent={MaterialIcons}
                size={35}
                color={theme.colors.brand.brandTone}
              />
            </Pressable>
          </Spacer>
          <View style={{ position: "relative" }}>
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setTitle(text.toLowerCase())}
              value={title}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Title"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
            <View
              style={{
                position: "absolute",
                top: theme.spaceNumberBy10[1],
                left: -theme.spaceNumberBy10[0],
              }}>
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratBold"
                fontSize="button">
                *
              </Text>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setEventLocation(text.toLowerCase())}
              value={eventLocation}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Event location"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
            <View
              style={{
                position: "absolute",
                top: theme.spaceNumberBy10[1],
                left: -theme.spaceNumberBy10[0],
              }}>
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratBold"
                fontSize="button">
                *
              </Text>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setTime(text.toLowerCase())}
              value={time}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Time"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
            />
            <View
              style={{
                position: "absolute",
                top: theme.spaceNumberBy10[1],
                left: -theme.spaceNumberBy10[0],
              }}>
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratBold"
                fontSize="button">
                *
              </Text>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <InputComponent
              includeIcon={false}
              keyboardTyp="text-pad"
              setValue={(text) => setDescription(text.toLowerCase())}
              value={description}
              width="100%"
              isCountryCode={false}
              isBackgroundColor={false}
              placeholder="Description"
              fontSize={theme.fontSizes.body}
              fontType={theme.fonts.montserratLight}
              maxlength={600}
              multiline={true}
              numberOfLines={5}
            />
            <View
              style={{
                position: "absolute",
                top: theme.spaceNumberBy10[1] + 5,
                left: -theme.spaceNumberBy10[0],
              }}>
              <Text
                variant="custom"
                colorType="error"
                fontType="montserratBold"
                fontSize="button">
                *
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: theme.letterSpacing[0],
              borderBottomColor: theme.colors.brand.lines,
              paddingVertical: theme.spaceNumber[7],
            }}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                position: "relative",
                marginRight: theme.spaceNumberBy10[5],
              }}>
              <View style={{ position: "absolute", top: theme.spaceNumber[0] }}>
                <Text
                  variant="custom"
                  colorType="error"
                  fontType="montserratBold"
                  fontSize="body">
                  *
                </Text>
              </View>
              <View>
                <Text
                  style={{ marginLeft: theme.spaceNumber[5] }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="body">
                  Date
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity
              onPress={showTimePicker}
              style={{
                position: "relative",
              }}>
              <View style={{ position: "absolute", top: theme.spaceNumber[0] }}>
                <Text
                  variant="custom"
                  colorType="error"
                  fontType="montserratBold"
                  fontSize="body">
                  *
                </Text>
              </View>
              <View>
                <Text
                  style={{ marginLeft: theme.spaceNumber[5] }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="body">
                  Time
                </Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="time"
              onConfirm={handleTimeConfirm}
              onCancel={hideTimePicker}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              if (image) return;

              handleUploadImage();
            }}
            style={{
              alignItems: "center",
              paddingTop: theme.spaceNumberBy10[2],
              width: "50%",
            }}>
            <Text
              variant="custom"
              colorType={image ? "lines" : "base"}
              fontType="montserratRegular"
              fontSize="body">
              {image ? "Image Uploaded" : "Upload Image"}
            </Text>
          </TouchableOpacity>
        </HorizontalPaddingSpace>
        <TouchableOpacity
          onPress={submitData}
          style={{
            alignItems: "center",
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: theme.colors.brand.linesLight,
            paddingTop: theme.spaceNumber[7],
            paddingBottom: theme.spaceNumber[7],
            marginTop: theme.spaceNumberBy10[2],
          }}>
          <HorizontalPaddingSpace space={theme.space[2]}>
            <Text
              variant="custom"
              colorType={
                !title && !time && !date && !eventLocation && !description
                  ? "linesLighter"
                  : "base"
              }
              fontType="montserratRegular"
              fontSize="body">
              Submit
            </Text>
          </HorizontalPaddingSpace>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default EventForm;
