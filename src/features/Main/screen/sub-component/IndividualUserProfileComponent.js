import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Pressable,
  View,
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

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import calculateAge from "../../../../utilities/calculateAge";
import firebase, { database } from "../../../../../config";
import { addToArrayField } from "../../../../utilities/updateFirestoreDatabaseField";
import { getZodiacSign } from "../../../../utilities/generateZodiac";
import { handleUrlPress } from "../../../../utilities/detectTextType";

export default function IndividualUserProfileComponent({
  fetchUsersData,
  phone,
  data,
  theme,
  scrollViewRef,
  setLikedUser,
  setIsYouLikedVisible,
  currentSwipeIndexIsLessThanAllUsersLength,
  index,
  setIndex,
  scrollToTop,
  currentUser,
  setIsRetrigger,
}) {
  const imageHeight = 450;
  const lastTap = useRef(0);
  const [refreshing, setRefreshing] = useState(false);
  const [doubleTapWarning, setDoubleTapWarning] = useState(false);

  let iconNamePerGender = "";
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (data?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  async function handleYouLikedAUser(profileLikedNumber) {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarning(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const likedUserNameAndPhoto = {
        name: data?.firstname,
        photo: data?.mediaArray?.[0],
      };
      setLikedUser(likedUserNameAndPhoto);
      setIsYouLikedVisible(true);

      // create match intend structure in firebase firestore
      database.collection("all-likes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likedBy: {
          ...currentUser,
        }, // the number who liked another profile
        profileLikedNumber: profileLikedNumber, // profile number that was liked
      });

      // add liked profile number to list-of-all-liked-numbers in current user profile object
      await addToArrayField(
        "all-users",
        currentUser?.id,
        "listOfAllLikedNumbers",
        data?.phonenumber,
        setIsRetrigger
      );

      // add current user number (like initiator) to liked-me-list in other user profile object
      await addToArrayField(
        "all-users",
        data?.id,
        "likedMeList",
        currentUser?.phonenumber,
        setIsRetrigger
      );

      currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1);
      scrollToTop();
    } else {
      setDoubleTapWarning(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate data fetching delay
    setTimeout(() => {
      // Update data
      fetchUsersData(phone);

      setRefreshing(false);
    }, 1000);
  }, []);

  const zodiacSign = getZodiacSign(+data?.dob?.day, +data?.dob?.month);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          tintColor={theme.colors.brand.base}
          titleColor={theme.colors.brand.base}
          title="Refreshing..."
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: theme.spaceNumberBy10[5] }}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "relative",
          }}>
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
              borderBottomRightRadius: theme.spaceNumberBy50[3],
            }}
            source={{
              uri: `${data?.mediaArray?.[0]}`,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: theme.spaceNumber[5],
              left: theme.spaceNumber[5],
            }}>
            <Text
              style={{
                textShadowColor: theme.colors.brand.black,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 7,
              }}
              variant="custom"
              colorType="basewhite"
              fontType="playfairbold"
              fontSize="h2"
              width="100%">
              {data?.firstname},{" "}
              {calculateAge(data?.dob?.year, data?.dob?.month, data?.dob?.day)}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: -theme.spaceNumber[2],
              left: theme.spaceNumber[0],
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
              padding: theme.spaceNumberBy10[0],
            }}>
            {doubleTapWarning && (
              <View
                style={{
                  marginRight: -theme.spaceNumberBy10[4],
                  marginBottom: -theme.spaceNumber[3],
                }}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="caption">
                  double tap
                </Text>
              </View>
            )}
            <Pressable>
              <IconComponent
                iconFunction={() => handleYouLikedAUser(data?.phonenumber)}
                iconName="heart"
                IconComponent={MaterialCommunityIcons}
                size={50}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </View>
        </View>
        {data?.bio && (
          <Spacer position="bottom" size="large">
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
                {data?.bio}
              </Text>
            </Spacer>
          </Spacer>
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 8 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.gender}
            </Text>
          </View>
          {data?.zodiac && (
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
                  color={theme.colors.brand.black}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 8 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.sexualOrientation}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 8 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.nationality}
            </Text>
          </View>
          {data?.tribe && (
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
                  iconName="origin"
                  IconComponent={Fontisto}
                  size={14}
                  color={theme.colors.brand.black}
                />
              </View>
              <Text
                style={{ marginLeft: 8 }}
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="button"
                width="100%">
                {data?.tribe}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 10 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.religious}
            </Text>
          </View>
          {data?.jobtitle?.visibleOnProfile && (
            <View
              style={{
                backgroundColor: theme.colors.brand.highlight,
                paddingVertical: theme.spaceNumber[3],
                paddingHorizontal: theme.spaceNumber[7],
                borderRadius: theme.spaceNumberBy10[4],
              }}>
              <View style={{ position: "absolute", top: 11, left: 9 }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="work"
                  IconComponent={MaterialIcons}
                  size={12}
                  color={theme.colors.brand.black}
                />
              </View>
              <Text
                style={{ marginLeft: 10 }}
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="button"
                width="100%">
                {data?.jobtitle?.job}
              </Text>
            </View>
          )}
          {data?.workplace?.visibleOnProfile && (
            <View
              style={{
                backgroundColor: theme.colors.brand.highlight,
                paddingVertical: theme.spaceNumber[3],
                paddingHorizontal: theme.spaceNumber[7],
                borderRadius: theme.spaceNumberBy10[4],
              }}>
              <View style={{ position: "absolute", top: 11, left: 9 }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="home-work"
                  IconComponent={MaterialIcons}
                  size={12}
                  color={theme.colors.brand.black}
                />
              </View>
              <Text
                style={{ marginLeft: 10 }}
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="button"
                width="100%">
                {data?.workplace?.work}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 10 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.height?.replace("feet", "'")?.replace("inch", '"')}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 8 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.lifestyleHabits?.gym}
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
                color={theme.colors.brand.black}
              />
            </View>
            <Text
              style={{ marginLeft: 15 }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.preference}
            </Text>
          </View>
        </View>
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
            color={theme.colors.brand.black}
          />
          <Text
            style={{ marginLeft: 3 }}
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="button">
            {data?.location}
          </Text>
        </View>
      </View>
      <Spacer style={{ position: "relative" }} position="top" size="large">
        <Image
          style={{
            width: "100%",
            height: imageHeight,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{
            uri: `${data?.mediaArray?.[1]}`,
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
          Vices
        </Text>
      </Spacer>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: theme.spaceNumber[3],
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
              size={13}
              color={theme.colors.brand.black}
            />
          </View>
          <Text
            style={{ marginLeft: 10 }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.lifestyleHabits?.cannabis}
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
              color={theme.colors.brand.black}
            />
          </View>
          <Text
            style={{ marginLeft: 8 }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.lifestyleHabits?.drink}
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
              color={theme.colors.brand.black}
            />
          </View>
          <Text
            style={{ marginLeft: 15 }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.lifestyleHabits?.smoke}
          </Text>
        </View>
      </View>
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
            width="100%">
            {data?.whatThreeWordsDescribeYou?.firstword}
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
            width="100%">
            {data?.whatThreeWordsDescribeYou?.secondword}
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
            width="100%">
            {data?.whatThreeWordsDescribeYou?.thirdword}
          </Text>
        </View>
      </View>

      {data?.mediaArray?.[2] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderTopRightRadius: 5,
              borderTopLeftRadius: theme.spaceNumberBy10[10],
            }}
            source={{
              uri: `${data?.mediaArray?.[2]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[3] && (
        <Spacer position="top" size="">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: theme.spaceNumberBy10[10],
            }}
            source={{
              uri: `${data?.mediaArray?.[3]}`,
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
        {data?.interestsArray?.map((word, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: theme.colors.brand.highlight,
              paddingVertical: theme.spaceNumber[3],
              paddingHorizontal: theme.spaceNumber[7],
              borderRadius: theme.spaceNumberBy10[4],
            }}>
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
        ))}
      </View>
      {data?.mediaArray?.[4] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderTopRightRadius: 5,
              borderTopLeftRadius: theme.spaceNumberBy10[10],
            }}
            source={{
              uri: `${data?.mediaArray?.[4]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[5] && (
        <Spacer position="top" size="">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: theme.spaceNumberBy10[10],
            }}
            source={{
              uri: `${data?.mediaArray?.[5]}`,
            }}
          />
        </Spacer>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "70%",
          alignSelf: "flex-end",
          paddingBottom: theme.spaceNumberBy10[1],
          paddingTop: theme.spaceNumber[3],
        }}>
        {data?.facebook?.visibleOnProfile && (
          <Pressable>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.facebook?.link)}
              iconName="facebook"
              IconComponent={Entypo}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </Pressable>
        )}
        {data?.instagram?.visibleOnProfile && (
          <Pressable>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.instagram?.link)}
              iconName="instagram"
              IconComponent={AntDesign}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </Pressable>
        )}
        {data?.snapchat?.visibleOnProfile && (
          <Pressable>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.snapchat?.link)}
              iconName="snapchat"
              IconComponent={Fontisto}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </Pressable>
        )}
        {data?.tiktok?.visibleOnProfile && (
          <Pressable>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.tiktok?.link)}
              iconName="tiktok"
              IconComponent={FontAwesome5}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </Pressable>
        )}
        {data?.playlist?.visibleOnProfile && (
          <Pressable>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.playlist?.link)}
              iconName="playlist-music"
              IconComponent={MaterialCommunityIcons}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.brandFade}
            />
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}
