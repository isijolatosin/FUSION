import React, { useRef, useState, Fragment } from "react";
import {
  Modal,
  ScrollView,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import firebase, { database } from "../../../../config";
import {
  removeDocumentFromCollections,
  removeItemFromArray,
} from "../../../utilities/updateFirestoreDatabaseField";
import calculateAge from "../../../utilities/calculateAge";
import { Text } from "../../../components/typography/text.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { CloseButton } from "../../Main/screen/main.style";
import Button from "../../../components/utility/button.component";
import { getZodiacSign } from "../../../utilities/generateZodiac";
import { handleUrlPress } from "../../../utilities/detectTextType";
import getInterestMapObject from "../../../utilities/getInterestMapObject";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import ImageViewer from "../../../components/general-component/ImageViewer";

export default function FriendshipInitiatorProfileComponent({
  data,
  theme,
  bothUserData,
  setBothUserData,
  setShowInitiatorProfile,
  setInitiatorProfileData,
  currentUser,
  setIsRetrigger,
  videoRef,
}) {
  const navigation = useNavigation();
  const imageHeight = 450;
  const lastTap = useRef(0);
  const [doubleTapWarning, setDoubleTapWarnings] = useState(false);
  const [showAcceptConfirmCard, setShowAcceptConfirmCard] = useState(false);

  let iconNamePerGender = "";
  if (data?.[0]?.friendRequestFrom?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (data?.[0]?.friendRequestFrom?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (data?.[0]?.friendRequestFrom?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  async function handleAcceptFriendshipRequest() {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarnings(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const friendRequestFromNameAndPhoto = {
        name: data?.[0]?.friendRequestFrom?.firstname,
        photo: data?.[0]?.friendRequestFrom?.mediaArray?.[0],
      };
      const currentUserrNameAndPhoto = {
        name: currentUser?.firstname,
        photo: currentUser?.mediaArray?.[0],
      };
      setBothUserData([
        friendRequestFromNameAndPhoto,
        currentUserrNameAndPhoto,
      ]);

      // Create friendship data
      const friendshipRequestFrom = {
        id: data?.[0]?.friendRequestFrom?.id,
        phonenumber: data?.[0]?.friendRequestFrom?.phonenumber,
      };
      const friendshipRequestTo = {
        id: currentUser?.id,
        phonenumber: currentUser?.phonenumber,
      };
      database
        .collection("friendship-matches")
        .add({
          flag: data?.[0]?.flag,
          friendshipRequestFrom,
          friendshipRequestTo,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log(`FRIENSHIP CREATED SUCCESSFULLY`);
        })
        .catch((error) => console.log("Error " + error.message));

      //Remove current friendship initiation object from friend-request array list in database
      await removeDocumentFromCollections(
        "friend-request",
        data?.[0]?.id,
        setIsRetrigger
      );

      setShowAcceptConfirmCard(true);
    } else {
      setDoubleTapWarnings(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  function handleDeclineLike() {
    const friendRequestId = data?.[0]?.id;
    const docRef = database.collection("friend-request").doc(friendRequestId);
    docRef
      .delete()
      .then(() => {
        console.log("Friend request successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting friend request: ", error);
      });

    removeItemFromArray(
      "all-users",
      data?.[0]?.friendRequestFrom?.id,
      "listOfAllLikedNumbers",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      data?.[0]?.friendRequestFrom?.id,
      "likedMeList",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "listOfAllLikedNumbers",
      data?.[0]?.friendRequestFrom?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "likedMeList",
      data?.[0]?.friendRequestFrom?.phonenumber,
      () => {}
    );

    setIsRetrigger(true);
    setShowInitiatorProfile(false);
  }

  const currentUserData = bothUserData[1];
  const otherUserData = bothUserData[0];

  function routeToChatScreen() {
    setShowInitiatorProfile(false);
    setShowAcceptConfirmCard(false);
    setInitiatorProfileData([]);
    navigation.navigate("chat");
  }

  const zodiacSign = getZodiacSign(
    +data?.[0]?.friendRequestFrom?.dob?.day,
    +data?.[0]?.friendRequestFrom?.dob?.month
  );

  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{
        backgroundColor: theme.colors.brand.base,
        margin: 0,
        position: "relative",
        alignItems: "flex-end",
        paddingBottom: theme.spaceNumberBy10[0],
      }}>
      <View
        style={{ marginTop: theme.spaceNumberBy50[0], position: "relative" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              setIsRetrigger(true);
              setShowInitiatorProfile(false);
              setInitiatorProfileData([]);

              const likeInitiatorProfileId = setTimeout(() => {
                setShowAcceptConfirmCard(false);
              }, 500);

              return () => clearTimeout(likeInitiatorProfileId);
            }}
            style={{ marginTop: theme.spaceNumberBy10[1] }}>
            <IconComponent
              iconFunction={() => {
                setIsRetrigger(true);
                setInitiatorProfileData([]);
                setShowInitiatorProfile(false);

                const likeInitiatorProfileId = setTimeout(() => {
                  setShowAcceptConfirmCard(false);
                }, 500);

                return () => clearTimeout(likeInitiatorProfileId);
              }}
              iconName="keyboard-arrow-left"
              IconComponent={MaterialIcons}
              size={theme.spaceNumberBy10[3]}
              color={theme.colors.brand.base}
            />
          </Pressable>
          <View style={{ flex: 0.9 }}>
            <HeaderComponent
              textWidth="98%"
              title={`${
                data?.[0]?.friendRequestFrom?.firstname
              }, ${calculateAge(
                data?.[0]?.friendRequestFrom?.dob?.year,
                data?.[0]?.friendRequestFrom?.dob?.month,
                data?.[0]?.friendRequestFrom?.dob?.day
              )}`}
              theme={theme}
              LeftComp={() => <></>}
              RightComp={() => <></>}
            />
          </View>
        </View>
        {!showAcceptConfirmCard && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: theme.spaceNumberBy10[5] + 3 }}>
            <HorizontalPaddingSpace space={theme.space[2]}>
              <View style={{ position: "relative" }}>
                <ImageViewer
                  uri={data?.[0]?.friendRequestFrom?.mediaArray?.[0]}
                  style={{
                    width: "100%",
                    height: imageHeight,
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumberBy10[3],
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                    padding: theme.spaceNumberBy10[0],
                  }}>
                  {doubleTapWarning && (
                    <Text
                      style={{
                        position: "absolute",
                        left:
                          theme.spaceNumberBy50[5] + theme.spaceNumberBy10[1],
                        bottom: theme.spaceNumberBy10[6],
                      }}
                      variant="custom"
                      colorType="basewhite"
                      fontType="montserratRegular"
                      fontSize="caption">
                      double tap
                    </Text>
                  )}
                  <TouchableOpacity
                    style={{
                      borderRadius: theme.spaceNumberBy50[3],
                      padding: theme.spaceNumber[3],
                      backgroundColor: theme.colors.brand.basewhite,
                    }}>
                    <IconComponent
                      iconFunction={() => handleAcceptFriendshipRequest()}
                      iconName="thumbs-up"
                      IconComponent={Entypo}
                      size={theme.spaceNumberBy10[2]}
                      color={theme.colors.brand.base}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {data?.[0]?.friendRequestFrom?.bio && (
                <Fragment>
                  <Spacer position="top" size="medium">
                    <Text
                      variant="custom"
                      colorType="black"
                      fontType="montserratBold"
                      fontSize="title"
                      width="100%">
                      Bio
                    </Text>
                  </Spacer>
                  <Spacer
                    position="top"
                    size="small"
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.brand.base6,
                      borderRadius: theme.spaceNumber[2],
                      borderStyle: "dashed",
                      padding: theme.spaceNumber[3],
                    }}>
                    <Text
                      variant="custom"
                      colorType="lines"
                      fontType="montserratRegular"
                      fontSize="body"
                      width="100%">
                      {data?.[0]?.friendRequestFrom?.bio}
                    </Text>
                  </Spacer>
                </Fragment>
              )}
              <Spacer position="top" size="large">
                <Spacer position="bottom" size="medium">
                  <Text
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="title"
                    width="100%">
                    Fitness Goals
                  </Text>
                </Spacer>
              </Spacer>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: theme.spaceNumber[3],
                }}>
                {data?.[0]?.friendRequestFrom?.gymGoals?.map((goal, idx) => (
                  <View
                    key={idx}
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <Text
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="caption"
                      width="100%">
                      {goal}
                    </Text>
                  </View>
                ))}
              </View>
              <Spacer position="top" size="large">
                <Spacer position="bottom" size="medium">
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="title"
                    width="100%">
                    Basics
                  </Text>
                </Spacer>
              </Spacer>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: 8,
                  marginVertical: 5,
                  flexWrap: "wrap",
                }}>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 8 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName={iconNamePerGender}
                      IconComponent={MaterialCommunityIcons}
                      size={15}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    transform="capitalize"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.gender}
                  </Text>
                </View>
                {data?.[0]?.friendRequestFrom?.zodiac && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View
                      style={{
                        position: "absolute",
                        top: 9,
                        left: 9,
                      }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName={`zodiac-${zodiacSign?.toLowerCase()}`}
                        IconComponent={MaterialCommunityIcons}
                        size={15}
                        color={theme.colors.brand.base}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: theme.spaceNumber[5] }}
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="caption"
                      width="100%">
                      {zodiacSign}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 11,
                      left: 9,
                      transform: [{ rotateZ: "145deg" }],
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="magnet"
                      IconComponent={Entypo}
                      size={10}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.sexualOrientation}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 10, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="flag"
                      IconComponent={Fontisto}
                      size={11}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.nationality}
                  </Text>
                </View>
                {data?.[0]?.friendRequestFrom?.tribe && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View style={{ position: "absolute", top: 10, left: 9 }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="praying-hands"
                        IconComponent={FontAwesome5}
                        size={10}
                        color={theme.colors.brand.base1}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="caption"
                      width="100%">
                      {data?.[0]?.friendRequestFrom?.tribe}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 12, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="praying-hands"
                      IconComponent={FontAwesome5}
                      size={8}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.religious}
                  </Text>
                </View>
                {data?.[0]?.friendRequestFrom?.jobtitle?.visibleOnProfile && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View
                      style={{
                        position: "absolute",
                        top: theme.spaceNumber[5],
                        left: 9,
                      }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="work"
                        IconComponent={MaterialIcons}
                        size={10}
                        color={theme.colors.brand.base1}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="caption"
                      width="100%">
                      {data?.[0]?.friendRequestFrom?.jobtitle?.job}
                    </Text>
                  </View>
                )}
                {data?.[0]?.friendRequestFrom?.workplace?.visibleOnProfile && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.black,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View style={{ position: "absolute", top: 11, left: 9 }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="work"
                        IconComponent={MaterialIcons}
                        size={10}
                        color={theme.colors.brand.base1}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="caption"
                      width="100%">
                      {data?.[0]?.friendRequestFrom?.workplace?.work}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 10, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="human-male-height"
                      IconComponent={MaterialCommunityIcons}
                      size={10}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.height
                      ?.replace("feet", "'")
                      ?.replace("inch", '"')}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumber[5],
                      left: 8,
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="dumbbell"
                      IconComponent={FontAwesome5}
                      size={8}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.lifestyleHabits?.gym}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="search"
                      IconComponent={Feather}
                      size={12}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 15 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.preference}
                  </Text>
                </View>
              </View>
              {data?.[0]?.friendRequestFrom?.locationVisibility && (
                <Fragment>
                  <Spacer position="top" size="large">
                    <Text
                      variant="custom"
                      colorType="base1"
                      fontType="montserratBold"
                      fontSize="title"
                      width="100%">
                      Location
                    </Text>
                  </Spacer>
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: theme.spaceNumber[3],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="location-pin"
                      IconComponent={Entypo}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                    <Text
                      style={{ marginLeft: 3 }}
                      variant="custom"
                      colorType="base6"
                      fontType="montserratBold"
                      fontSize="button">
                      {data?.[0]?.friendRequestFrom?.location}
                    </Text>
                  </View>
                </Fragment>
              )}
              {data?.[0]?.friendRequestFrom?.videoArray?.[0] ? (
                <Spacer
                  style={{ position: "relative" }}
                  position="top"
                  size="large">
                  <VideoPlayer
                    videoRef={videoRef}
                    url={data?.[0]?.friendRequestFrom?.videoArray?.[0]}
                    shouldPlay={false}
                    isLooping={true}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              ) : (
                <></>
              )}

              <Spacer
                style={{ position: "relative" }}
                position="top"
                size="large">
                <ImageViewer
                  style={{
                    width: "100%",
                    height: imageHeight,
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumberBy10[3],
                  }}
                  uri={data?.[0]?.friendRequestFrom?.mediaArray?.[1]}
                />
              </Spacer>

              <Spacer position="top" size="large">
                <Spacer position="bottom" size="medium">
                  <Text
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="title"
                    width="100%">
                    Interests
                  </Text>
                </Spacer>
              </Spacer>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: theme.spaceNumber[3],
                  marginVertical: 5,
                  flexWrap: "wrap",
                }}>
                {data?.[0]?.friendRequestFrom?.interestsArray?.map(
                  (word, idx) => {
                    const interestMapObject = getInterestMapObject(word);
                    if (
                      !interestMapObject?.family ||
                      !interestMapObject?.iconName
                    )
                      return;
                    return (
                      <View
                        key={idx}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: theme.colors.brand.black,
                          paddingVertical: theme.spaceNumber[3],
                          paddingRight: theme.spaceNumber[7],
                          paddingLeft: theme.spaceNumber[4],
                          borderRadius: theme.spaceNumberBy10[4],
                        }}>
                        <IconComponent
                          iconFunction={() => {}}
                          iconName={interestMapObject?.iconName}
                          IconComponent={interestMapObject?.family}
                          size={11}
                          color={theme.colors.brand.base}
                        />
                        <View style={{ marginLeft: theme.spaceNumber[1] }}>
                          <Text
                            key={idx}
                            variant="custom"
                            colorType="base1"
                            fontType="montserratRegular"
                            fontSize="caption"
                            width="100%">
                            {word}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                )}
              </View>
              {data?.[0]?.friendRequestFrom?.lifestyleHabits?.cannabis &&
                data?.[0]?.friendRequestFrom?.lifestyleHabits?.drink &&
                data?.[0]?.friendRequestFrom?.lifestyleHabits?.smoke && (
                  <Spacer position="top" size="large">
                    <Spacer position="bottom" size="medium">
                      <Text
                        variant="custom"
                        colorType="base1"
                        fontType="montserratRegular"
                        fontSize="title"
                        width="100%">
                        Vices
                      </Text>
                    </Spacer>
                  </Spacer>
                )}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: 8,
                  marginVertical: 5,
                  flexWrap: "wrap",
                }}>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: theme.spaceNumber[4],
                      left: 8,
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="cannabis"
                      IconComponent={FontAwesome5}
                      size={10}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.lifestyleHabits?.cannabis}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 8 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="glass-wine"
                      IconComponent={MaterialCommunityIcons}
                      size={12}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.lifestyleHabits?.drink}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.black,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 7, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="cigar"
                      IconComponent={MaterialCommunityIcons}
                      size={15}
                      color={theme.colors.brand.base1}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 15 }}
                    variant="custom"
                    colorType="base1"
                    fontType="montserratRegular"
                    fontSize="caption"
                    width="100%">
                    {data?.[0]?.friendRequestFrom?.lifestyleHabits?.smoke}
                  </Text>
                </View>
              </View>
              {data?.[0]?.friendRequestFrom?.videoArray?.[1] ? (
                <Spacer
                  style={{ position: "relative" }}
                  position="top"
                  size="large">
                  <VideoPlayer
                    videoRef={videoRef}
                    url={data?.[0]?.friendRequestFrom?.videoArray?.[1]}
                    shouldPlay={false}
                    isLooping={true}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              ) : (
                <></>
              )}
              {data?.[0]?.friendRequestFrom?.mediaArray?.[2] && (
                <Spacer position="top" size="xxsmall">
                  <ImageViewer
                    url={data?.[0]?.friendRequestFrom?.mediaArray?.[2]}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              )}
              {data?.[0]?.friendRequestFrom?.mediaArray?.[3] && (
                <Spacer position="top" size="xxsmall">
                  <ImageViewer
                    url={data?.[0]?.friendRequestFrom?.mediaArray?.[3]}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              )}
              {data?.[0]?.friendRequestFrom?.videoArray?.[2] ? (
                <Spacer
                  style={{ position: "relative" }}
                  position="top"
                  size="large">
                  <VideoPlayer
                    videoRef={videoRef}
                    url={data?.[0]?.friendRequestFrom?.videoArray?.[2]}
                    shouldPlay={false}
                    isLooping={true}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              ) : (
                <></>
              )}
              {data?.[0]?.friendRequestFrom?.mediaArray?.[4] && (
                <Spacer position="top" size="xxsmall">
                  <ImageViewer
                    url={data?.[0]?.friendRequestFrom?.mediaArray?.[4]}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              )}
              {data?.[0]?.friendRequestFrom?.mediaArray?.[5] && (
                <Spacer position="top" size="xxsmall">
                  <ImageViewer
                    url={data?.[0]?.friendRequestFrom?.mediaArray?.[5]}
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                  />
                </Spacer>
              )}
            </HorizontalPaddingSpace>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingBottom: theme.spaceNumberBy10[2],
                paddingTop: theme.spaceNumber[5],
                backgroundColor: theme.colors.brand.black,
              }}>
              {data?.[0]?.friendRequestFrom?.facebook?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(
                          data?.[0]?.friendRequestFrom?.facebook?.link
                        )
                      }
                      iconName="facebook"
                      IconComponent={Entypo}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.base1}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.friendRequestFrom?.instagram?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(
                          data?.[0]?.friendRequestFrom?.instagram?.link
                        )
                      }
                      iconName="instagram"
                      IconComponent={AntDesign}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.base1}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.friendRequestFrom?.snapchat?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(
                          data?.[0]?.friendRequestFrom?.snapchat?.link
                        )
                      }
                      iconName="snapchat"
                      IconComponent={Fontisto}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.base1}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.friendRequestFrom?.tiktok?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(
                          data?.[0]?.friendRequestFrom?.tiktok?.link
                        )
                      }
                      iconName="tiktok"
                      IconComponent={FontAwesome5}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.base1}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.friendRequestFrom?.playlist?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(
                          data?.[0]?.friendRequestFrom?.playlist?.link
                        )
                      }
                      iconName="playlist-music"
                      IconComponent={MaterialCommunityIcons}
                      size={theme.spaceNumberBy10[2]}
                      color={theme.colors.brand.base1}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
            </View>
          </ScrollView>
        )}
        {showAcceptConfirmCard && (
          <Spacer
            position="top"
            size="xxxlarge"
            style={{
              alignItems: "center",
              height: "100%",
            }}>
            <Spacer position="top" size="large">
              <Text
                variant="custom"
                colorType="base1"
                fontType="arimaMadurai"
                fontSize="h5">
                Voila !
              </Text>
            </Spacer>
            <View
              style={{
                height: `${theme.spaceNumberBy10[2]}%`,
                flexDirection: "row",
                marginTop: theme.spaceNumberBy10[3],
              }}>
              <ImageViewer
                url={currentUserData?.photo}
                style={{
                  height: theme.spaceNumberBy50[1],
                  width: theme.spaceNumberBy50[1],
                  resizeMode: "cover",
                  borderRadius: theme.spaceNumberBy50[1],
                  marginRight: -theme.spaceNumberBy10[3],
                }}
              />
              <ImageViewer
                url={otherUserData?.photo}
                style={{
                  height: theme.spaceNumberBy50[4],
                  width: theme.spaceNumberBy50[4],
                  resizeMode: "cover",
                  borderRadius: theme.spaceNumberBy50[3],
                  borderWidth: theme.spaceNumber[1],
                  borderColor: theme.colors.brand.black,
                }}
              />
            </View>
            <View
              style={{
                width: "70%",
                marginVertical: theme.spaceNumberBy10[3],
              }}>
              <Text
                style={{
                  textAlign: "center",
                }}
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="caption">
                {` It's time to embark on the adventure. Let's ask ${otherUserData?.name} about something interesting or you can just start with "Hello"`}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: theme.spaceNumberBy10[0],
              }}>
              <Button
                backgroundColor={theme.colors.brand.base}
                isBorder={false}
                borderColor="transparent"
                buttonFunction={routeToChatScreen}
                text="Say Hello 👋"
                textColor={theme.colors.brand.basewhite}
                width="80%"
              />
              <Button
                backgroundColor={theme.colors.brand.lightorange}
                isBorder={false}
                borderColor="transparent"
                buttonFunction={() => {
                  setIsRetrigger(true);
                  setInitiatorProfileData([]);
                  setShowInitiatorProfile(false);
                  const likeInitiatorProfileId = setTimeout(() => {
                    setShowAcceptConfirmCard(false);
                  }, 500);

                  return () => clearTimeout(likeInitiatorProfileId);
                }}
                text="Not now, will talk later"
                textColor={theme.colors.brand.base}
                width="80%"
              />
            </View>
          </Spacer>
        )}
      </View>
      {data?.length && !showAcceptConfirmCard ? (
        <CloseButton
          spaceBottom={theme.space[9]}
          style={{
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.5,
            shadowRadius: "5px",
            backgroundColor: theme.colors.brand.base,
            position: "absolute",
            marginLeft: theme.spaceNumberBy10[1],
          }}>
          <IconComponent
            iconFunction={handleDeclineLike}
            iconName="close-a"
            IconComponent={Fontisto}
            size={theme.spaceNumberBy10[1]}
            color={theme.colors.brand.basewhite}
          />
        </CloseButton>
      ) : (
        <></>
      )}
    </Modal>
  );
}
