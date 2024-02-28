import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
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
  noSimilarInterestyetmessage,
  unpauseAccountForSimilarScreen,
} from "../../constants";
import CompatibleComponent from "./components/CompatibleComponent";
import { retrieveData } from "../../utilities/retrieveDataFromPhoneMemory";
import {
  getAllData,
  updateUserValueField,
} from "../../utilities/updateFirestoreDatabaseField";
import BrandAvatar from "../../components/general-component/BrandAvatar";
import Loading from "../../components/general-component/Loading";
import YouLikedComponent from "../Main/screen/sub-component/YouLikedComponent";
import AnimatedModal from "../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../components/general-component/ProfileViewModal";
import CustomUseCardWithCTA from "../../components/general-component/CustomUseCardWithCTA";

function ScreenWrapper({ children, theme, width }) {
  return (
    <SafeArea
      style={{ backgroundColor: theme.colors.brand.basewhite, flex: 1 }}>
      <Spacer position="top" size="large">
        <HorizontalPaddingSpace space={theme.space[3]}>
          <BrandAvatarO />
        </HorizontalPaddingSpace>
      </Spacer>
      <Spacer position="top" size="xsmall">
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ width: width, alignItems: "center" }}>
          <Spacer position="bottom" size="small">
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3">
              Similar Interest
            </Text>
          </Spacer>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="caption">
            {compatibleText}
          </Text>
        </HorizontalPaddingSpace>
      </Spacer>
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

  function hasMatchingElements(array1, array2) {
    const commonElements = array1.filter((element) => array2.includes(element));

    return commonElements.length >= 3;
  }

  async function asyncFunctionCall() {
    setIsLoading(true);
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");
    const allMatchesResult = await getAllData("matches");

    // get current user
    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);
    const currentUserInteresstArray = currentUserData?.interestsArray;

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

    // find users with similar interests
    const usersWithSimilarInterests = [];
    newData?.filter((user) => {
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

          // check if profile has been liked or liked me and filter off
          if (
            (likedNumberArray?.length &&
              !likedNumberArray?.includes(user?.phonenumber)) ||
            (likedMeList?.length && !likedMeList?.includes(user?.phonenumber))
          ) {
            if (
              hasMatchingElements(currentUserInteresstArray, userInterestsArray)
            )
              stackingArray.push(user);
          }

          // check if profile has been blocked or blocked by me and filter off
          if (
            (blockedMeList?.length &&
              !blockedMeList?.includes(user?.phonenumber)) ||
            (blockedList?.length && !blockedList?.includes(user?.phonenumber))
          ) {
            const userInterestsArray = user?.interestsArray;

            if (
              hasMatchingElements(currentUserInteresstArray, userInterestsArray)
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
              hasMatchingElements(currentUserInteresstArray, userInterestsArray)
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

    const usersWithSimilarInterestsId = setTimeout(() => {
      setIsLoading(false);
      setUsersWithSimilarInterestsData(usersWithSimilarInterests);
    }, 500);

    return () => clearTimeout(usersWithSimilarInterestsId);
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
      <ScreenWrapper theme={theme} width={width}>
        <Loading text="Loading..." />
      </ScreenWrapper>
    );
  }

  if (usersWithSimilarInterestsData.length === 0 && !isLoading) {
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
              {noSimilarInterestyetmessage}
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
      <ScreenWrapper theme={theme} width={width}>
        <Spacer
          position="top"
          size="small"
          style={{ paddingBottom: theme.spaceNumberBy10[13] }}>
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
