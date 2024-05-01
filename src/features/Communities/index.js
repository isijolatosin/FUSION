import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";

import { SafeArea } from "../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../components/utility/space-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { useAppContext } from "../../context/ThemeContext";
import { Text } from "../../components/typography/text.component";
import {
  activateAccountForMainScreen,
  compatibleText,
  friendshipzone,
  nofriendshipdata,
  unpauseAccountForMainScreen,
} from "../../constants";
import { retrieveData } from "../../utilities/retrieveDataFromPhoneMemory";
import { getAllData } from "../../utilities/updateFirestoreDatabaseField";
import AnimatedModal from "../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../components/general-component/ProfileViewModal";
import HeaderComponent from "../../components/general-component/HeaderComponent";
import FriendRequestConfirmationComponent from "../Compatibility/components/FriendRequestConfirmationComponent";
import TopNavigationTab from "../../components/general-component/TopNavigationTab";
import ProfileDeactivateCardComponent from "../../components/general-component/ProfileDeactivateCardComponent";
import ProfilePausedCardComponent from "../../components/general-component/ProfilePausedCardComponent";
import People from "./components/People";
// import Communities from "./components/Communities"; // PHASE TWO PROJECT
import Events from "./components/Events";
import { storeData } from "../../utilities/storeDataInPhoneMemory";

function ScreenWrapper({
  children,
  currentScreen,
  setCurrentScreen,
  theme,
  width,
}) {
  const screeenList = ["people", "events"];
  // const screeenList = ["people", "communities", "events"]; // PHASE TWO PROJECT

  return (
    <SafeArea
      style={{ backgroundColor: theme.colors.brand.basewhite, flex: 1 }}>
      <HeaderComponent
        title="Friendship Hub"
        theme={theme}
        LeftComp={() => <></>}
        RightComp={() => <></>}
      />
      <Spacer position="top" size="xsmall">
        <HorizontalPaddingSpace
          space={theme.space[6]}
          style={{ width: width, alignItems: "center" }}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="caption">
            {compatibleText}
          </Text>
        </HorizontalPaddingSpace>
        <TopNavigationTab
          arrayList={screeenList}
          currentScreen={currentScreen}
          setFunction={setCurrentScreen}
          theme={theme}
          width={Platform.OS === "ios" ? "60%" : theme.spaceNumberBy10[5]}
        />
      </Spacer>
      {children}
    </SafeArea>
  );
}

export default function Index() {
  const scrollViewPeopleRef = useRef(null);
  // const scrollViewCommunityRef = useRef(null); // PHASE TWO PROJECT
  const scrollViewEventRef = useRef(null);
  const { width } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [currentScreen, setCurrentScreen] = React.useState("people");
  const [requestVisible, setRequestVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedUserToView, setSelectedUserToView] = useState({});
  const [isSelectedUserToView, setIsSelectedUserToView] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const [communitiesData, setCommunitiesData] = useState([]);
  const {
    state: { theme },
  } = useAppContext();

  async function asyncFunctionCall() {
    storeData("last-screen-visit", "communities");
    setIsLoading(true);
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");
    const allMatchesResult = await getAllData("matches");

    // get current user
    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);

    // ########################################################################
    // Block current user if their preference is not Frienship
    if (currentUserData?.preference !== "Friendship") return;

    // ########################################################################
    // Remove current user profile
    const otherProfileData = newData.filter(
      (profile) => profile?.phonenumber !== phoneValueFromPhoneMemory
    );

    // ########################################################################
    // Filter by current user country
    const filterOffByCountryProfiles = [];
    for (let i = 0; i < otherProfileData.length; i++) {
      if (
        otherProfileData[i]?.country === currentUserData?.country ||
        Constants.expoConfig.extra.eas.adminKey === currentUserData.role // remove "admin see all users" later
      ) {
        filterOffByCountryProfiles.push(otherProfileData[i]);
      }
    }

    // ########################################################################
    // check if profile has same preference with current user and if not, filter off
    const filterOffByPreferenceProfiles = [];
    for (let i = 0; i < filterOffByCountryProfiles.length; i++) {
      if (
        filterOffByCountryProfiles[i]?.preference ===
        currentUserData?.preference
      ) {
        filterOffByPreferenceProfiles.push(filterOffByCountryProfiles[i]);
      }
    }

    // ########################################################################
    // check if there has already been a match prior
    const communityData = [];
    filterOffByPreferenceProfiles?.filter((user) => {
      const likedNumberArray = currentUserData?.listOfAllLikedNumbers;
      const likedMeList = currentUserData?.likedMeList;

      const blockedMeList = [];
      currentUserData?.blockedMeList?.map((list) => {
        blockedMeList.push(list?.phonenumber);
      });

      const blockedList = [];
      currentUserData?.blockedList?.map((list) => {
        blockedList.push(list?.phonenumber);
      });

      if (
        likedNumberArray?.length &&
        likedNumberArray?.includes(user?.phonenumber)
      )
        return;
      if (likedMeList?.length && likedMeList?.includes(user?.phonenumber))
        return;
      if (blockedMeList?.length && blockedMeList?.includes(user?.phonenumber))
        return;
      if (blockedList?.length && blockedList?.includes(user?.phonenumber))
        return;

      communityData.push(user);
    });

    setIsLoading(false);
    setCommunitiesData(communityData);
  }

  useFocusEffect(
    React.useCallback(() => {
      asyncFunctionCall();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  // Memoize the asyncFunctionCall function
  const memoizedFetchData = useMemo(() => asyncFunctionCall, []);

  useEffect(() => {
    asyncFunctionCall();
    const compatibleSubscriptionId = setTimeout(() => {
      setIsRetrigger(false);
    }, 1000);

    return () => clearTimeout(compatibleSubscriptionId);
  }, [isRetrigger, memoizedFetchData]);

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

  // #########################################################################
  // current user preference not set to friendship message
  if (currentUser?.preference !== "Friendship" && !isLoading) {
    return (
      <ScreenWrapper
        theme={theme}
        width={width}
        setCurrentScreen={setCurrentScreen}>
        <HorizontalPaddingSpace space={theme.space[5]}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              style={{
                textAlign: "center",
              }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption">
              {friendshipzone}
            </Text>
          </Spacer>
        </HorizontalPaddingSpace>
      </ScreenWrapper>
    );
  }

  // #########################################################################
  // People scroll
  const scrollToTopPeopleComp = () => {
    if (scrollViewPeopleRef.current) {
      scrollViewPeopleRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // #########################################################################
  // PHASE TWO PROJECT
  // #########################################################################
  // Communities scroll
  // const scrollToTopCommunityComp = () => {
  //   if (scrollViewCommunityRef.current) {
  //     scrollViewCommunityRef.current.scrollTo({ y: 0, animated: true });
  //   }
  // };

  // #########################################################################
  // Event scroll
  const scrollToEventTop = () => {
    if (scrollViewEventRef.current) {
      scrollViewEventRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenWrapper
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        theme={theme}
        width={width}>
        <View style={{ paddingBottom: theme.spaceNumberBy10[12] - 8 }}>
          {currentScreen === "people" &&
            (communitiesData.length === 0 ? (
              <HorizontalPaddingSpace space={theme.space[5]}>
                <Spacer position="top" size="xxxxlarge">
                  <Text
                    style={{
                      textAlign: "center",
                    }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="caption">
                    {nofriendshipdata}
                  </Text>
                </Spacer>
              </HorizontalPaddingSpace>
            ) : (
              <ScrollView
                ref={scrollViewPeopleRef}
                showsVerticalScrollIndicator={false}>
                {communitiesData?.map((signleUserWithSimilarInterest, idx) => (
                  <People
                    key={idx}
                    data={signleUserWithSimilarInterest}
                    width={width}
                    theme={theme}
                    setSelectedFriend={setSelectedFriend}
                    setRequestVisible={setRequestVisible}
                    currentUser={currentUser}
                    setIsRetrigger={setIsRetrigger}
                    scrollToTop={scrollToTopPeopleComp}
                    setIsSelectedUserToView={setIsSelectedUserToView}
                    setSelectedUserToView={setSelectedUserToView}
                  />
                ))}
              </ScrollView>
            ))}
          {/* {currentScreen === "communities" && (
            <Spacer position="top" size="small">
              <Communities
                requests={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                width={width}
                theme={theme}
                currentUser={currentUser}
                scrollViewCommunityRef={scrollViewCommunityRef}
                scrollToTop={scrollToTopCommunityComp}
              />
            </Spacer>
          )} */}
          {currentScreen === "events" && (
            <Spacer position="top" size="small">
              <Events
                width={width}
                theme={theme}
                currentUser={currentUser}
                scrollViewCommunityRef={scrollViewEventRef}
                scrollToTop={scrollToEventTop}
              />
            </Spacer>
          )}
          <FriendRequestConfirmationComponent
            theme={theme}
            isVisible={requestVisible}
            onClose={() => {
              setIsRetrigger(true);
              setRequestVisible(false);
            }}
            selectedFriend={selectedFriend}
          />
        </View>
      </ScreenWrapper>
      <AnimatedModal
        isVisible={isSelectedUserToView}
        onClose={() => setIsSelectedUserToView(false)}
        theme={theme}
        width={width}>
        <ProfileViewModal
          otherUser={selectedUserToView}
          theme={theme}
          setShowProfile={setIsSelectedUserToView}
          width={width}
        />
      </AnimatedModal>
    </View>
  );
}
