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
  activateAccountForSimilarScreen,
  compatibleText,
  noSimilarInterestyetmessage,
  unpauseAccountForSimilarScreen,
} from "../../constants";
import CompatibleComponent from "./components/CompatibleComponent";
import { retrieveData } from "../../utilities/retrieveDataFromPhoneMemory";
import { getAllData } from "../../utilities/updateFirestoreDatabaseField";
import { storeData } from "../../utilities/storeDataInPhoneMemory";
import YouLikedComponent from "../Main/screen/sub-component/YouLikedComponent";
import AnimatedModal from "../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../components/general-component/ProfileViewModal";
import HeaderComponent from "../../components/general-component/HeaderComponent";
import ProfileDeactivateCardComponent from "../../components/general-component/ProfileDeactivateCardComponent";
import ProfilePausedCardComponent from "../../components/general-component/ProfilePausedCardComponent";
import hasMatchingElements from "../../utilities/hasMatchElements";

function ScreenWrapper({ children, theme, width }) {
  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.basewhite,
        flex: 1,
        position: "relative",
      }}>
      <HeaderComponent
        title="Similar Interest"
        theme={theme}
        LeftComp={() => <></>}
        RightComp={() => <></>}
      />
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
      <Spacer position="top" size="xsmall"></Spacer>
      {children}
    </SafeArea>
  );
}

export default function Index() {
  const scrollViewRef = useRef(null);
  const { width } = Dimensions.get("window");
  const [isLoading, setIsLoading] = useState(false);
  const [likedUser, setLikedUser] = useState([]);
  const [isYouLikedVisible, setIsYouLikedVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [selectedUserToView, setSelectedUserToView] = useState({});
  const [isSelectedUserToView, setIsSelectedUserToView] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const [usersWithSimilarInterestsData, setUsersWithSimilarInterestsData] =
    useState([]);
  const {
    state: { theme },
  } = useAppContext();

  async function asyncFunctionCall() {
    setIsLoading(true);
    storeData("last-screen-visit", "similar-interest");
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");
    const allMatchesResult = await getAllData("matches");

    // get current user
    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);
    const currentUserInteresstArray = currentUserData?.interestsArray;

    // ########################################################################
    // check if profile is in the same country with current user and if not, filter off
    const filterOffByCountryProfiles = [];
    for (let i = 0; i < newData.length; i++) {
      if (
        newData[i]?.country === currentUserData?.country ||
        Constants.expoConfig.extra.eas.adminKey === currentUserData.role // remove admin see all users later
      ) {
        filterOffByCountryProfiles.push(newData[i]);
      }
    }

    // ########################################################################
    // check that it is only current user match being retrieved
    const onlyCurrentUserOtherMatchesNumber = [];
    for (let i = 0; i < allMatchesResult.length; i++) {
      if (
        allMatchesResult[i]?.likedByprofile?.phonenumber ===
        phoneValueFromPhoneMemory
      ) {
        onlyCurrentUserOtherMatchesNumber.push(
          allMatchesResult[i]?.likedProfile?.phonenumber
        );
      }

      if (
        allMatchesResult[i]?.likedProfile?.phonenumber ===
        phoneValueFromPhoneMemory
      ) {
        onlyCurrentUserOtherMatchesNumber.push(
          allMatchesResult[i]?.likedByprofile?.phonenumber
        );
      }
    }

    // ########################################################################
    // find users with similar interests
    const usersWithSimilarInterests = [];
    filterOffByCountryProfiles?.filter((user) => {
      const userInterestsArray = user?.interestsArray;
      if (user?.phonenumber !== phoneValueFromPhoneMemory) {
        if (
          user?.gender === currentUserData?.interest ||
          currentUserData?.interest === "both"
        ) {
          //check match array
          if (onlyCurrentUserOtherMatchesNumber?.includes(user?.phonenumber))
            return;

          const stackingArray = [];
          const likedNumberArray = currentUserData?.listOfAllLikedNumbers;
          const likedMeList = currentUserData?.likedMeList;
          const blockedMeList = currentUserData?.blockedMeList;
          const blockedList = currentUserData?.blockedList;

          // ########################################################################
          // check if profile has been liked or liked me and filter off
          if (likedNumberArray?.length || likedMeList?.length) {
            if (likedNumberArray?.includes(user?.phonenumber)) return;
            if (likedMeList?.includes(user?.phonenumber)) return;

            if (
              hasMatchingElements(
                currentUserInteresstArray,
                userInterestsArray,
                3
              )
            )
              stackingArray.push(user);
          }

          // ########################################################################
          // check if profile has been blocked or blocked by me and filter off
          if (blockedMeList?.length || blockedList?.length) {
            if (blockedList?.includes(user?.phonenumber)) return;
            if (blockedMeList?.includes(user?.phonenumber)) return;

            const userInterestsArray = user?.interestsArray;

            if (
              hasMatchingElements(
                currentUserInteresstArray,
                userInterestsArray,
                3
              )
            )
              stackingArray.push(user);
          }

          if (
            !blockedMeList &&
            !blockedList &&
            !likedNumberArray &&
            !likedMeList
          ) {
            if (
              hasMatchingElements(
                currentUserInteresstArray,
                userInterestsArray,
                3
              )
            )
              stackingArray.push(user);
          }

          if (stackingArray?.length) {
            usersWithSimilarInterests.push(...stackingArray);
          }
          // else {
          //   if (
          //     hasMatchingElements(
          //       currentUserInteresstArray,
          //       userInterestsArray
          //     )
          //   )
          //     usersWithSimilarInterests.push(user);
          // }
        }
      }
    });

    setIsLoading(false);
    setUsersWithSimilarInterestsData(usersWithSimilarInterests);
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
        message={activateAccountForSimilarScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  if (currentUser?.pause) {
    return (
      <ProfilePausedCardComponent
        currentUser={currentUser}
        message={unpauseAccountForSimilarScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  if (usersWithSimilarInterestsData.length === 0 && !isLoading) {
    return (
      <ScreenWrapper theme={theme} width={width}>
        <HorizontalPaddingSpace space={theme.space[7]}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              style={{
                textAlign: "center",
              }}
              variant="custom"
              colorType="black"
              fontType="montserratRegular"
              fontSize="caption">
              {noSimilarInterestyetmessage}
            </Text>
          </Spacer>
        </HorizontalPaddingSpace>
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
      <ScreenWrapper theme={theme} width={width}>
        <Spacer
          position="top"
          size="small"
          style={{ paddingBottom: theme.spaceNumberBy10[1] }}>
          <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
            {usersWithSimilarInterestsData?.map(
              (signleUserWithSimilarInterest, idx) => (
                <CompatibleComponent
                  key={idx}
                  data={signleUserWithSimilarInterest}
                  width={width}
                  theme={theme}
                  setLikedUser={setLikedUser}
                  setIsYouLikedVisible={setIsYouLikedVisible}
                  currentUser={currentUser}
                  setIsRetrigger={setIsRetrigger}
                  scrollToTop={scrollToTop}
                  setIsSelectedUserToView={setIsSelectedUserToView}
                  setSelectedUserToView={setSelectedUserToView}
                />
              )
            )}
          </ScrollView>
          <YouLikedComponent
            theme={theme}
            isVisible={isYouLikedVisible}
            onClose={() => setIsYouLikedVisible(false)}
            likedUser={likedUser}
          />
        </Spacer>
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
