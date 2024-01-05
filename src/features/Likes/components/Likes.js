import React, { useEffect, useState } from "react";
import { FlatGrid } from "react-native-super-grid";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import BrandAvatar from "../../../components/general-component/BrandAvatar";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  getAllLikesData,
} from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import LikeInitiatorProfileCard from "./LikeInitiatorProfileCard";
import LikeInitiatorProfileComponent from "./LikeInitiatorProfileComponent";

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
          <BrandAvatar noFlex={true} />
        </Spacer>
        <Spacer style={{ alignItems: "center" }} position="top" size="">
          <Text
            variant="subHeading"
            colorType="black"
            fontType="playfairbold"
            fontSize="h4">
            Your Likes
          </Text>
          <Spacer position="top" size="large">
            <FlatGrid
              itemDimension={theme.spaceNumberBy50[2]}
              data={yourLikesData}
              spacing={20}
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
          </Spacer>
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
