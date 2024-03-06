import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../components/utility/space-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { useAppContext } from "../../context/ThemeContext";
import BrandAvatarO from "../../components/general-component/BrandAvatarO";
import { Text } from "../../components/typography/text.component";
import {
  activateAccountForSimilarScreen,
  compatibleText,
  friendshipzone,
  unpauseAccountForSimilarScreen,
} from "../../constants";
import CommunitiesComponent from "./components/CommunitiesComponent";
import { retrieveData } from "../../utilities/retrieveDataFromPhoneMemory";
import {
  getAllData,
  updateUserValueField,
} from "../../utilities/updateFirestoreDatabaseField";
import BrandAvatar from "../../components/general-component/BrandAvatar";
import AnimatedModal from "../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../components/general-component/ProfileViewModal";
import CustomUseCardWithCTA from "../../components/general-component/CustomUseCardWithCTA";
import Loading from "../../components/general-component/Loading";
import HeaderComponent from "../../components/general-component/HeaderComponent";
import FriendRequestConfirmationComponent from "../Compatibility/components/FriendRequestConfirmationComponent";
import TopNavigationTab from "../../components/general-component/TopNavigationTab";

function ScreenWrapper({
  children,
  currentScreen,
  setCurrentScreen,
  theme,
  width,
}) {
  const screeenList = ["people", "communities", "events"];

  return (
    <SafeArea
      style={{ backgroundColor: theme.colors.brand.basewhite, flex: 1 }}>
      <HeaderComponent title="Friendship Hub" theme={theme} />
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
        />
      </Spacer>
      {children}
    </SafeArea>
  );
}

export default function Index() {
  const scrollViewRef = useRef(null);
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

    setIsLoading(true);

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
        process.env.EXPO_PUBLIC_ROLE === currentUserData.role // remove "admin see all users" later
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
      const blockedMeList = currentUserData?.blockedMeList;
      const blockedList = currentUserData?.blockedList;

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

    const communityDataId = setTimeout(() => {
      setIsLoading(false);
      setCommunitiesData(communityData);
    }, 300);
    return () => clearTimeout(communityDataId);
  }

  useFocusEffect(
    React.useCallback(() => {
      asyncFunctionCall();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    asyncFunctionCall();
    const compatibleSubscriptionId = setTimeout(() => {
      setIsRetrigger(false);
    }, 1000);

    return () => clearTimeout(compatibleSubscriptionId);
  }, [isRetrigger]);

  if (isLoading) {
    return (
      <ScreenWrapper
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        theme={theme}
        width={width}>
        <Loading text="Loading..." />
      </ScreenWrapper>
    );
  }

  if (communitiesData.length === 0 && !isLoading) {
    return (
      <ScreenWrapper theme={theme} width={width}>
        <HorizontalPaddingSpace space={theme.space[8]}>
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
            {!currentUser?.pause && !currentUser?.deactivate && (
              <Spacer position="top" size="xxxxlarge">
                <BrandAvatar />
              </Spacer>
            )}
          </Spacer>
        </HorizontalPaddingSpace>
        <Spacer position="top" size="xxxxlarge" style={{ flex: 0.5 }}>
          {!currentUser?.deactivate && currentUser?.pause && (
            <CustomUseCardWithCTA
              text={unpauseAccountForSimilarScreen}
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
          {currentUser?.deactivate && (
            <CustomUseCardWithCTA
              text={activateAccountForSimilarScreen}
              buttonText="Activate profile"
              cardFunction={async () => {
                await updateUserValueField(
                  "all-users",
                  currentUser?.id,
                  "deactivate",
                  false,
                  setIsRetrigger
                );
              }}
              gapSize="xxsmall"
            />
          )}
        </Spacer>
      </ScreenWrapper>
    );
  }

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
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
          {currentScreen === "people" && (
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}>
              {communitiesData?.map((signleUserWithSimilarInterest, idx) => (
                <CommunitiesComponent
                  key={idx}
                  data={signleUserWithSimilarInterest}
                  width={width}
                  theme={theme}
                  setSelectedFriend={setSelectedFriend}
                  setRequestVisible={setRequestVisible}
                  currentUser={currentUser}
                  setIsRetrigger={setIsRetrigger}
                  scrollToTop={scrollToTop}
                  setIsSelectedUserToView={setIsSelectedUserToView}
                  setSelectedUserToView={setSelectedUserToView}
                />
              ))}
            </ScrollView>
          )}
          {currentScreen === "communities" && (
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}>
              {[]?.map((signleUserWithSimilarInterest, idx) => (
                <CommunitiesComponent
                  key={idx}
                  data={signleUserWithSimilarInterest}
                  width={width}
                  theme={theme}
                  setSelectedFriend={setSelectedFriend}
                  setRequestVisible={setRequestVisible}
                  currentUser={currentUser}
                  setIsRetrigger={setIsRetrigger}
                  scrollToTop={scrollToTop}
                  setIsSelectedUserToView={setIsSelectedUserToView}
                  setSelectedUserToView={setSelectedUserToView}
                />
              ))}
            </ScrollView>
          )}
          {currentScreen === "events" && (
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}>
              {[]?.map((signleUserWithSimilarInterest, idx) => (
                <CommunitiesComponent
                  key={idx}
                  data={signleUserWithSimilarInterest}
                  width={width}
                  theme={theme}
                  setSelectedFriend={setSelectedFriend}
                  setRequestVisible={setRequestVisible}
                  currentUser={currentUser}
                  setIsRetrigger={setIsRetrigger}
                  scrollToTop={scrollToTop}
                  setIsSelectedUserToView={setIsSelectedUserToView}
                  setSelectedUserToView={setSelectedUserToView}
                />
              ))}
            </ScrollView>
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
