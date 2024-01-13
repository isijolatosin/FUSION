import React, { useEffect, useState } from "react";
import { FlatGrid } from "react-native-super-grid";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  getAllLikesData,
} from "../../../utilities/updateFirestoreDatabaseField";
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

  useEffect(() => {
    async function fetchUsersData() {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      const newData = await getAllData();

      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );
      setCurrentUser(currentUserData);

      const likesData = await getAllLikesData();

      const likeInitiators = likesData.filter(
        (like) => like?.profileLikedNumber === phoneValueFromPhoneMemory
      );
      setYourLikesData(likeInitiators);
    }

    fetchUsersData();
  }, [isRetrigger]);

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="xlarge">
            <HorizontalPaddingSpace space={theme.space[4]}>
              <BrandAvatarO noFlex={true} width={theme.spaceNumberBy50[3]} />
            </HorizontalPaddingSpace>
          </Spacer>
        </Spacer>
        <Spacer style={{ alignItems: "center" }} position="top" size="">
          <Text
            style={{ textAlign: "center" }}
            variant="subHeading"
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
            <HorizontalPaddingSpace
              space={theme.space[3]}
              style={{ width: "100%" }}>
              <Spacer position="top" size="large">
                <Text
                  style={{
                    textAlign: "center",
                  }}
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="button">
                  {nolikesyetmessage}
                </Text>
                <Spacer position="top" size="xxxxlarge">
                  <BrandAvatar />
                </Spacer>
              </Spacer>
            </HorizontalPaddingSpace>
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
