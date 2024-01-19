import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import { SafeArea } from "../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../components/utility/space-area.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { NavigationBar } from "../Onboarding/components/onboarding.styles";
import IconComponent from "../../components/icon-components/IconComponent";
import { useAppContext } from "../../context/ThemeContext";
import BrandAvatarO from "../../components/general-component/BrandAvatarO";
import { Text } from "../../components/typography/text.component";
import { compatibleText, noSimilarInterestyetmessage } from "../../constants";
import CompatibleComponent from "./components/CompatibleComponent";
import { retrieveData } from "../../utilities/retrieveDataFromPhoneMemory";
import { getAllData } from "../../utilities/updateFirestoreDatabaseField";
import BrandAvatar from "../../components/general-component/BrandAvatar";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const [usersWithSimilarInterestsData, setUsersWithSimilarInterestsData] =
    useState([]);
  const {
    state: { theme },
  } = useAppContext();

  function hasMatchingElements(array1, array2) {
    const commonElements = array1.filter((element) => array2.includes(element));

    return commonElements.length >= 3;
  }

  useEffect(() => {
    async function asyncFunctionCall() {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      const newData = await getAllData("all-users");

      // get current user
      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );
      const currentUserInteresstArray = currentUserData?.interestsArray;

      // find users with similar interests
      const usersWithSimilarInterests = newData?.filter((user) => {
        if (user?.phonenumber !== phoneValueFromPhoneMemory) {
          const userInterestsArray = user.interestsArray;

          if (
            hasMatchingElements(currentUserInteresstArray, userInterestsArray)
          )
            return user;
        }
      });

      setUsersWithSimilarInterestsData(usersWithSimilarInterests);
    }

    asyncFunctionCall();
  }, []);

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <Spacer position="top" size="large">
        <HorizontalPaddingSpace space={theme.space[3]}>
          <BrandAvatarO />
        </HorizontalPaddingSpace>
      </Spacer>
      <Spacer position="top" size="large">
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{ width: width, alignItems: "center" }}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="playfairbold"
            fontSize="h4">
            Compatible
          </Text>
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
      {usersWithSimilarInterestsData?.length ? (
        <Spacer
          position="top"
          size="small"
          style={{ paddingBottom: theme.spaceNumberBy10[8] }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {usersWithSimilarInterestsData?.map(
              (signleUserWithSimilarInterest, idx) => (
                <CompatibleComponent
                  key={idx}
                  data={signleUserWithSimilarInterest}
                  width={width}
                  theme={theme}
                />
              )
            )}
          </ScrollView>
        </Spacer>
      ) : (
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
            <Spacer position="top" size="xxxxlarge">
              <BrandAvatar />
            </Spacer>
          </Spacer>
        </HorizontalPaddingSpace>
      )}
    </SafeArea>
  );
}
