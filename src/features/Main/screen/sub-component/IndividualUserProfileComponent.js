import React, { Fragment, useCallback, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
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

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { getZodiacSign } from "../../../../utilities/generateZodiac";
import { handleUrlPress } from "../../../../utilities/detectTextType";
import getInterestMapObject from "../../../../utilities/getInterestMapObject";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";

export default function IndividualUserProfileComponent({
  fetchUsersData,
  phone,
  data,
  theme,
  scrollViewRef,
}) {
  const imageHeight = 400;
  const [refreshing, setRefreshing] = useState(false);

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
      style={{
        borderRadius: theme.spaceNumberBy50[0],
      }}>
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "relative",
          }}>
          <Image
            style={{
              width: "100%",
              height: imageHeight + 310,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[0]}`,
            }}
          />
        </View>
        {data?.bio && (
          <Spacer position="bottom" size="large">
            <HorizontalPaddingSpace space={theme.space[2]}>
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
            </HorizontalPaddingSpace>
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
                {data?.sexualOrientation}
              </Text>
            </View>
            {data?.nationality && (
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
                  {data?.nationality}
                </Text>
              </View>
            )}
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
                {data?.preference}
              </Text>
            </View>
          </View>
          {data?.locationVisibility && (
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
                  {data?.location}
                </Text>
              </View>
            </Fragment>
          )}
        </HorizontalPaddingSpace>
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
      <HorizontalPaddingSpace space={theme.space[2]}>
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
          {data?.interestsArray?.map((word, idx) => {
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
              {data?.lifestyleHabits?.smoke}
            </Text>
          </View>
        </View>
      </HorizontalPaddingSpace>
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
              transform="capitalize"
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
              transform="capitalize"
              width="100%">
              {data?.whatThreeWordsDescribeYou?.thirdword}
            </Text>
          </View>
        </View>
      </HorizontalPaddingSpace>
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
          alignSelf: "flex-end",
          paddingBottom: theme.spaceNumberBy10[1],
          paddingTop: theme.spaceNumber[3],
          marginRight: theme.spaceNumber[3],
        }}>
        {data?.facebook?.visibleOnProfile && (
          <TouchableOpacity>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.facebook?.link)}
              iconName="facebook"
              IconComponent={Entypo}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        )}
        {data?.instagram?.visibleOnProfile && (
          <TouchableOpacity style={{ marginLeft: theme.spaceNumberBy10[2] }}>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.instagram?.link)}
              iconName="instagram"
              IconComponent={AntDesign}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        )}
        {data?.snapchat?.visibleOnProfile && (
          <TouchableOpacity style={{ marginLeft: theme.spaceNumberBy10[2] }}>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.snapchat?.link)}
              iconName="snapchat"
              IconComponent={Fontisto}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        )}
        {data?.tiktok?.visibleOnProfile && (
          <TouchableOpacity style={{ marginLeft: theme.spaceNumberBy10[2] }}>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.tiktok?.link)}
              iconName="tiktok"
              IconComponent={FontAwesome5}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        )}
        {data?.playlist?.visibleOnProfile && (
          <TouchableOpacity style={{ marginLeft: theme.spaceNumberBy10[2] }}>
            <IconComponent
              iconFunction={() => handleUrlPress(data?.playlist?.link)}
              iconName="playlist-music"
              IconComponent={MaterialCommunityIcons}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
