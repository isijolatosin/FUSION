import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";
import { useAppContext } from "../../../context/ThemeContext";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import LikeInitiatorProfileCard from "./LikeInitiatorProfileCard";
import LikeInitiatorProfileComponent from "./LikeInitiatorProfileComponent";
import { nolikesyetmessage } from "../../../constants";
import BrandAvatar from "../../../components/general-component/BrandAvatar";

const LikesScreen = () => {
  const {
    state: { theme },
  } = useAppContext();
  const [yourLikesData, setYourLikesData] = useState([]);
  const [initiatorProfileData, setInitiatorProfileData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [likedUserAndCurrentUserData, setLikedUserAndCurrentUserData] =
    useState([]);
  const [showInitiatorProfile, setShowLikeInitiatorProfile] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);

  async function fetchUsersData() {
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");

    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);

    const likesData = await getAllData("all-likes");

    const likeInitiators = likesData.filter(
      (like) => like?.profileLikedNumber === phoneValueFromPhoneMemory
    );
    setYourLikesData(likeInitiators);
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

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace space={theme.space[4]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="xlarge">
            <BrandAvatarO />
          </Spacer>
        </Spacer>
        <Spacer style={{ alignItems: "center" }} position="top" size="">
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="playfairbold"
            fontSize="h4">
            Your Likes
          </Text>
          {yourLikesData.length ? (
            <FlatGrid
              itemDimension={theme.spaceNumberBy50[2]}
              data={yourLikesData}
              spacing={theme.spaceNumberBy10[1]}
              renderItem={({ item }) => (
                <LikeInitiatorProfileCard
                  key={item?.id}
                  data={item}
                  theme={theme}
                  setInitiatorProfileData={setInitiatorProfileData}
                  setShowLikeInitiatorProfile={setShowLikeInitiatorProfile}
                />
              )}
              style={{ marginBottom: theme.spaceNumberBy50[4] }}
            />
          ) : (
            <View style={{ width: "100%" }}>
              <Spacer position="top" size="large">
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button">
                  {nolikesyetmessage}
                </Text>
                <Spacer position="top" size="xxxxlarge">
                  <BrandAvatar isLike={true} />
                </Spacer>
              </Spacer>
            </View>
          )}
        </Spacer>
      </HorizontalPaddingSpace>
      {showInitiatorProfile && (
        <LikeInitiatorProfileComponent
          data={initiatorProfileData}
          theme={theme}
          likedUserAndCurrentUserData={likedUserAndCurrentUserData}
          setLikedUserAndCurrentUserData={setLikedUserAndCurrentUserData}
          setShowLikeInitiatorProfile={setShowLikeInitiatorProfile}
          setInitiatorProfileData={setInitiatorProfileData}
          currentUser={currentUser}
          setIsRetrigger={setIsRetrigger}
        />
      )}
    </SafeArea>
  );
};

export default LikesScreen;
