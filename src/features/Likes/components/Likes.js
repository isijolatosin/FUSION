import React, { useEffect, useState } from "react";
import { FlatGrid } from "react-native-super-grid";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import BrandAvatar from "../../Main/screen/sub-component/BrandAvatar";
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
  const [selectedLikedData, setSelectedLikedData] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const [isYouLikedVisible, setIsYouLikedVisible] = useState(false);

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
  }, []);

  return (
    <SafeArea>
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
                  setSelectedLikedData={setSelectedLikedData}
                  setIsYouLikedVisible={setIsYouLikedVisible}
                />
              )}
              style={{ marginBottom: theme.spaceNumberBy50[4] }}
            />
          </Spacer>
        </Spacer>
      </HorizontalPaddingSpace>
      {isYouLikedVisible && (
        <LikeInitiatorProfileComponent
          data={selectedLikedData}
          theme={theme}
          setLikedUser={setLikedUser}
          setIsYouLikedVisible={setIsYouLikedVisible}
          currentUser={currentUser}
        />
      )}
    </SafeArea>
  );
};

export default LikesScreen;
