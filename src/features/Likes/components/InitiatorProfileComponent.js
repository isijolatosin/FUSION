import React, { useRef, useState, Fragment } from "react";
import {
  Image,
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
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FlatGrid } from "react-native-super-grid";
import Button from "../../../components/utility/button.component";
import { getZodiacSign } from "../../../utilities/generateZodiac";
import { handleUrlPress } from "../../../utilities/detectTextType";
import getInterestMapObject from "../../../utilities/getInterestMapObject";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function InitiatorProfileComponent({
  data,
  theme,
  bothUserData,
  setBothUserData,
  setShowInitiatorProfile,
  setInitiatorProfileData,
  currentUser,
  setIsRetrigger,
}) {
  const navigation = useNavigation();
  const imageHeight = 450;
  const lastTap = useRef(0);
  const [doubleTapWarning, setDoubleTapWarnings] = useState(false);

  let iconNamePerGender = "";
  if (data?.[0]?.likedBy?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (data?.[0]?.likedBy?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (data?.[0]?.likedBy?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  async function handleLikeInitiatorProfile() {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarnings(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const likedUserNameAndPhoto = {
        name: data?.[0]?.likedBy?.firstname,
        photo: data?.[0]?.likedBy?.mediaArray?.[0],
      };
      const currentUserrNameAndPhoto = {
        name: currentUser?.firstname,
        photo: currentUser?.mediaArray?.[0],
      };
      setBothUserData([likedUserNameAndPhoto, currentUserrNameAndPhoto]);

      // Create match data
      const likedByprofile = {
        id: data?.[0]?.likedBy?.id,
        phonenumber: data?.[0]?.likedBy?.phonenumber,
      };
      const likedProfile = {
        id: currentUser?.id,
        phonenumber: currentUser?.phonenumber,
      };
      database
        .collection("matches")
        .add({
          likedByprofile,
          likedProfile,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log(`MATCH CREATED SUCCESSFULLY`);
        })
        .catch((error) => console.log("Error " + error.message));

      //Remove current like initiation object from all like array list in database
      await removeDocumentFromCollections(
        "all-likes",
        data?.[0]?.id,
        setIsRetrigger
      );

      setInitiatorProfileData([]);
    } else {
      setDoubleTapWarnings(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  function handleDeclineLike() {
    const likeId = data?.[0]?.id;
    const docRef = database.collection("all-likes").doc(likeId);
    docRef
      .delete()
      .then(() => {
        console.log("Like successfully deleted!");
      })
      .catch((error) => {
        console.error("Error deleting like: ", error);
      });

    removeItemFromArray(
      "all-users",
      data?.[0]?.likedBy?.id,
      "listOfAllLikedNumbers",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      data?.[0]?.likedBy?.id,
      "likedMeList",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "listOfAllLikedNumbers",
      data?.[0]?.likedBy?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "likedMeList",
      data?.[0]?.likedBy?.phonenumber,
      () => {}
    );

    setIsRetrigger(true);
    setShowInitiatorProfile(false);
  }

  const currentUserData = bothUserData[1];
  const otherUserData = bothUserData[0];

  function routeToChatScreen() {
    setShowInitiatorProfile(false);
    navigation.navigate("chat");
  }

  const zodiacSign = getZodiacSign(
    +data?.[0]?.likedBy?.dob?.day,
    +data?.[0]?.likedBy?.dob?.month
  );

  return (
    <Modal
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{
        backgroundColor: theme.colors.brand.basewhite,
        margin: 0,
        position: "relative",
        alignItems: "flex-end",
        paddingBottom: theme.spaceNumberBy10[0],
      }}>
      {data?.length ? (
        <View
          style={{ marginTop: theme.spaceNumberBy50[0], position: "relative" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => setShowInitiatorProfile(false)}
              style={{ marginTop: theme.spaceNumberBy10[1] }}>
              <IconComponent
                iconFunction={() => setShowInitiatorProfile(false)}
                iconName="keyboard-arrow-left"
                IconComponent={MaterialIcons}
                size={theme.spaceNumberBy10[3]}
                color={theme.colors.brand.base}
              />
            </Pressable>
            <View style={{ flex: 0.9 }}>
              <HeaderComponent
                textWidth="98%"
                title={`${data?.[0]?.likedBy?.firstname}, ${calculateAge(
                  data?.[0]?.likedBy?.dob?.year,
                  data?.[0]?.likedBy?.dob?.month,
                  data?.[0]?.likedBy?.dob?.day
                )}`}
                theme={theme}
                LeftComp={() => <></>}
                RightComp={() => <></>}
              />
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: theme.spaceNumberBy10[5] + 3 }}>
            <HorizontalPaddingSpace space={theme.space[2]}>
              <View style={{ position: "relative" }}>
                <Image
                  style={{
                    width: "100%",
                    height: imageHeight,
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumberBy10[3],
                  }}
                  source={{
                    uri: `${data?.[0]?.likedBy?.mediaArray?.[0]}`,
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
                    onPress={handleLikeInitiatorProfile}
                    style={{
                      backgroundColor: theme.colors.brand.basewhite,
                      borderRadius: theme.spaceNumberBy10[2],
                      padding: theme.spaceNumber[3],
                    }}>
                    <IconComponent
                      iconFunction={() => handleLikeInitiatorProfile()}
                      iconName="heart"
                      IconComponent={MaterialCommunityIcons}
                      size={35}
                      color={theme.colors.brand.base}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {data?.[0]?.likedBy?.bio && (
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
                      borderColor: theme.colors.brand.brandFadeLighter,
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
                      {data?.[0]?.likedBy?.bio}
                    </Text>
                  </Spacer>
                </Fragment>
              )}
              <Spacer position="top" size="medium">
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="title"
                  width="100%">
                  My Basics
                </Text>
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
                  <View style={{ position: "absolute", top: 8, left: 8 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName={iconNamePerGender}
                      IconComponent={MaterialCommunityIcons}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    transform="capitalize"
                    width="100%">
                    {data?.[0]?.likedBy?.gender}
                  </Text>
                </View>
                {data?.[0]?.likedBy?.zodiac && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.highlight,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View
                      style={{
                        position: "absolute",
                        top: 10,
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
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="button"
                      width="100%">
                      {zodiacSign}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 9,
                      transform: [{ rotateZ: "145deg" }],
                    }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="magnet"
                      IconComponent={Entypo}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.sexualOrientation}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="flag"
                      IconComponent={Fontisto}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.nationality}
                  </Text>
                </View>
                {data?.[0]?.likedBy?.tribe && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.highlight,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View style={{ position: "absolute", top: 10.5, left: 10 }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="praying-hands"
                        IconComponent={FontAwesome5}
                        size={10}
                        color={theme.colors.brand.base}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="button"
                      width="100%">
                      {data?.[0]?.likedBy?.tribe}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 10.5, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="praying-hands"
                      IconComponent={FontAwesome5}
                      size={10}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.religious}
                  </Text>
                </View>
                {data?.[0]?.likedBy?.jobtitle?.visibleOnProfile && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.highlight,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View style={{ position: "absolute", top: 9, left: 9 }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="work"
                        IconComponent={MaterialIcons}
                        size={12}
                        color={theme.colors.brand.base}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="button"
                      width="100%">
                      {data?.[0]?.likedBy?.jobtitle?.job}
                    </Text>
                  </View>
                )}
                {data?.[0]?.likedBy?.workplace?.visibleOnProfile && (
                  <View
                    style={{
                      backgroundColor: theme.colors.brand.highlight,
                      paddingVertical: theme.spaceNumber[3],
                      paddingHorizontal: theme.spaceNumber[7],
                      borderRadius: theme.spaceNumberBy10[4],
                    }}>
                    <View style={{ position: "absolute", top: 9, left: 9 }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="work"
                        IconComponent={MaterialIcons}
                        size={12}
                        color={theme.colors.brand.base}
                      />
                    </View>
                    <Text
                      style={{ marginLeft: 10 }}
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="button"
                      width="100%">
                      {data?.[0]?.likedBy?.workplace?.work}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 9 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="human-male-height"
                      IconComponent={MaterialCommunityIcons}
                      size={12}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.height
                      ?.replace("feet", "'")
                      ?.replace("inch", '"')}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
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
                      size={10}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.lifestyleHabits?.gym}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <View style={{ position: "absolute", top: 9, left: 10 }}>
                    <IconComponent
                      iconFunction={() => {}}
                      iconName="search"
                      IconComponent={Feather}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 15 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.preference}
                  </Text>
                </View>
              </View>
              {data?.[0]?.likedBy?.locationVisibility && (
                <Fragment>
                  <Spacer position="top" size="medium">
                    <Text
                      variant="custom"
                      colorType="black"
                      fontType="montserratBold"
                      fontSize="title"
                      width="100%">
                      My Location
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
                      colorType="black"
                      fontType="montserratBold"
                      fontSize="button">
                      {data?.[0]?.likedBy?.location}
                    </Text>
                  </View>
                </Fragment>
              )}

              <Spacer
                style={{ position: "relative" }}
                position="top"
                size="large">
                <Image
                  style={{
                    width: "100%",
                    height: imageHeight,
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumberBy10[3],
                  }}
                  source={{
                    uri: `${data?.[0]?.likedBy?.mediaArray?.[1]}`,
                  }}
                />
              </Spacer>

              <Spacer position="top" size="medium">
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="title"
                  width="100%">
                  My Interests
                </Text>
              </Spacer>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: theme.spaceNumber[3],
                  marginVertical: 5,
                  flexWrap: "wrap",
                }}>
                {data?.[0]?.likedBy?.interestsArray?.map((word, idx) => {
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
                        backgroundColor: theme.colors.brand.highlight,
                        paddingVertical: theme.spaceNumber[3],
                        paddingRight: theme.spaceNumber[7],
                        paddingLeft: theme.spaceNumber[4],
                        borderRadius: theme.spaceNumberBy10[4],
                      }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName={interestMapObject?.iconName}
                        IconComponent={interestMapObject?.family}
                        size={14}
                        color={theme.colors.brand.base}
                      />
                      <View style={{ marginLeft: theme.spaceNumber[1] }}>
                        <Text
                          key={idx}
                          variant="custom"
                          colorType="black"
                          fontType="montserratRegular"
                          fontSize="button"
                          width="100%">
                          {word}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <Spacer position="top" size="medium">
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="title"
                  width="100%">
                  Vices
                </Text>
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
                      size={17}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 10 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.lifestyleHabits?.cannabis}
                  </Text>
                </View>
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
                      iconName="glass-wine"
                      IconComponent={MaterialCommunityIcons}
                      size={15}
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 8 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.lifestyleHabits?.drink}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
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
                      color={theme.colors.brand.base}
                    />
                  </View>
                  <Text
                    style={{ marginLeft: 15 }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {data?.[0]?.likedBy?.lifestyleHabits?.smoke}
                  </Text>
                </View>
              </View>
              {data?.[0]?.likedBy?.mediaArray?.[2] && (
                <Spacer position="top" size="xxsmall">
                  <Image
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                    source={{
                      uri: `${data?.[0]?.likedBy?.mediaArray?.[2]}`,
                    }}
                  />
                </Spacer>
              )}
              {data?.[0]?.likedBy?.mediaArray?.[3] && (
                <Spacer position="top" size="xxsmall">
                  <Image
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                    source={{
                      uri: `${data?.[0]?.likedBy?.mediaArray?.[3]}`,
                    }}
                  />
                </Spacer>
              )}

              <Spacer position="top" size="medium">
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="title"
                  width="100%">
                  Me in Three Words
                </Text>
              </Spacer>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: theme.spaceNumber[3],
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    transform="capitalize"
                    width="100%">
                    {data?.[0]?.likedBy?.whatThreeWordsDescribeYou?.firstword}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    transform="capitalize"
                    width="100%">
                    {data?.[0]?.likedBy?.whatThreeWordsDescribeYou?.secondword}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    transform="capitalize"
                    width="100%">
                    {data?.[0]?.likedBy?.whatThreeWordsDescribeYou?.thirdword}
                  </Text>
                </View>
              </View>
              {data?.[0]?.likedBy?.mediaArray?.[4] && (
                <Spacer position="top" size="xxsmall">
                  <Image
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                    source={{
                      uri: `${data?.[0]?.likedBy?.mediaArray?.[4]}`,
                    }}
                  />
                </Spacer>
              )}
              {data?.[0]?.likedBy?.mediaArray?.[5] && (
                <Spacer position="top" size="xxsmall">
                  <Image
                    style={{
                      width: "100%",
                      height: imageHeight,
                      resizeMode: "cover",
                      borderRadius: theme.spaceNumberBy10[3],
                    }}
                    source={{
                      uri: `${data?.[0]?.likedBy?.mediaArray?.[5]}`,
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
                paddingTop: theme.spaceNumber[3],
                backgroundColor: theme.colors.brand.highlight,
                borderTopLeftRadius: theme.spaceNumberBy10[3],
                borderTopRightRadius: theme.spaceNumberBy10[3],
              }}>
              {data?.[0]?.likedBy?.facebook?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(data?.[0]?.likedBy?.facebook?.link)
                      }
                      iconName="facebook"
                      IconComponent={Entypo}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.brandFade}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.likedBy?.instagram?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(data?.[0]?.likedBy?.instagram?.link)
                      }
                      iconName="instagram"
                      IconComponent={AntDesign}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.brandFade}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.likedBy?.snapchat?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(data?.[0]?.likedBy?.snapchat?.link)
                      }
                      iconName="snapchat"
                      IconComponent={Fontisto}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.brandFade}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.likedBy?.tiktok?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(data?.[0]?.likedBy?.tiktok?.link)
                      }
                      iconName="tiktok"
                      IconComponent={FontAwesome5}
                      size={theme.spaceNumberBy10[1]}
                      color={theme.colors.brand.brandFade}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
              {data?.[0]?.likedBy?.playlist?.visibleOnProfile && (
                <HorizontalPaddingSpace space={theme.space[4]}>
                  <Pressable>
                    <IconComponent
                      iconFunction={() =>
                        handleUrlPress(data?.[0]?.likedBy?.playlist?.link)
                      }
                      iconName="playlist-music"
                      IconComponent={MaterialCommunityIcons}
                      size={theme.spaceNumberBy10[2]}
                      color={theme.colors.brand.brandFade}
                    />
                  </Pressable>
                </HorizontalPaddingSpace>
              )}
            </View>
          </ScrollView>
        </View>
      ) : (
        <SafeArea
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Spacer position="top" size="large">
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h5">
              It's a match
            </Text>
          </Spacer>
          <View
            style={{
              height: `${theme.spaceNumberBy10[2]}%`,
              flexDirection: "row",
              marginTop: theme.spaceNumberBy10[3],
            }}>
            <Image
              style={{
                height: theme.spaceNumberBy50[1],
                width: theme.spaceNumberBy50[1],
                resizeMode: "cover",
                borderRadius: theme.spaceNumberBy50[1],
                marginRight: -theme.spaceNumberBy10[3],
              }}
              source={{
                uri: `${otherUserData?.photo}`,
              }}
            />
            <Image
              style={{
                height: theme.spaceNumberBy50[4],
                width: theme.spaceNumberBy50[4],
                resizeMode: "cover",
                borderRadius: theme.spaceNumberBy50[3],
                borderWidth: theme.spaceNumber[4],
                borderColor: theme.colors.brand.basewhite,
              }}
              source={{
                uri: `${currentUserData?.photo}`,
              }}
            />
          </View>
          <View
            style={{ width: "70%", marginVertical: theme.spaceNumberBy10[1] }}>
            <Text
              style={{
                textAlign: "center",
              }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption">
              {` It's time to embark on the adventure. Let's ask ${otherUserData?.name} about
              something interesting or you can just start with "Hello"`}
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
                const likeInitiatorProfileId = setTimeout(() => {
                  setShowInitiatorProfile(false);
                }, 500);

                return () => clearTimeout(likeInitiatorProfileId);
              }}
              text="Not now, will talk later"
              textColor={theme.colors.brand.base}
              width="80%"
            />
          </View>
        </SafeArea>
      )}
      {data?.length ? (
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
