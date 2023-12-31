import React, { Fragment, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import { database } from "../../../../config";
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

const Index = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFilteredData, setUserFilteredData] = useState([]);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const {
    state: { theme },
  } = useAppContext();

  const fetchUsersData = async (phonenumber) => {
    if (phonenumber) {
      await getDocs(collection(database, "all-users")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const returningData = [];
        newData.filter((data) => {
          if (data.phonenumber !== phonenumber) returningData.push(data);
        });
        setAllUsers(returningData);

        const currentUserData = newData.find(
          (data) => data.phonenumber === phonenumber
        );
        setCurrentUser(currentUserData);
      });
    }
  };

  useEffect(() => {
    const functionCall = async () => {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
      fetchUsersData(phoneValueFromPhoneMemory);
    };

    functionCall();
  }, []);

  // if (!allUsers.length) {
  //   return (
  //     <SafeArea
  //       style={{
  //         backgroundColor: theme.colors.brand.white,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}>
  //       <Text variant="loading">Loading...</Text>
  //     </SafeArea>
  //   );
  // }

  let currentUsertoSwipe = {};
  if (allUsers.length > 0) currentUsertoSwipe = allUsers[index];

  let currentSwipeIndexIsLessThanAllUsersLength = true;
  if (index >= allUsers.length - 1)
    currentSwipeIndexIsLessThanAllUsersLength = false;

  function handleFilterClose() {
    setIsVisible(false);
  }
  function handleFilterOpen() {
    setIsVisible(true);
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.white }}>
      <HorizontalPaddingSpace
        style={{ position: "relative" }}
        space={theme.space[5]}>
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
                    iconFunction={() => index > 0 && setIndex(index - 1)}
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
          index={index}
          setIndex={setIndex}
          currentSwipeIndexIsLessThanAllUsersLength={
            currentSwipeIndexIsLessThanAllUsersLength
          }
        />
        <CloseButton
          style={{
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.3,
            shadowRadius: "10px",
          }}>
          <View>
            <IconComponent
              iconFunction={() =>
                currentSwipeIndexIsLessThanAllUsersLength && setIndex(index + 1)
              }
              iconName="close"
              IconComponent={AntDesign}
              size={35}
              color={theme.colors.brand.base}
            />
          </View>
        </CloseButton>

        <FilterComponent
          theme={theme}
          isVisible={isVisible}
          onClose={handleFilterClose}
          allUsers={allUsers}
          setUserFilteredData={setUserFilteredData}
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default Index;
