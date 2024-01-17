import React, { useRef, useState } from "react";
import { Image, Modal, ScrollView, Pressable, View } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { database } from "../../../../config";
import { removeDocumentFromCollections } from "../../../utilities/updateFirestoreDatabaseField";
import calculateAge from "../../../utilities/calculateAge";
import { Text } from "../../../components/typography/text.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { CloseButton } from "../../Main/screen/main.style";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FlatGrid } from "react-native-super-grid";
import Button from "../../../components/utility/button.component";

export default function LikeInitiatorProfileComponent({
  data,
  theme,
  likedUserAndCurrentUserData,
  setLikedUserAndCurrentUserData,
  setShowLikeInitiatorProfile,
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
      setLikedUserAndCurrentUserData([
        likedUserNameAndPhoto,
        currentUserrNameAndPhoto,
      ]);

      // Create match data
      const likedByprofile = data?.[0]?.likedBy;
      const likedProfile = currentUser;
      database
        .collection("matches")
        .add({
          likedByprofile,
          likedProfile,
        })
        .then(() => {
          console.log(`MATCH CREATED SUCCESSFULLY`);
        })
        .catch((error) => console.log("Error " + error.message));

      //Remove current like initiation object from all like array list in database
      removeDocumentFromCollections("all-likes", data?.[0]?.id, setIsRetrigger);

      setInitiatorProfileData([]);
    } else {
      setDoubleTapWarnings(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
  }

  const currentUserData = likedUserAndCurrentUserData[1];
  const otherUserData = likedUserAndCurrentUserData[0];

  function routeToChatScreen() {
    setShowLikeInitiatorProfile(false);
    navigation.navigate("chat");
  }

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ position: "relative" }}>
            <Image
              style={{
                width: "100%",
                height: imageHeight,
                resizeMode: "cover",
              }}
              source={{
                uri: `${data?.[0]?.likedBy?.mediaArray?.[0]}`,
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
                {data?.[0]?.likedBy?.firstname},{" "}
                {calculateAge(
                  data?.[0]?.likedBy?.dob?.year,
                  data?.[0]?.likedBy?.dob?.month,
                  data?.[0]?.likedBy?.dob?.day
                )}
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
                colorType="basewhite"
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
              <Pressable>
                <IconComponent
                  iconFunction={() =>
                    handleLikeInitiatorProfile(data?.[0]?.likedBy?.phonenumber)
                  }
                  iconName="heart"
                  IconComponent={MaterialCommunityIcons}
                  size={60}
                  color={theme.colors.brand.basewhite}
                />
              </Pressable>
            </View>
          </View>
          <HorizontalPaddingSpace space={theme.space[2]}>
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
                  {data?.[0]?.likedBy?.gender}
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
                  {data?.[0]?.likedBy?.country}
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
                    {data?.[0]?.likedBy?.jobtitle?.job}
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
                  {data?.[0]?.likedBy?.lifestyleHabits?.smoke}
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
                {data?.[0]?.likedBy?.address?.city},{" "}
                {data?.[0]?.likedBy?.address?.province}
              </Text>
            </View>
          </HorizontalPaddingSpace>

          <Spacer style={{ position: "relative" }} position="top" size="large">
            <Image
              style={{
                width: "100%",
                height: imageHeight,
                resizeMode: "cover",
              }}
              source={{
                uri: `${data?.[0]?.likedBy?.mediaArray?.[1]}`,
              }}
            />
          </Spacer>
          <HorizontalPaddingSpace space={theme.space[2]}>
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
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button"
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
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button"
                  width="100%">
                  {data?.[0]?.likedBy?.whatThreeWordsDescribeYou?.thirdword}
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
              {data?.[0]?.likedBy?.interestsArray?.map((word, idx) => (
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
          </HorizontalPaddingSpace>
          {data?.[0]?.likedBy?.mediaArray?.[2] && (
            <Spacer position="top" size="xxsmall">
              <Image
                style={{
                  width: "100%",
                  height: imageHeight,
                  resizeMode: "cover",
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
                }}
                source={{
                  uri: `${data?.[0]?.likedBy?.mediaArray?.[3]}`,
                }}
              />
            </Spacer>
          )}
          {data?.[0]?.likedBy?.mediaArray?.[4] && (
            <Spacer position="top" size="xxsmall">
              <Image
                style={{
                  width: "100%",
                  height: imageHeight,
                  resizeMode: "cover",
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
                }}
                source={{
                  uri: `${data?.[0]?.likedBy?.mediaArray?.[5]}`,
                }}
              />
            </Spacer>
          )}
        </ScrollView>
      ) : (
        <SafeArea
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Spacer position="top" size="large">
            <Text
              variant="subHeading"
              colorType="black"
              fontType="playfairbold"
              fontSize="h5">
              You and {otherUserData?.name} are a match
            </Text>
          </Spacer>
          <View style={{ height: `${theme.spaceNumberBy10[2]}%` }}>
            <FlatGrid
              data={[otherUserData, currentUserData]}
              spacing={theme.spaceNumberBy10[2]}
              renderItem={({ item }) => (
                <Image
                  style={{
                    height: theme.spaceNumberBy50[3],
                    resizeMode: "cover",
                    borderRadius: theme.spaceNumber[2],
                  }}
                  source={{
                    uri: `${item?.photo}`,
                  }}
                />
              )}
            />
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              marginTop: theme.spaceNumberBy50[0],
            }}>
            <Button
              backgroundColor={theme.colors.brand.base}
              isBorder={false}
              borderColor="transparent"
              buttonFunction={routeToChatScreen}
              text="Send a Message"
              textColor={theme.colors.brand.basewhite}
              width="80%"
            />
            <Button
              backgroundColor={theme.colors.brand.lightorange}
              isBorder={false}
              borderColor="transparent"
              buttonFunction={() => setShowLikeInitiatorProfile(false)}
              text="Later"
              textColor={theme.colors.brand.black}
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
            iconFunction={() => setShowLikeInitiatorProfile(false)}
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
