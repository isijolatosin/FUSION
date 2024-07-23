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
import {
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Fontisto,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  Foundation,
  EvilIcons,
} from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import IndividualUserProfileComponent from "./sub-component/IndividualUserProfileComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import FilterComponent from "./sub-component/FilterComponent";
import {
  addToArrayField,
  emptyArrayField,
  getAllData,
  removeItemFromArray,
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
import Avatar from "../../../components/general-component/Avatar";
import firebase, { database } from "../../../../config";
import hasCombimneMatchElements from "../../../utilities/hasCombimneMatchElements";
import Placeholder from "../../../components/general-component/Placeholder";
import GymtypesComponent from "../../../components/general-component/GymtypesComponent";
import {
  getCityFromAddress,
  getLocationByAddress,
} from "../../../utilities/getUserLocation";
import ImageViewer from "../../../components/general-component/ImageViewer";

const Index = ({ navigation }) => {
  const videoRef = useRef(null);
  const { width, height } = Dimensions.get("window");
  const lastTap = useRef(0);
  const [allUsers, setAllUsers] = useState([]);
  const [phone, setPhone] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadCard, setLoadCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [isYouLikedVisible, setIsYouLikedVisible] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const [doubleTapWarning, setDoubleTapWarning] = useState(false);
  const [delayEndOfSwipeCard, setDelayEndOfSwipeCard] = useState(true);
  const scrollViewRef = useRef(null);
  const [gymSelectedTypes, setGymSelectedTypes] = useState([]);
  const [isGymPreferenceOpen, setIsGymPreferenceOpen] = useState(false);
  const [gymLocationErrorMsg, setGymLocationErrorMsg] = useState("");
  const [city, setCity] = useState("");

  const route = useRoute();
  const { phonenumber } = route?.params || {};

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

  const fetchUsersData = async (_phonenumber) => {
    storeData("last-screen-visit", "swipe");

    if (_phonenumber) {
      const newData = await getAllData("all-users");
      const currentUserData = newData.find(
        (data) => data.phonenumber === _phonenumber
      );
      setCurrentUser(currentUserData);
      if (currentUserData?.gymPreference?.length > 0) {
        setGymSelectedTypes(currentUserData?.gymPreference);
      } else {
        setGymSelectedTypes([]);
      }

      if (!currentUserData?.deviceinformation)
        deviceDetect(currentUserData?.id);

      // other users
      const returningData = newData.filter((data) => {
        if (data.phonenumber !== _phonenumber) {
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
      // This uses user's address
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
      // check for gym distance preference
      const filteredGymDistancePreferenceData = [];
      if (currentUserData?.gymMembership?.address) {
        const result = await getLocationByAddress(
          currentUserData?.gymMembership?.address
        );
        // This uses user' gym address
        const currentUserGymLocation = {
          longitude: result?.longitude,
          latitude: result?.latitude,
        };
        if (result?.status) {
          // set error msg
          setGymLocationErrorMsg(result?.status);
        } else {
          if (currentUserData?.distancePreference?.suggest) {
            filteredGymDistancePreferenceData.push(
              ...filterUsersWithinDistanceRange(
                currentUserGymLocation,
                filteredDistancePreferenceData,
                currentUserData?.distancePreference?.value
              )
            );
          } else {
            filteredGymDistancePreferenceData.push(
              ...filteredDistancePreferenceData
            );
          }
        }
      } else {
        filteredGymDistancePreferenceData.push(
          ...filteredDistancePreferenceData
        );
      }

      // ########################################################################
      // check for gym house preference
      const filteredGymHousePreferenceData = [];
      if (currentUserData?.gymPreference?.length > 0) {
        filteredGymDistancePreferenceData?.filter((data) => {
          if (data?.gymMembership?.name) {
            if (
              currentUserData?.gymPreference?.includes(
                data?.gymMembership?.name
              )
            ) {
              filteredGymHousePreferenceData.push(data);
            }
          }
        });
      } else {
        filteredGymHousePreferenceData.push(
          ...filteredGymDistancePreferenceData
        );
      }

      // ########################################################################
      // check for age preference
      const fromAgeValue = currentUserData?.agePreference?.fromAgeValue;
      const toAgeValue = currentUserData?.agePreference?.toAgeValue;
      const filteredAgePreferenceData = [];

      if (currentUserData?.agePreference?.suggest) {
        const filterAgePreferenceData = filteredGymHousePreferenceData.filter(
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
        filteredAgePreferenceData.push(...filteredGymHousePreferenceData);
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
      const dataId = setTimeout(() => {
        setLoading(false);
      }, 3000);

      return () => clearTimeout(dataId);
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
    fetchUsersData(phoneValueFromPhoneMemory ?? phonenumber);
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

  async function handleYouLikedAUser() {
    // checking for the last swipe and disabling end of swipe cards
    if (index + 1 === allUsers.length) setDelayEndOfSwipeCard(false);

    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    setDoubleTapWarning(false);

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      const likedUserNameAndPhoto = {
        name: currentUsertoSwipe?.firstname,
        photo: currentUsertoSwipe?.mediaArray?.[0],
      };
      setLikedUser(likedUserNameAndPhoto);

      // create match intend structure in firebase firestore
      database.collection("all-likes").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        likedBy: {
          ...currentUser,
        }, // the number who liked another profile
        profileLikedNumber: currentUsertoSwipe?.phonenumber, // profile number that was liked
      });

      // add liked profile number to list-of-all-liked-numbers in current user profile object
      await addToArrayField(
        "all-users",
        currentUser?.id,
        "listOfAllLikedNumbers",
        currentUsertoSwipe?.phonenumber
      );

      // add current user number (like initiator) to liked-me-list in other user profile object
      await addToArrayField(
        "all-users",
        currentUsertoSwipe?.id,
        "likedMeList",
        currentUser?.phonenumber
      );

      currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1);
      scrollToTop();

      setIsYouLikedVisible(true);
    } else {
      setDoubleTapWarning(true);
    }

    // Update the lastTap reference
    lastTap.current = now;
    setCity("");
  }

  function handleYouLikedClose() {
    setIsYouLikedVisible(false);
    setDelayEndOfSwipeCard(true);
    setIsRetrigger(true);
  }
  function handleFilterClose() {
    setIsVisible(false);
  }
  function handleFilterOpen() {
    if (isGymPreferenceOpen) return;
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

  if (allUsers.length === 0 && delayEndOfSwipeCard) {
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
          <ImageViewer
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            url={require("../../../../assets/illustration-1.png")}
            isLocalUrl={true}
          />
        )}
        setIndex={() => {}}
        showSecondButton={false}
        spaceSize="xxxxlarge"
        text={noDataFromYourCountrymessage}
      />
    );
  }

  if (index === allUsers.length && delayEndOfSwipeCard) {
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
          <ImageViewer
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
            url={require("../../../../assets/illustration-1.png")}
            isLocalUrl={true}
          />
        )}
        setIndex={setIndex}
        showSecondButton={true}
        spaceSize="xxxxlarge"
        text={dailyendofswipescreenmessage}
      />
    );
  }

  if (isLoadCard) {
    setTimeout(function () {
      setLoadCard(false);
    }, 1000);
  }

  async function handleSelectedGym(gym) {
    //remove selected
    if (gymSelectedTypes?.includes(gym)) {
      const poppedArray = gymSelectedTypes.filter((item) => item !== gym);

      setGymSelectedTypes([...poppedArray]);

      await removeItemFromArray(
        "all-users",
        currentUser?.id,
        "gymPreference",
        gym,
        () => {}
      );

      setIsRetrigger(true);
    } else {
      const loggedArray = [...gymSelectedTypes, gym];
      setGymSelectedTypes([...loggedArray]);

      await addToArrayField(
        "all-users",
        currentUser?.id,
        "gymPreference",
        gym,
        () => {}
      );

      setIsRetrigger(true);
    }
  }

  function handleClearGympreference() {
    const clearTimer2 = setTimeout(async () => {
      await emptyArrayField("all-users", currentUser?.id, "gymPreference");
    }, 1000);

    setIsRetrigger(true);
    return () => clearTimeout(clearTimer2);
  }

  if (currentUsertoSwipe?.gymMembership?.address && !city) {
    (async () => {
      const _address = await getCityFromAddress(
        currentUsertoSwipe?.gymMembership?.address
      );

      setCity(`${_address?.city}. ${_address?.region}`);
    })();
  }

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.base,
        position: "relative",
      }}>
      {isLoadCard ? (
        <Placeholder theme={theme} width={width} height={height} />
      ) : (
        <>
          <HorizontalPaddingSpace
            style={{ position: "relative" }}
            space={theme.space[2]}>
            <Spacer position="top" size="large">
              <Spacer position="bottom" size="small">
                <NavigationBar height={theme.spaceNumberBy10[2]}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {currentUser?.role ===
                      Constants.expoConfig.extra.eas.adminKey && (
                      <View style={{ marginRight: theme.spaceNumber[5] }}>
                        <BrandAvatarO theme={theme} />
                      </View>
                    )}
                    {isGymPreferenceOpen && (
                      <View>
                        <Text
                          variant="custom"
                          colorType="base6"
                          fontType="montserratRegular"
                          fontSize="title">
                          Hi, {currentUser?.firstname}
                        </Text>
                      </View>
                    )}
                  </View>
                  {!isGymPreferenceOpen && (
                    <>
                      {hasCombimneMatchElements(
                        currentUsertoSwipe,
                        currentUser,
                        2
                      )?.isSimilarGymGoal ||
                      hasCombimneMatchElements(
                        currentUsertoSwipe,
                        currentUser,
                        2
                      )?.isSimilarInterest ? (
                        <View
                          style={{
                            flex: 1,
                            borderTopLeftRadius: -theme.spaceNumber[5],
                            backgroundColor: theme.colors.brand.black,
                            marginLeft: theme.spaceNumber[3],
                            paddingRight: theme.spaceNumber[6],
                            paddingLeft: theme.spaceNumber[5],
                            paddingVertical: theme.spaceNumber[1],
                            flexDirection: "row",
                            alignItems: "center",
                            borderColor: theme.colors.brand.linesLighter,
                            borderRadius: theme.spaceNumberBy10[2],
                          }}>
                          <View style={{ marginRight: -theme.spaceNumber[3] }}>
                            <Avatar
                              data={currentUser?.mediaArray[0]}
                              theme={theme}
                              dimensionIndex={1}
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
                              dimensionIndex={1}
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
                              colorType="base1"
                              fontType="montserratRegular"
                              fontSize="xcaption">
                              {hasCombimneMatchElements(
                                currentUsertoSwipe,
                                currentUser,
                                2
                              )?.isSimilarInterest
                                ? `You and ${currentUsertoSwipe?.firstname} have similar interests`
                                : `You and ${currentUsertoSwipe?.firstname} have similar gym goals`}
                            </Text>
                          </View>
                        </View>
                      ) : (
                        <View>
                          <Text
                            variant="custom"
                            colorType="base6"
                            fontType="arimaMadurai"
                            fontSize="caption"
                            transform={
                              Platform.OS === "ios" ? "capitalize" : ""
                            }
                            width="100%">
                            {`Does ${currentUsertoSwipe?.firstname} match your gym style?`}
                          </Text>
                        </View>
                      )}
                    </>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}>
                    <Pressable
                      style={{
                        transform: [{ rotateX: "180deg" }],
                        marginLeft: theme.spaceNumber[7],
                      }}>
                      <IconComponent
                        iconFunction={() => {
                          if (isGymPreferenceOpen) return;

                          if (index > 0) {
                            setIndex(index - 1);
                            storeData("swipe-index", index - 1);
                            scrollToTop();
                          }
                        }}
                        iconName="undo-variant"
                        IconComponent={MaterialCommunityIcons}
                        size={25}
                        color={
                          index <= 0 || isGymPreferenceOpen
                            ? theme.colors.brand.base8
                            : theme.colors.brand.base1
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
                          isGymPreferenceOpen
                            ? theme.colors.brand.base8
                            : theme.colors.brand.base1
                        }
                      />
                    </Pressable>
                  </View>
                </NavigationBar>
              </Spacer>
            </Spacer>
          </HorizontalPaddingSpace>
          <Pressable
            onPress={() => setIsGymPreferenceOpen(!isGymPreferenceOpen)}
            style={{
              width: "100%",
              backgroundColor: isGymPreferenceOpen
                ? theme.colors.brand.black2
                : theme.colors.brand.black1,
              paddingVertical: theme.spaceNumber[3],
              borderBottomWidth: 0.5,
              borderBottomColor: theme.colors.brand.base,
            }}>
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="teal"
              fontType="montserratRegular"
              fontSize="caption">
              {isGymPreferenceOpen
                ? "Close preference"
                : "Adjust gym preference"}
            </Text>
          </Pressable>

          {isGymPreferenceOpen ? (
            <View style={{ flex: 1 }}>
              <View>
                <GymtypesComponent
                  handleSelectedGym={handleSelectedGym}
                  handleClearGympreference={handleClearGympreference}
                  gymSelectedTypes={gymSelectedTypes}
                  width={width}
                  currentUser={currentUser}
                  setIsRetrigger={setIsRetrigger}
                />
              </View>
              <HorizontalPaddingSpace
                space={theme.space[2]}
                style={{ flex: 0.8 }}>
                <Placeholder
                  isSliblingComp={true}
                  theme={theme}
                  width={width}
                />
              </HorizontalPaddingSpace>
            </View>
          ) : (
            <HorizontalPaddingSpace
              style={{ position: "relative" }}
              space={theme.space[2]}>
              <View
                style={{
                  height: "80%",
                  backgroundColor: theme.colors.brand.base1,
                  marginVertical: theme.spaceNumber[1],
                  borderRadius: theme.spaceNumberBy50[0],
                }}>
                <IndividualUserProfileComponent
                  fetchUsersData={fetchUsersData}
                  phone={phone}
                  data={currentUsertoSwipe}
                  theme={theme}
                  scrollViewRef={scrollViewRef}
                  videoRef={videoRef}
                />
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: -theme.spaceNumberBy10[2],
                  paddingHorizontal: theme.spaceNumber[5],
                  backgroundColor: theme.colors.brand.baseTint2,
                  width: width,
                }}>
                <View
                  style={{
                    paddingHorizontal: theme.spaceNumber[3],
                    paddingVertical: theme.spaceNumber[1],
                    borderRadius: theme.spaceNumber[1],
                    marginBottom: theme.spaceNumber[2],
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      borderBottomWidth: 0.2,
                      borderBottomColor: theme.colors.brand.basewhitelighter,
                    }}>
                    <View>
                      <Text
                        variant="custom"
                        colorType="base1"
                        fontType="arimaMadurai"
                        fontSize="title"
                        transform={Platform.OS === "ios" ? "capitalize" : ""}
                        width="100%">
                        {currentUsertoSwipe?.firstname},{" "}
                        {calculateAge(
                          currentUsertoSwipe?.dob?.year,
                          currentUsertoSwipe?.dob?.month,
                          currentUsertoSwipe?.dob?.day
                        )}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => setShowMore(!showMore)}
                      style={{
                        paddingTop: theme.spaceNumber[0],
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <View>
                        <Text
                          variant="custom"
                          colorType="base6"
                          fontType="montserratRegular"
                          fontSize="caption">
                          {showMore ? "Less" : "More"}
                        </Text>
                      </View>
                      <IconComponent
                        iconFunction={() => setShowMore(!showMore)}
                        iconName={showMore ? "arrow-up" : "arrow-down"}
                        IconComponent={EvilIcons}
                        size={theme.spaceNumberBy10[1]}
                        color={theme.colors.brand.base6}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: theme.spaceNumber[3],
                      marginTop: theme.spaceNumber[1],
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: theme.spaceNumber[0],
                      }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="human-male-height"
                        IconComponent={MaterialCommunityIcons}
                        size={12}
                        color={theme.colors.brand.base1}
                      />
                      <View>
                        <Text
                          style={{
                            marginLeft: theme.spaceNumber[1],
                          }}
                          variant="custom"
                          colorType="base4"
                          fontType="montserratRegular"
                          fontSize="caption">
                          {currentUsertoSwipe?.height}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: theme.spaceNumber[0],
                      }}>
                      <IconComponent
                        iconFunction={() => {}}
                        iconName="dumbbell"
                        IconComponent={FontAwesome5}
                        size={12}
                        color={theme.colors.brand.base1}
                      />
                      <View>
                        <Text
                          style={{
                            marginLeft: theme.spaceNumber[1],
                          }}
                          variant="custom"
                          colorType="base3"
                          fontType="montserratRegular"
                          fontSize="caption">
                          {currentUsertoSwipe?.lifestyleHabits?.gym}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {currentUsertoSwipe?.gymMembership?.name && (
                    <View
                      style={{
                        paddingVertical: theme.spaceNumber[0],
                      }}>
                      <View
                        style={{
                          alignItems: "start",
                          borderBottomWidth: 0.5,
                          borderBottomColor: theme.colors.brand.base8,
                          paddingBottom: theme.spaceNumber[1],
                          marginTop: theme.spaceNumber[5],
                          marginBottom: theme.spaceNumber[0],
                          width: "70%",
                        }}>
                        <Text
                          variant="custom"
                          colorType="base1"
                          fontType="montserratBold"
                          fontSize="caption">
                          Fitness club:
                        </Text>
                      </View>
                      <View
                        style={{
                          alignItems: "start",
                        }}>
                        <Text
                          variant="custom"
                          colorType="base3"
                          fontType="montserratRegular"
                          fontSize="caption">
                          {currentUsertoSwipe?.gymMembership?.name},{" "}
                          {currentUsertoSwipe?.gymMembership?.address
                            ? city
                            : ""}
                        </Text>
                      </View>
                    </View>
                  )}
                  {showMore ? (
                    <Spacer position="top" size="xxlarge">
                      <View
                        style={{
                          borderBottomColor:
                            theme.colors.brand.basewhitelighter,
                          borderBottomWidth: 0.2,
                          paddingBottom: theme.spaceNumber[2],
                        }}>
                        <Text
                          variant="custom"
                          colorType="base1"
                          fontType="montserratBold"
                          fontSize="body">
                          Fitness Goals
                        </Text>
                      </View>
                      {currentUsertoSwipe?.gymGoals?.length &&
                        currentUsertoSwipe?.gymGoals.map((goal, idx) => (
                          <View
                            key={idx}
                            style={{
                              flexDirection: "row",
                              paddingVertical: theme.spaceNumber[2],
                              width: "65%",
                              alignItems: "center",
                            }}>
                            <View
                              style={{
                                marginRight: theme.spaceNumber[3],
                                width: theme.spaceNumber[1],
                                height: theme.spaceNumber[1],
                                backgroundColor: theme.colors.brand.base6,
                                borderRadius: theme.spaceNumberBy10[2],
                              }}
                            />
                            <View>
                              <Text
                                variant="custom"
                                colorType="base3"
                                fontType="montserratRegular"
                                fontSize="caption">
                                {goal}
                              </Text>
                            </View>
                          </View>
                        ))}
                    </Spacer>
                  ) : (
                    <></>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    marginTop: theme.spaceNumber[1],
                  }}>
                  {doubleTapWarning && (
                    <View
                      style={{
                        position: "absolute",
                        top: -theme.spaceNumber[10],
                        left: -theme.spaceNumberBy10[1],
                        width: "fit-content",
                      }}>
                      <Text
                        style={{
                          textAlign: "center",
                          backgroundColor: theme.colors.brand.base1,
                          paddingHorizontal: theme.spaceNumber[6],
                          paddingVertical: theme.spaceNumber[1],
                        }}
                        variant="custom"
                        colorType="base"
                        fontType="montserratRegular"
                        fontSize="caption">
                        double tap to like profile
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      if (currentSwipeIndexIsLessThanAllUsersLength) {
                        storeData("swipe-index", index + 1);
                        setLoadCard(true);
                        setIndex(index + 1);
                      }
                      scrollToTop();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.colors.brand.base1,
                      width: theme.spaceNumberBy10[3],
                      height: theme.spaceNumberBy10[3],
                      borderRadius: theme.spaceNumberBy50[0],
                      marginRight: theme.spaceNumber[6],
                    }}>
                    <IconComponent
                      iconFunction={() => {
                        if (currentSwipeIndexIsLessThanAllUsersLength) {
                          storeData("swipe-index", index + 1);
                          setIndex(index + 1);
                          setLoadCard(true);
                          setCity("");
                        }
                        scrollToTop();
                      }}
                      iconName="close-a"
                      IconComponent={Fontisto}
                      size={theme.spaceNumber[7]}
                      color={theme.colors.brand.base}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleYouLikedAUser}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: theme.colors.brand.base1,
                      width: theme.spaceNumberBy10[3],
                      height: theme.spaceNumberBy10[3],
                      borderRadius: theme.spaceNumberBy50[0],
                    }}>
                    <IconComponent
                      iconFunction={handleYouLikedAUser}
                      iconName="weight-lifter"
                      IconComponent={MaterialCommunityIcons}
                      size={theme.spaceNumber[10]}
                      color={theme.colors.brand.base}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <FilterComponent
                currentUser={currentUser}
                isVisible={isVisible}
                onClose={handleFilterClose}
                setIsRetrigger={setIsRetrigger}
                theme={theme}
                storeData={storeData}
                setIndex={setIndex}
              />
              <YouLikedComponent
                theme={theme}
                isVisible={isYouLikedVisible}
                onClose={handleYouLikedClose}
                likedUser={likedUser}
              />
            </HorizontalPaddingSpace>
          )}

          {gymLocationErrorMsg ? (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                backgroundColor: theme.colors.brand.error,
                width: width,
                paddingVertical: theme.spaceNumber[2],
              }}>
              <Text
                style={{ textAlign: "center" }}
                variant="custom"
                colorType="base1"
                fontType="montserratBold"
                fontSize="caption">
                {gymLocationErrorMsg}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </>
      )}
    </SafeArea>
  );
};

export default Index;
