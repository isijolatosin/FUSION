import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as Device from "expo-device";
import * as Network from "expo-network";
import Constants from "expo-constants";
import { Dimensions, Image, Pressable, View } from "react-native";
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
import { Text } from "../../../components/typography/text.component";
import ProfilePausedCardComponent from "../../../components/general-component/ProfilePausedCardComponent";
import ProfileDeactivateCardComponent from "../../../components/general-component/ProfileDeactivateCardComponent";
import Loading from "../../../components/general-component/Loading";
import hasMatchingElements from "../../../utilities/hasMatchElements";
import Avatar from "../../../components/general-component/Avatar";

const Index = ({ navigation }) => {
  const { width } = Dimensions.get("window");
  const [allUsers, setAllUsers] = useState([]);
  const [phone, setPhone] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
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
    dispatch,
  } = useAppContext();

  async function deviceDetect(userId) {
    if (!userId) return;

    const deviceTypeEnum = ["UNKNOWN", "PHONE", "TABLET", "DESKTOP", "TV"];
    const modelName = Device?.modelName;
    const brand = Device?.brand;
    const isDevice = Device?.isDevice;
    const deviceType = deviceTypeEnum[await Device?.getDeviceTypeAsync()];
    const ip = await Network.getIpAddressAsync();

    const userDevice = {
      brand: brand,
      devicetype: deviceType,
      ipaddress: ip,
      isdevice: isDevice,
      modelname: modelName,
    };

    await updateUserValueField(
      "all-users",
      userId,
      "deviceinformation",
      userDevice,
      () => {}
    );
  }

  const fetchUsersData = async (phonenumber) => {
    storeData("last-screen-visit", "home");
    if (phonenumber) {
      const newData = await getAllData("all-users");
      const currentUserData = newData.find(
        (data) => data.phonenumber === phonenumber
      );
      setCurrentUser(currentUserData);

      if (!currentUserData?.deviceinformation)
        deviceDetect(currentUserData?.id);

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
          Constants.expoConfig.extra.eas.adminKey === currentUserData.role // remove admin see all users later
        ) {
          filterOffByCountryProfiles.push(returningData[i]);
        }
      }

      // ########################################################################
      // check if profile is deactivated and remove
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
          if (likedNumberArray?.includes(data?.phonenumber)) return;
          filteredOffLikedProfiles.push(data);
        });
      } else {
        filteredOffLikedProfiles = [...filteredAgePreferenceData];
      }

      // ########################################################################
      // check if profile has liked me and filter off
      const likedMeList = currentUserData?.likedMeList;
      if (likedMeList?.length && filteredOffLikedProfiles?.length) {
        filteredOffLikedProfiles.map((data) => {
          if (likedMeList?.includes(data?.phonenumber)) return;
          filteredOffLikedProfilesStep2.push(data);
        });
      } else {
        filteredOffLikedProfilesStep2 = [...filteredOffLikedProfiles];
      }

      // ########################################################################
      // block me filter off
      const blockedMeList = [];
      currentUserData?.blockedMeList?.map((list) => {
        blockedMeList.push(list?.phonenumber);
      });
      if (blockedMeList?.length) {
        filteredOffLikedProfilesStep2.map((data) => {
          if (blockedMeList?.includes(data?.phonenumber)) return;
          filteredOffLikedProfilesStep3.push(data);
        });
      } else {
        filteredOffLikedProfilesStep3 = [...filteredOffLikedProfilesStep2];
      }

      // ########################################################################
      //  Block by me filter off
      const blockedList = [];
      currentUserData?.blockedList?.map((list) => {
        blockedList.push(list?.phonenumber);
      });
      if (blockedList?.length) {
        filteredOffLikedProfilesStep3.map((data) => {
          if (blockedList?.includes(data?.phonenumber)) return;
          filteredOffLikedProfilesStep4.push(data);
        });
      } else {
        filteredOffLikedProfilesStep4 = [...filteredOffLikedProfilesStep3];
      }

      setAllUsers(filteredOffLikedProfilesStep4);
      setLoading(false);
    }
  };

  const functionCall = async () => {
    await clearDataByKey("match-id");

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

  // Memoize the functionCall function
  const memoizedFetchData = useMemo(() => functionCall, []);

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
  }, [isRetrigger, memoizedFetchData]);

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
      <ProfileDeactivateCardComponent
        currentUser={currentUser}
        message={activateAccountForMainScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  if (currentUser?.pause) {
    return (
      <ProfilePausedCardComponent
        currentUser={currentUser}
        message={unpauseAccountForMainScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  if (loading) {
    return <Loading theme={theme} width={width} />;
  }

  if (allUsers.length === 0) {
    return (
      <CustomUseCardWithCTA
        buttonText="Change preference"
        cardFunction={() => {
          setIndex(0);
          storeData("swipe-index", 0);
          navigation.navigate("profile");
        }}
        headingTitle="No Matches"
        ImageComponent={() => (
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            source={require("../../../../assets/illustration-1.png")}
          />
        )}
        setIndex={() => {}}
        showSecondButton={false}
        spaceSize="xxxxlarge"
        text={noDataFromYourCountrymessage}
      />
    );
  }

  if (index === allUsers.length) {
    return (
      <CustomUseCardWithCTA
        buttonText="Change preference"
        buttonSecondText="Go through skipped profiles"
        cardFunction={() => {
          setIndex(0);
          storeData("swipe-index", 0);
          navigation.navigate("profile");
        }}
        headingTitle="No Matches"
        ImageComponent={() => (
          <Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            source={require("../../../../assets/illustration-1.png")}
          />
        )}
        setIndex={setIndex}
        showSecondButton={true}
        spaceSize="xxxxlarge"
        text={dailyendofswipescreenmessage}
      />
    );
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[2]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="medium">
            <NavigationBar>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {currentUser?.role === process.env.EXPO_PUBLIC_ROLE && (
                  <View style={{ marginRight: theme.spaceNumber[5] }}>
                    <BrandAvatarO />
                  </View>
                )}
                <View>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="arimaMadurai"
                    fontSize="title"
                    transform="capitalize"
                    width="100%">
                    {currentUsertoSwipe?.firstname},{" "}
                    {calculateAge(
                      currentUsertoSwipe?.dob?.year,
                      currentUsertoSwipe?.dob?.month,
                      currentUsertoSwipe?.dob?.day
                    )}
                  </Text>
                </View>
              </View>
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
        {hasMatchingElements(
          currentUsertoSwipe?.interestsArray,
          currentUser?.interestsArray,
          4
        ) && (
          <View
            style={{
              borderTopLeftRadius: -theme.spaceNumber[5],
              backgroundColor: theme.colors.brand.black,
              marginBottom: theme.spaceNumber[3],
              paddingRight: theme.spaceNumber[6],
              paddingLeft: theme.spaceNumber[5],
              paddingVertical: theme.spaceNumber[2],
              flexDirection: "row",
              alignItems: "center",
              borderColor: theme.colors.brand.linesLighter,
              borderRadius: theme.spaceNumberBy10[2],
              borderBottomRightRadius: 0,
            }}>
            <View style={{ marginRight: -theme.spaceNumber[3] }}>
              <Avatar
                data={currentUser?.mediaArray[0]}
                theme={theme}
                dimensionIndex={2}
                func={() => {}}
                isSmallIcon={false}
              />
            </View>
            <View
              style={{
                borderWidth: "2.5px",
                borderRadius: theme.spaceNumberBy10[5],
                borderColor: theme.colors.brand.black,
              }}>
              <Avatar
                data={currentUsertoSwipe?.mediaArray[0]}
                theme={theme}
                dimensionIndex={3}
                func={() => {}}
                isSmallIcon={false}
              />
            </View>
            <View
              style={{
                paddingLeft: theme.spaceNumber[2],
                flex: 1,
              }}>
              <Text
                variant="custom"
                colorType="basewhite"
                fontType="montserratRegular"
                fontSize="caption">
                {`3+ shared interests! ${currentUser?.firstname} & ${currentUsertoSwipe?.firstname}, let's spark a conversation...`}
              </Text>
            </View>
          </View>
        )}
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
          spaceBottom={
            hasMatchingElements(
              currentUsertoSwipe?.interestsArray,
              currentUser?.interestsArray,
              4
            )
              ? "200px"
              : "135px"
          }
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
