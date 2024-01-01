import React, { Fragment, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

import IndividualUserProfileComponent from "./sub-component/IndividualUserProfileComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import BrandAvatar from "./sub-component/BrandAvatar";
import FilterComponent from "./sub-component/FilterComponent";
import { CloseButton, FilterText, FilterWrapper } from "./main.style";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";

const Index = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFilteredData, setUserFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const scrollViewRef = useRef(null);

  const {
    state: { theme },
  } = useAppContext();

  const fetchUsersData = async (phonenumber) => {
    if (phonenumber) {
      const newData = await getAllData();
      const currentUserData = newData.find(
        (data) => data.phonenumber === phonenumber
      );
      setCurrentUser(currentUserData);

      const returningData = newData.filter((data) => {
        if (data.phonenumber !== phonenumber) {
          if (currentUserData.interest === "both") {
            return data;
          }

          if (data.gender === currentUserData.interest) {
            return data;
          }
        }
      });
      setAllUsers(returningData);
    }
  };

  useEffect(() => {
    const functionCall = async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
      fetchUsersData(phoneValueFromPhoneMemory);
    };

    functionCall();
  }, [isRetrigger]);

  if (!allUsers.length) {
    return (
      <SafeArea
        style={{
          backgroundColor: theme.colors.brand.white,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text variant="loading">Loading...</Text>
      </SafeArea>
    );
  }

  let currentUsertoSwipe = {};
  if (userFilteredData?.length) {
    currentUsertoSwipe = userFilteredData[index];
  } else {
    if (allUsers.length) currentUsertoSwipe = allUsers[index];
  }

  let currentSwipeIndexIsLessThanAllUsersLength = true;
  if (userFilteredData?.length) {
    if (index >= userFilteredData?.length - 1)
      currentSwipeIndexIsLessThanAllUsersLength = false;
  } else {
    if (index >= allUsers.length - 1)
      currentSwipeIndexIsLessThanAllUsersLength = false;
  }

  function handleFilterClose() {
    setIsVisible(false);
  }
  function handleFilterOpen() {
    setIsVisible(true);
  }

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.white }}>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[3]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="large">
            <NavigationBar>
              <BrandAvatar />
              <Fragment>
                <TouchableOpacity
                  style={{
                    transform: [{ rotateX: "180deg" }],
                  }}>
                  <IconComponent
                    iconFunction={() => {
                      index > 0 && setIndex(index - 1);
                      scrollToTop();
                    }}
                    iconName="undo-variant"
                    IconComponent={MaterialCommunityIcons}
                    size={30}
                    color={
                      index > 0
                        ? theme.colors.brand.brandFade
                        : theme.colors.brand.highlight
                    }
                  />
                </TouchableOpacity>
                <FilterWrapper onPress={handleFilterOpen}>
                  <FilterText variant="popButton">Filter</FilterText>
                </FilterWrapper>
              </Fragment>
            </NavigationBar>
          </Spacer>
        </Spacer>
        <IndividualUserProfileComponent
          data={currentUsertoSwipe}
          theme={theme}
          scrollViewRef={scrollViewRef}
        />
        <CloseButton
          style={{
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.5,
            shadowRadius: "5px",
          }}>
          <View>
            <IconComponent
              iconFunction={() => {
                currentSwipeIndexIsLessThanAllUsersLength &&
                  setIndex(index + 1);
                scrollToTop();
              }}
              iconName="close-a"
              IconComponent={Fontisto}
              size={30}
              color={theme.colors.brand.basewhite}
            />
          </View>
        </CloseButton>

        <FilterComponent
          theme={theme}
          isVisible={isVisible}
          onClose={handleFilterClose}
          allUsers={allUsers}
          currentUser={currentUser}
          setUserFilteredData={setUserFilteredData}
          setIsRetrigger={setIsRetrigger}
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default Index;
