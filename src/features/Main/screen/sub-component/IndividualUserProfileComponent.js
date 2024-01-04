import React, { useCallback, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import calculateAge from "../../../../utilities/calculateAge";
import firebase, { database } from "../../../../../config";
import { addToArrayField } from "../../../../utilities/updateFirestoreDatabaseField";

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
      style={{ marginBottom: 100 }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{
            width: "100%",
            height: imageHeight,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{
            uri: `${data?.mediaArray?.[0]}`,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: theme.spaceNumberBy10[6],
            left: theme.spaceNumberBy10[0],
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.8,
            shadowRadius: theme.sizes[0],
          }}>
          <Text variant="headingWhiteSlim" width="100%">
            {data?.firstname},{" "}
            {calculateAge(data?.dob?.year, data?.dob?.month, data?.dob?.day)}
          </Text>
        </View>
        {doubleTapWarning && (
          <Text
            style={{
              position: "absolute",
              right: theme.spaceNumber[8],
              bottom: theme.spaceNumberBy10[6],
            }}
            variant="subHeading"
            colorType="white"
            fontType="montserratRegular"
            fontSize="caption">
            Double tap to like
          </Text>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            padding: theme.spaceNumberBy10[0],
          }}>
          <TouchableOpacity>
            <IconComponent
              iconFunction={() => handleYouLikedAUser(data?.phonenumber)}
              iconName="heart"
              IconComponent={MaterialCommunityIcons}
              size={60}
              color={theme.colors.brand.basewhite}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Spacer position="top" size="medium">
        <Text variant="bodyBoldBold" width="100%">
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
            variant="subHeading"
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
            variant="subHeading"
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
            variant="subHeading"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.whatThreeWordsDescribeYou?.thirdword}
          </Text>
        </View>
      </View>
      <Spacer position="top" size="medium">
        <Text variant="bodyBoldBold" width="100%">
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
              variant="subHeading"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {word}
            </Text>
          </View>
        ))}
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
        <Text variant="bodyBoldBold" width="100%">
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
            variant="subHeading"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.gender}
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
            variant="subHeading"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.country}
          </Text>
        </View>
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
            variant="subHeading"
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
            <View style={{ position: "absolute", top: 9, left: 9 }}>
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
              variant="subHeading"
              colorType="black"
              fontType="montserratRegular"
              fontSize="button"
              width="100%">
              {data?.jobtitle?.job}
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
            variant="subHeading"
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
            variant="subHeading"
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
            variant="subHeading"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button"
            width="100%">
            {data?.lifestyleHabits?.smoke}
          </Text>
        </View>
      </View>
      <Spacer position="top" size="medium">
        <Text variant="bodyBoldBold" width="100%">
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
        <Text style={{ marginLeft: 3 }} variant="popButton">
          {data?.address?.city}, {data?.address?.province}
        </Text>
      </View>
      {data?.mediaArray?.[2] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[2]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[3] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[3]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[4] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[4]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[5] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[5]}`,
            }}
          />
        </Spacer>
      )}
    </ScrollView>
  );
}
