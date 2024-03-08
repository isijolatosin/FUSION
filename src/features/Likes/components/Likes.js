import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  updateUserValueField,
} from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import LikeInitiatorProfileCard from "./LikeInitiatorProfileCard";
import InitiatorProfileComponent from "./InitiatorProfileComponent";
import {
  activateAccountForLikeScreen,
  nofriendrequestmessage,
  nolikesyetmessage,
  unpauseAccountForLikeScreen,
} from "../../../constants";
import CustomUseCardWithCTA from "../../../components/general-component/CustomUseCardWithCTA";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import FriendInitiatorProfileCard from "../../Compatibility/components/FriendInitiatorProfileCard";
import TopNavigationTab from "../../../components/general-component/TopNavigationTab";
import BrandAvatar from "../../../components/general-component/BrandAvatar";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import FriendshipInitiatorProfileComponent from "../../Communities/components/FriendshipInitiatorProfileComponent";
import ProfilePausedCardComponent from "../../../components/general-component/ProfilePausedCardComponent";
import ProfileDeactivateCardComponent from "../../../components/general-component/ProfileDeactivateCardComponent";

const LikesScreen = () => {
  const {
    state: { theme },
  } = useAppContext();
  const [yourLikesData, setYourLikesData] = useState([]);
  const [friendRequestData, setFriendRequestData] = useState([]);

  const [currentScreen, setCurrentScreen] = React.useState("match likes");
  const [currentUser, setCurrentUser] = useState([]);

  const [initiatorProfileData, setInitiatorProfileData] = useState([]);
  const [friendRequestProfileData, setFriendRequesterProfileData] = useState(
    []
  );
  const [likedUserAndCurrentUserData, setLikedUserAndCurrentUserData] =
    useState([]);
  const [friendshipToAndFromData, setFriendshipToAndFromData] = useState([]);

  const [showLikeInitiatorProfile, setShowLikeInitiatorProfile] =
    useState(false);
  const [showFriendRequestProfile, setShowFriendRequesterProfile] =
    useState(false);

  const [isRetrigger, setIsRetrigger] = useState(false);

  async function fetchUsersData() {
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    // all data
    const newData = await getAllData("all-users");

    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);

    // all likes data
    const likesData = await getAllData("all-likes");
    const friendRequestData = await getAllData("friend-request");

    const likeInitiators = likesData.filter(
      (like) => like?.profileLikedNumber === phoneValueFromPhoneMemory
    );
    setYourLikesData(likeInitiators);

    const friendInitiators = friendRequestData.filter(
      (friend) => friend?.friendRequestToNumber === phoneValueFromPhoneMemory
    );
    setFriendRequestData(friendInitiators);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    fetchUsersData();

    const resetLikeTrigger = setTimeout(() => {
      setIsRetrigger(false);
    }, 1000);

    return () => clearTimeout(resetLikeTrigger);
  }, [isRetrigger]);

  if (currentUser?.deactivate) {
    return (
      <ProfileDeactivateCardComponent
        currentUser={currentUser}
        message={activateAccountForLikeScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  if (currentUser?.pause) {
    return (
      <ProfilePausedCardComponent
        currentUser={currentUser}
        message={unpauseAccountForLikeScreen}
        setIsRetrigger={setIsRetrigger}
        theme={theme}
      />
    );
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HeaderComponent
        title="Your Likes"
        theme={theme}
        LeftComp={() => <></>}
        RightComp={() => <></>}
      />
      <TopNavigationTab
        arrayList={["match likes", "community likes"]}
        currentScreen={currentScreen}
        horizontalSpace={theme.space[5]}
        setFunction={setCurrentScreen}
        theme={theme}
        width="90%"
      />
      <HorizontalPaddingSpace space={theme.space[0]}>
        <Spacer style={{ alignItems: "center" }} position="top" size="">
          {yourLikesData.length && currentScreen === "match likes" ? (
            <Spacer
              position="top"
              size="large"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spaceNumberBy10[1],
              }}>
              {yourLikesData.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    width: theme.spaceNumberBy50[2],
                    height: theme.spaceNumberBy50[2],
                  }}>
                  <LikeInitiatorProfileCard
                    key={item?.id}
                    data={item}
                    theme={theme}
                    setInitiatorProfileData={setInitiatorProfileData}
                    setShowLikeInitiatorProfile={setShowLikeInitiatorProfile}
                  />
                </View>
              ))}
            </Spacer>
          ) : (
            currentScreen === "match likes" && (
              <View style={{ width: "100%" }}>
                <HorizontalPaddingSpace space={theme.space[5]}>
                  <Spacer position="top" size="large">
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="caption">
                      {nolikesyetmessage}
                    </Text>
                    <Spacer position="top" size="xxxxlarge">
                      <BrandAvatar isLike={true} />
                    </Spacer>
                  </Spacer>
                </HorizontalPaddingSpace>
              </View>
            )
          )}
          {friendRequestData.length && currentScreen === "community likes" ? (
            <Spacer
              position="top"
              size="large"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spaceNumberBy10[1],
              }}>
              {friendRequestData.map((item, idx) => (
                <View
                  key={idx}
                  style={{
                    width: theme.spaceNumberBy50[2],
                    height: theme.spaceNumberBy50[2],
                  }}>
                  <FriendInitiatorProfileCard
                    data={item}
                    theme={theme}
                    setFriendRequesterProfileData={
                      setFriendRequesterProfileData
                    }
                    setShowFriendRequesterProfile={
                      setShowFriendRequesterProfile
                    }
                  />
                </View>
              ))}
            </Spacer>
          ) : (
            currentScreen === "community likes" && (
              <View style={{ width: "100%" }}>
                <HorizontalPaddingSpace space={theme.space[5]}>
                  <Spacer position="top" size="large">
                    <Text
                      style={{
                        textAlign: "center",
                      }}
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="caption">
                      {nofriendrequestmessage}
                    </Text>
                    <Spacer position="top" size="xxxxlarge">
                      <BrandAvatar isLike={true} />
                    </Spacer>
                  </Spacer>
                </HorizontalPaddingSpace>
              </View>
            )
          )}
        </Spacer>
      </HorizontalPaddingSpace>
      <AnimatedModal
        isVisible={showLikeInitiatorProfile}
        onClose={() => setShowLikeInitiatorProfile(false)}
        theme={theme}
        width="100%">
        <InitiatorProfileComponent
          data={initiatorProfileData}
          theme={theme}
          bothUserData={likedUserAndCurrentUserData}
          setBothUserData={setLikedUserAndCurrentUserData}
          setShowInitiatorProfile={setShowLikeInitiatorProfile}
          setInitiatorProfileData={setInitiatorProfileData}
          currentUser={currentUser}
          setIsRetrigger={setIsRetrigger}
        />
      </AnimatedModal>
      <AnimatedModal
        isVisible={showFriendRequestProfile}
        onClose={() => setShowFriendRequesterProfile(false)}
        theme={theme}
        width="100%">
        <FriendshipInitiatorProfileComponent
          data={friendRequestProfileData}
          theme={theme}
          bothUserData={friendshipToAndFromData}
          setBothUserData={setFriendshipToAndFromData}
          setShowInitiatorProfile={setShowFriendRequesterProfile}
          setInitiatorProfileData={setFriendRequestData}
          currentUser={currentUser}
          setIsRetrigger={setIsRetrigger}
        />
      </AnimatedModal>
    </SafeArea>
  );
};
export default LikesScreen;
