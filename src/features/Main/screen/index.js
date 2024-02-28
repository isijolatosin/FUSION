import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import {
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import IndividualUserProfileComponent from "./sub-component/IndividualUserProfileComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import FilterComponent from "./sub-component/FilterComponent";
import { CloseButton } from "./main.style";
import {
  getAllData,
  updateUserValueField,
} from "../../../utilities/updateFirestoreDatabaseField";
import YouLikedComponent from "./sub-component/YouLikedComponent";
// import Loading from "../../../components/general-component/Loading";
import CustomUseCardWithCTA from "../../../components/general-component/CustomUseCardWithCTA";
import {
  unpauseAccountForMainScreen,
  dailyendofswipescreenmessage,
  noDataFromYourCountrymessage,
  activateAccountForMainScreen,
} from "../../../constants";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";
import calculateAge from "../../../utilities/calculateAge";
import filterUsersWithinDistanceRange from "../../../utilities/filterUsersWithinDistanceRange";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import BrandAvatar from "../../../components/general-component/BrandAvatar";
import { Text } from "../../../components/typography/text.component";
import Button from "../../../components/utility/button.component";

const Index = ({ navigation }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [phone, setPhone] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isYouLikedVisible, setIsYouLikedVisible] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const scrollViewRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: true,
    });
  }, [navigation]);

  const {
    state: { theme },
  } = useAppContext();

  const fetchUsersData = async (phonenumber) => {
    if (phonenumber) {
      const newData = await getAllData("all-users");
      const currentUserData = newData.find(
        (data) => data.phonenumber === phonenumber
      );
      setCurrentUser(currentUserData);

      const returningData = newData.filter((data) => {
        if (data.phonenumber !== phonenumber) {
          if (currentUserData?.interest === "both") {
            return data;
          }

          if (data.gender === currentUserData?.interest) {
            return data;
          }

          // return data;
        }
      });

      // ########################################################################
      // check if profile is in the same country with current user and if not, filter off
      const filterOffByCountryProfiles = [];
      for (let i = 0; i < returningData.length; i++) {
        if (
          returningData[i]?.country === currentUserData?.country ||
          process.env.EXPO_PUBLIC_ROLE === currentUserData.role // remove admin see all users later
        ) {
          filterOffByCountryProfiles.push(returningData[i]);
        }
      }

      // ########################################################################
      // check if profile is paused and remove
      const filterOffDeactivateProfile = filterOffByCountryProfiles.filter(
        (profile) => {
          if (profile?.deactivate) return;

          return profile;
        }
      );

      // ########################################################################
      // check if profile is paused and remove
      const filterOffPausedProfile = filterOffDeactivateProfile.filter(
        (profile) => {
          if (profile?.pause) return;

          return profile;
        }
      );

      // ########################################################################
      // check for subscriber preference. This is going to change in future phase
      const fiterDataByHeightPreference = filterOffPausedProfile.filter(
        (preference) => {
          if (!currentUserData?.interestedheight) return preference;

          if (preference?.height === currentUserData?.interestedheight) {
            return preference;
          }
        }
      );
      const fiterDataByReliousBeliefsPreference =
        fiterDataByHeightPreference.filter((preference) => {
          if (!currentUserData?.interestedreligiousbeliefs) return preference;

          if (
            preference?.religious ===
            currentUserData?.interestedreligiousbeliefs
          ) {
            return preference;
          }
        });

      // ########################################################################
      // check for distance preference
      const filteredDistancePreferenceData = [];
      const currentUserLocation = {
        longitude: currentUserData?.longitude,
        latitude: currentUserData?.latitude,
      };
      if (currentUserData?.distancePreference?.suggest) {
        filteredDistancePreferenceData.push(
          ...filterUsersWithinDistanceRange(
            currentUserLocation,
            fiterDataByReliousBeliefsPreference,
            currentUserData?.distancePreference?.value
          )
        );
      } else {
        filteredDistancePreferenceData.push(
          ...fiterDataByReliousBeliefsPreference
        );
      }

      // ########################################################################
      // check for age preference
      const fromAgeValue = currentUserData?.agePreference?.fromAgeValue;
      const toAgeValue = currentUserData?.agePreference?.toAgeValue;
      const filteredAgePreferenceData = [];

      if (currentUserData?.agePreference?.suggest) {
        const filterAgePreferenceData = filteredDistancePreferenceData.filter(
          (data) => {
            const currentUserAge = calculateAge(
              data?.dob?.year,
              data?.dob?.month,
              data?.dob?.day
            );

            if (
              fromAgeValue <= +currentUserAge &&
              +currentUserAge <= toAgeValue
            ) {
              return data;
            }
          }
        );

        filteredAgePreferenceData.push(...filterAgePreferenceData);
      } else {
        filteredAgePreferenceData.push(...filteredDistancePreferenceData);
      }

      // ########################################################################
      //check if profile has been liked and filter off
      let filteredOffLikedProfiles = [];
      let filteredOffLikedProfilesStep2 = [];
      let filteredOffLikedProfilesStep3 = [];
      let filteredOffLikedProfilesStep4 = [];
      const likedNumberArray = currentUserData?.listOfAllLikedNumbers;

      if (likedNumberArray?.length) {
        filteredAgePreferenceData.map((data) => {
          if (!likedNumberArray?.includes(data?.phonenumber)) {
            filteredOffLikedProfiles.push(data);
          }
        });
      } else {
        filteredOffLikedProfiles = [...filteredAgePreferenceData];
      }

      // ########################################################################
      // check if profile has liked me and filter off
      const likedMeList = currentUserData?.likedMeList;
      if (likedMeList?.length && filteredOffLikedProfiles?.length) {
        filteredOffLikedProfiles.map((data) => {
          if (!likedMeList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep2.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep2 = [...filteredOffLikedProfiles];
      }

      // ########################################################################
      // check if profile has been blocked or blocked by me and filter off
      const blockedMeList = [];
      currentUserData?.blockedMeList?.map((list) => {
        blockedMeList.push(list?.phonenumber);
      });

      const blockedList = [];
      currentUserData?.blockedList?.map((list) => {
        blockedList.push(list?.phonenumber);
      });

      if (blockedMeList?.length) {
        filteredOffLikedProfilesStep2.map((data) => {
          if (!blockedMeList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep3.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep3 = [...filteredOffLikedProfilesStep2];
      }

      if (blockedList?.length) {
        filteredOffLikedProfilesStep3.map((data) => {
          if (!blockedList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep4.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep4 = [...filteredOffLikedProfilesStep3];
      }

      setAllUsers(filteredOffLikedProfilesStep4);
    }
  };

  const functionCall = async () => {
    await clearDataByKey("match-id");
    await clearDataByKey("refreshChatScreen");

    const indexFromPhoneMemory = await retrieveData("swipe-index");

    if (!indexFromPhoneMemory) {
      storeData("swipe-index", index);
    } else {
      setIndex(indexFromPhoneMemory);
    }

    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
    setPhone(phoneValueFromPhoneMemory);
    fetchUsersData(phoneValueFromPhoneMemory);
  };

  useFocusEffect(
    React.useCallback(() => {
      functionCall();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    functionCall();
    const resetFilterTrigger = setTimeout(() => {
      setIsRetrigger(false);
    }, 2000);

    return () => clearTimeout(resetFilterTrigger);
  }, [isRetrigger]);

  let currentUsertoSwipe = {};
  let currentSwipeIndexIsLessThanAllUsersLength = true;

  if (allUsers?.length) {
    let value = allUsers[index];

    if (!allUsers[index]?.phonenumber) {
      value = allUsers[0];
    }

    currentUsertoSwipe = value;
    if (index >= allUsers.length) {
      currentSwipeIndexIsLessThanAllUsersLength = false;
    }
  }

  function handleYouLikedClose() {
    setIsYouLikedVisible(false);
  }
  function handleFilterClose() {
    setIsVisible(false);
  }
  function handleFilterOpen() {
    setIsVisible(true);
  }

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  if (currentUser?.deactivate) {
    return (
      <SafeArea style={{ backgroundColor: theme.colors.brand.highlight }}>
        <HorizontalPaddingSpace space={theme.space[4]}>
          <Spacer position="top" size="large">
            <Spacer position="bottom" size="xlarge">
              <BrandAvatarO currentUser={currentUser} />
            </Spacer>
          </Spacer>
          <Spacer style={{ alignItems: "center" }} position="top" size="">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="linesLight"
              fontType="arimaMadurai"
              fontSize="h4">
              Profile Deactivated
            </Text>
          </Spacer>
          <Spacer style={{ alignItems: "center" }} position="top" size="large">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption">
              {activateAccountForMainScreen}
            </Text>
          </Spacer>
          <Spacer
            style={{ alignItems: "center" }}
            position="top"
            size="xxxxlarge">
            <Button
              backgroundColor="transparent"
              borderRadius={theme.space[3]}
              isBorder={true}
              borderColor={theme.colors.brand.base}
              buttonFunction={async () => {
                await updateUserValueField(
                  "all-users",
                  currentUser?.id,
                  "deactivate",
                  false,
                  setIsRetrigger
                );
              }}
              text="Activate profile"
              textColor={theme.colors.brand.base}
              width="80%"
            />
          </Spacer>
        </HorizontalPaddingSpace>
      </SafeArea>
    );
  }

  if (currentUser?.pause) {
    return (
      <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
        <HorizontalPaddingSpace space={theme.space[4]}>
          <Spacer position="top" size="large">
            <BrandAvatarO currentUser={currentUser} />
          </Spacer>
        </HorizontalPaddingSpace>
        <Spacer position="top" size="xxxxlarge" style={{ flex: 0.5 }}>
          {currentUser?.pause && (
            <CustomUseCardWithCTA
              text={unpauseAccountForMainScreen}
              buttonText="Unpause profile"
              cardFunction={async () => {
                await updateUserValueField(
                  "all-users",
                  currentUser?.id,
                  "pause",
                  false,
                  setIsRetrigger
                );
              }}
              gapSize="xxsmall"
            />
          )}
        </Spacer>
      </SafeArea>
    );
  }

  if (allUsers.length === 0) {
    return (
      <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
        <HorizontalPaddingSpace
          style={{ position: "relative" }}
          space={theme.space[4]}>
          <Spacer position="top" size="large">
            <NavigationBar>
              <BrandAvatarO currentUser={currentUser} />
            </NavigationBar>
          </Spacer>
          <Spacer position="top" size="xxxxlarge">
            <Text
              style={{
                textAlign: "center",
              }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption">
              {noDataFromYourCountrymessage}
            </Text>
            <Spacer position="top" size="xxxxlarge">
              <Spacer position="bottom" size="xxlarge">
                <BrandAvatar />
              </Spacer>
            </Spacer>
            <Spacer
              position="top"
              size="xxxxlarge"
              style={{ alignItems: "center" }}>
              <Button
                backgroundColor={theme.colors.brand.base}
                borderRadius={theme.space[3]}
                buttonFunction={() => navigation.navigate("profile")}
                text="Change preference"
                textColor={theme.colors.brand.basewhite}
                width="80%"
              />
            </Spacer>
          </Spacer>
        </HorizontalPaddingSpace>
      </SafeArea>
    );
    // return <Loading text="Loading..." />;
  }

  if (index === allUsers.length) {
    return (
      <CustomUseCardWithCTA
        text={dailyendofswipescreenmessage}
        buttonText="Change preference"
        buttonSecondText="Go through skipped profiles"
        cardFunction={() => {
          setIndex(0);
          storeData("swipe-index", 0);
          navigation.navigate("profile");
        }}
        showSecondButton={true}
        setIndex={setIndex}
      />
    );
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[4]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="large">
            <NavigationBar>
              <BrandAvatarO currentUser={currentUser} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}>
                <Pressable
                  style={{
                    transform: [{ rotateX: "180deg" }],
                  }}>
                  <IconComponent
                    iconFunction={() => {
                      index > 0 && setIndex(index - 1);
                      scrollToTop();
                    }}
                    iconName="undo-variant"
                    IconComponent={MaterialCommunityIcons}
                    size={25}
                    color={
                      index > 0
                        ? theme.colors.brand.brandFade
                        : theme.colors.brand.highlight
                    }
                  />
                </Pressable>
                <Pressable
                  style={{
                    marginLeft: theme.spaceNumber[7],
                    marginRight: theme.spaceNumber[1],
                  }}>
                  <IconComponent
                    iconFunction={handleFilterOpen}
                    iconName="sliders"
                    IconComponent={FontAwesome}
                    size={25}
                    color={
                      index > 0
                        ? theme.colors.brand.brandFade
                        : theme.colors.brand.brandFade
                    }
                  />
                </Pressable>
              </View>
            </NavigationBar>
          </Spacer>
        </Spacer>
        <IndividualUserProfileComponent
          fetchUsersData={fetchUsersData}
          phone={phone}
          data={currentUsertoSwipe}
          theme={theme}
          scrollViewRef={scrollViewRef}
          setLikedUser={setLikedUser}
          setIsYouLikedVisible={setIsYouLikedVisible}
          currentSwipeIndexIsLessThanAllUsersLength={
            currentSwipeIndexIsLessThanAllUsersLength
          }
          index={index}
          setIndex={setIndex}
          scrollToTop={scrollToTop}
          currentUser={currentUser}
          setIsRetrigger={setIsRetrigger}
        />
        <CloseButton
          onPress={() => {
            if (currentSwipeIndexIsLessThanAllUsersLength) {
              storeData("swipe-index", index + 1);
              setIndex(index + 1);
            }
            scrollToTop();
          }}
          spaceBottom="125px"
          style={{
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.5,
            shadowRadius: "5px",
            backgroundColor: theme.colors.brand.base,
          }}>
          <IconComponent
            iconFunction={() => {
              if (currentSwipeIndexIsLessThanAllUsersLength) {
                storeData("swipe-index", index + 1);
                setIndex(index + 1);
              }
              scrollToTop();
            }}
            iconName="close-a"
            IconComponent={Fontisto}
            size={theme.spaceNumberBy10[1]}
            color={theme.colors.brand.basewhite}
          />
        </CloseButton>
        <FilterComponent
          currentUser={currentUser}
          isVisible={isVisible}
          onClose={handleFilterClose}
          setIsRetrigger={setIsRetrigger}
          theme={theme}
        />
        <YouLikedComponent
          theme={theme}
          isVisible={isYouLikedVisible}
          onClose={handleYouLikedClose}
          likedUser={likedUser}
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default Index;
