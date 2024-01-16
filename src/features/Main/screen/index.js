import React, { useEffect, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import {
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome,
} from "@expo/vector-icons";

import IndividualUserProfileComponent from "./sub-component/IndividualUserProfileComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import FilterComponent from "./sub-component/FilterComponent";
import { CloseButton } from "./main.style";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import YouLikedComponent from "./sub-component/YouLikedComponent";
import Loading from "../../../components/general-component/Loading";
import CustomUseCardWithCTA from "../../../components/general-component/CustomUseCardWithCTA";
import { dailyendofswipescreenmessage } from "../../../constants";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";

const Index = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [phone, setPhone] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFilteredData, setUserFilteredData] = useState([]);
  const [likedUser, setLikedUser] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isYouLikedVisible, setIsYouLikedVisible] = useState(false);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const scrollViewRef = useRef(null);

  const {
    state: { theme },
  } = useAppContext();

  const fetchUsersData = async (phonenumber) => {
    if (phonenumber) {
      const newData = await getAllData("all-users");
      const currentUserData = newData.find(
        (data) => data.phonenumber === phonenumber
      );
      setCurrentUser(currentUserData);

      const returningData = newData.filter((data) => {
        if (data.phonenumber !== phonenumber) {
          if (currentUserData?.interest === "both") {
            return data;
          }

          if (data.gender === currentUserData?.interest) {
            return data;
          }

          // return data;
        }
      });

      //check if profile has been liked and filter off
      let filteredOffLikedProfiles = [];
      let filteredOffLikedProfilesStep2 = [];
      let filteredOffLikedProfilesStep3 = [];
      let filteredOffLikedProfilesStep4 = [];
      const likedNumberArray = currentUserData?.listOfAllLikedNumbers;

      if (likedNumberArray?.length) {
        returningData.map((data) => {
          if (!likedNumberArray?.includes(data?.phonenumber)) {
            filteredOffLikedProfiles.push(data);
          }
        });
      } else {
        filteredOffLikedProfiles = [...returningData];
      }

      // check if profile has liked me and filter off
      const likedMeList = currentUserData?.likedMeList;
      if (likedMeList?.length && filteredOffLikedProfiles?.length) {
        filteredOffLikedProfiles.map((data) => {
          if (!likedMeList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep2.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep2 = [...filteredOffLikedProfiles];
      }

      const blockedMeList = [];
      currentUserData?.blockedMeList?.map((list) => {
        blockedMeList.push(list?.phonenumber);
      });

      const blockedList = [];
      currentUserData?.blockedList?.map((list) => {
        blockedList.push(list?.phonenumber);
      });

      if (blockedMeList?.length) {
        filteredOffLikedProfilesStep2.map((data) => {
          if (!blockedMeList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep3.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep3 = [...filteredOffLikedProfilesStep2];
      }

      if (blockedList?.length) {
        filteredOffLikedProfilesStep3.map((data) => {
          if (!blockedList?.includes(data?.phonenumber)) {
            filteredOffLikedProfilesStep4.push(data);
          }
        });
      } else {
        filteredOffLikedProfilesStep4 = [...filteredOffLikedProfilesStep3];
      }

      setAllUsers(filteredOffLikedProfilesStep4);
    }
  };

  useEffect(() => {
    const functionCall = async () => {
      await clearDataByKey("match-id");
      await clearDataByKey("refreshChatScreen");

      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
      setPhone(phoneValueFromPhoneMemory);
      fetchUsersData(phoneValueFromPhoneMemory);
    };

    functionCall();
  }, [isRetrigger]);

  let currentUsertoSwipe = {};
  if (userFilteredData?.length) {
    currentUsertoSwipe = userFilteredData[index];
  } else {
    if (allUsers.length) currentUsertoSwipe = allUsers[index];
  }

  let currentSwipeIndexIsLessThanAllUsersLength = true;
  if (userFilteredData?.length) {
    if (index >= userFilteredData?.length)
      currentSwipeIndexIsLessThanAllUsersLength = false;
  } else {
    if (index >= allUsers.length)
      currentSwipeIndexIsLessThanAllUsersLength = false;
  }

  function handleYouLikedClose() {
    setIsYouLikedVisible(false);
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

  if (allUsers.length === 0) {
    return <Loading text="Loading..." />;
  }

  if (!currentSwipeIndexIsLessThanAllUsersLength) {
    return (
      <CustomUseCardWithCTA
        text={dailyendofswipescreenmessage}
        buttonText="Change preference"
        route="profile"
      />
    );
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[4]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="large">
            <NavigationBar>
              <BrandAvatarO currentUser={currentUser} />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable
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
                    size={25}
                    color={
                      index > 0
                        ? theme.colors.brand.brandFade
                        : theme.colors.brand.highlight
                    }
                  />
                </Pressable>
                <Pressable
                  style={{
                    marginLeft: theme.spaceNumber[7],
                    marginRight: theme.spaceNumber[1],
                  }}>
                  <IconComponent
                    iconFunction={handleFilterOpen}
                    iconName="sliders"
                    IconComponent={FontAwesome}
                    size={25}
                    color={
                      index > 0
                        ? theme.colors.brand.brandFade
                        : theme.colors.brand.brandFade
                    }
                  />
                </Pressable>
              </View>
            </NavigationBar>
          </Spacer>
        </Spacer>
        <IndividualUserProfileComponent
          fetchUsersData={fetchUsersData}
          phone={phone}
          data={currentUsertoSwipe}
          theme={theme}
          scrollViewRef={scrollViewRef}
          setLikedUser={setLikedUser}
          setIsYouLikedVisible={setIsYouLikedVisible}
          currentSwipeIndexIsLessThanAllUsersLength={
            currentSwipeIndexIsLessThanAllUsersLength
          }
          index={index}
          setIndex={setIndex}
          scrollToTop={scrollToTop}
          currentUser={currentUser}
          setIsRetrigger={setIsRetrigger}
        />
        <CloseButton
          spaceBottom="125px"
          style={{
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.5,
            shadowRadius: "5px",
            backgroundColor: theme.colors.brand.base,
          }}>
          <IconComponent
            iconFunction={() => {
              currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1);
              scrollToTop();
            }}
            iconName="close-a"
            IconComponent={Fontisto}
            size={theme.spaceNumberBy10[1]}
            color={theme.colors.brand.basewhite}
          />
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
        <YouLikedComponent
          theme={theme}
          isVisible={isYouLikedVisible}
          onClose={handleYouLikedClose}
          likedUser={likedUser}
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default Index;
