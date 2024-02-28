import { Image, Pressable, ScrollView, View } from "react-native";
import React, { Fragment } from "react";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";

import { Text } from "../typography/text.component";
import IconComponent from "../icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { Spacer } from "../spacer/spacer.component";
import calculateAge from "../../utilities/calculateAge";
import { getZodiacSign } from "../../utilities/generateZodiac";
import { handleUrlPress } from "../../utilities/detectTextType";
import getInterestMapObject from "../../utilities/getInterestMapObject";

export default function ProfileViewModal({
  otherUser,
  theme,
  setShowProfile,
  width,
}) {
  let iconNamePerGender = "";
  if (otherUser?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (otherUser?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (otherUser?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  const zodiacSign = getZodiacSign(
    +otherUser?.dob?.day,
    +otherUser?.dob?.month
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{
            width: "100%",
            height: 700,
            resizeMode: "cover",
          }}
          source={{
            uri: `${otherUser?.mediaArray?.[0]}`,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            top: theme.spaceNumberBy10[6],
            paddingHorizontal: theme.spaceNumberBy10[1],
            width: width,
          }}>
          <View>
            <Text
              style={{
                textShadowColor: theme.colors.brand.black,
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 7,
              }}
              variant="custom"
              colorType="basewhite"
              fontType="arimaMadurai"
              fontSize="h2"
              width="100%">
              {otherUser?.firstname},{" "}
              {calculateAge(
                otherUser?.dob?.year,
                otherUser?.dob?.month,
                otherUser?.dob?.day
              )}
            </Text>
          </View>
          <Pressable
            onPress={() => setShowProfile(false)}
            style={{
              backgroundColor: theme.colors.brand.basewhite,
              width: theme.spaceNumberBy10[3],
              height: theme.spaceNumberBy10[3],
              borderRadius: theme.spaceNumberBy50[1],
              alignItems: "center",
              justifyContent: "center",
            }}>
            <IconComponent
              iconFunction={() => setShowProfile(false)}
              iconName="close-a"
              IconComponent={Fontisto}
              size={15}
              color={theme.colors.brand.base}
            />
          </Pressable>
        </View>
      </View>
      <HorizontalPaddingSpace space={theme.space[2]}>
        {otherUser?.bio && (
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
                {otherUser?.bio}
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
          {otherUser?.gender && (
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
                width="100%">
                {otherUser?.gender}
              </Text>
            </View>
          )}

          {otherUser?.zodiac && zodiacSign && (
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
          {otherUser?.sexualOrientation && (
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
                {otherUser?.sexualOrientation}
              </Text>
            </View>
          )}
          {otherUser?.nationality && (
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
                {otherUser?.nationality}
              </Text>
            </View>
          )}
          {otherUser?.tribe && (
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
                {otherUser?.tribe}
              </Text>
            </View>
          )}
          {otherUser?.religious && (
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
                {otherUser?.religious}
              </Text>
            </View>
          )}
          {otherUser?.jobtitle?.visibleOnProfile && (
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
                  left: 9,
                }}>
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
                {otherUser?.jobtitle?.job}
              </Text>
            </View>
          )}
          {otherUser?.workplace?.visibleOnProfile && (
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
                {otherUser?.workplace?.work}
              </Text>
            </View>
          )}
          {otherUser?.height && (
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
                {otherUser?.height?.replace("feet", "'")?.replace("inch", '"')}
              </Text>
            </View>
          )}
          {otherUser?.lifestyleHabits?.gym && (
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
                {otherUser?.lifestyleHabits?.gym}
              </Text>
            </View>
          )}
          {otherUser?.preference && (
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
                {otherUser?.preference}
              </Text>
            </View>
          )}
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
            color={theme.colors.brand.base}
          />
          <Text
            style={{ marginLeft: 3 }}
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="button">
            {otherUser?.location}
          </Text>
        </View>
      </HorizontalPaddingSpace>
      <Spacer style={{ position: "relative" }} position="top" size="large">
        <Image
          style={{
            // width: "100%",
            height: 600,
            resizeMode: "cover",
          }}
          source={{
            uri: `${otherUser?.mediaArray?.[1]}`,
          }}
        />
      </Spacer>
      <HorizontalPaddingSpace space={theme.space[2]}>
        <Spacer position="bottom" size="medium">
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
          {otherUser?.interestsArray?.length && (
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: theme.spaceNumber[3],
                marginVertical: 5,
                flexWrap: "wrap",
              }}>
              {otherUser?.interestsArray?.map((word, idx) => {
                const interestMapObject = getInterestMapObject(word);
                if (!interestMapObject?.family || !interestMapObject?.iconName)
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
          )}
        </Spacer>
        <Spacer position="top" size="medium">
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="title"
            width="100%">
            My Vices
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
          {otherUser?.lifestyleHabits?.cannabis && (
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
                {otherUser?.lifestyleHabits?.cannabis}
              </Text>
            </View>
          )}
          {otherUser?.lifestyleHabits?.drink && (
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
                {otherUser?.lifestyleHabits?.drink}
              </Text>
            </View>
          )}
          {otherUser?.lifestyleHabits?.smoke && (
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
                {otherUser?.lifestyleHabits?.smoke}
              </Text>
            </View>
          )}
        </View>
      </HorizontalPaddingSpace>
      {otherUser?.mediaArray?.[2] && (
        <Spacer position="top" size="xxsmall">
          <Image
            style={{
              width: "100%",
              height: 600,
              resizeMode: "cover",
            }}
            source={{
              uri: `${otherUser?.mediaArray?.[2]}`,
            }}
          />
        </Spacer>
      )}
      {otherUser?.mediaArray?.[3] && (
        <Spacer position="top" size="xxsmall">
          <Image
            style={{
              width: "100%",
              height: 600,
              resizeMode: "cover",
            }}
            source={{
              uri: `${otherUser?.mediaArray?.[3]}`,
            }}
          />
        </Spacer>
      )}
      <HorizontalPaddingSpace space={theme.space[2]}>
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
        {Object.keys(otherUser?.whatThreeWordsDescribeYou)?.length && (
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
                {otherUser?.whatThreeWordsDescribeYou?.firstword}
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
                {otherUser?.whatThreeWordsDescribeYou?.secondword}
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
                {otherUser?.whatThreeWordsDescribeYou?.thirdword}
              </Text>
            </View>
          </View>
        )}
      </HorizontalPaddingSpace>
      {otherUser?.mediaArray?.[4] && (
        <Spacer position="top" size="xxsmall">
          <Image
            style={{
              width: "100%",
              height: 600,
              resizeMode: "cover",
            }}
            source={{
              uri: `${otherUser?.mediaArray?.[4]}`,
            }}
          />
        </Spacer>
      )}

      {otherUser?.mediaArray?.[5] && (
        <Spacer position="top" size="xxsmall">
          <Image
            style={{
              width: "100%",
              height: 600,
              resizeMode: "cover",
            }}
            source={{
              uri: `${otherUser?.mediaArray?.[5]}`,
            }}
          />
        </Spacer>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingBottom: theme.spaceNumberBy10[2],
          paddingTop: theme.spaceNumber[3],
          backgroundColor: theme.colors.brand.highlight,
        }}>
        {otherUser?.facebook?.visibleOnProfile && (
          <HorizontalPaddingSpace space={theme.space[4]}>
            <Pressable>
              <IconComponent
                iconFunction={() => handleUrlPress(otherUser?.facebook?.link)}
                iconName="facebook"
                IconComponent={Entypo}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </HorizontalPaddingSpace>
        )}
        {otherUser?.instagram?.visibleOnProfile && (
          <HorizontalPaddingSpace space={theme.space[4]}>
            <Pressable>
              <IconComponent
                iconFunction={() => handleUrlPress(otherUser?.instagram?.link)}
                iconName="instagram"
                IconComponent={AntDesign}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </HorizontalPaddingSpace>
        )}
        {otherUser?.snapchat?.visibleOnProfile && (
          <HorizontalPaddingSpace space={theme.space[4]}>
            <Pressable>
              <IconComponent
                iconFunction={() => handleUrlPress(otherUser?.snapchat?.link)}
                iconName="snapchat"
                IconComponent={Fontisto}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </HorizontalPaddingSpace>
        )}
        {otherUser?.tiktok?.visibleOnProfile && (
          <HorizontalPaddingSpace space={theme.space[4]}>
            <Pressable>
              <IconComponent
                iconFunction={() => handleUrlPress(otherUser?.tiktok?.link)}
                iconName="tiktok"
                IconComponent={FontAwesome5}
                size={theme.spaceNumberBy10[1]}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </HorizontalPaddingSpace>
        )}
        {otherUser?.playlist?.visibleOnProfile && (
          <HorizontalPaddingSpace space={theme.space[4]}>
            <Pressable>
              <IconComponent
                iconFunction={() => handleUrlPress(otherUser?.playlist?.link)}
                iconName="playlist-music"
                IconComponent={MaterialCommunityIcons}
                size={theme.spaceNumberBy10[2]}
                color={theme.colors.brand.base}
              />
            </Pressable>
          </HorizontalPaddingSpace>
        )}
      </View>
    </ScrollView>
  );
}
