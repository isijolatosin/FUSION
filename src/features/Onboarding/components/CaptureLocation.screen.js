import React, { useState } from "react";
import { Dimensions, Keyboard, Pressable, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import Button from "../../../components/utility/button.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { locationCaptureInstruction } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import getUserLocation from "../../../utilities/getUserLocation";
import Spinner from "../../../components/general-component/Spinner";

export default function CaptureLocation({ navigation }) {
  const {
    state: { theme, user },
    dispatch,
  } = useAppContext();
  const { height } = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    code: "",
  });

  const handleLocationCapture = async () => {
    const userLocation = await getUserLocation(setResponseMessage);
    user.longitude = userLocation.longitude;
    user.latitude = userLocation.latitude;
    dispatch({
      type: "SET_USER",
      payload: user,
    });

    setTimeout(() => {
      if (user.longitude && user.latitude) {
        navigation.navigate("you-are-special-screen");
      }
    }, 2000);
  };

  return (
    <SafeArea
      style={{
        height: height,
        justifyContent: "center",
      }}>
      <Pressable onPress={Keyboard.dismiss}>
        <HorizontalPaddingSpace space={theme.space[6]}>
          <Spacer position="top" size="xxxxlarge">
            <IconComponent
              iconFunction={() => {}}
              iconName="location-pin"
              IconComponent={Entypo}
              size={80}
              color={theme.colors.brand.base}
              centralize={true}
            />
          </Spacer>
          <Spacer position="top" size="large">
            <Text
              variant="title"
              colorType="black"
              fontType="playfairbold"
              fontSize="h4"
              width="100%">
              Enable your location services
            </Text>
          </Spacer>
          <Spacer position="top" size="large">
            <Text
              variant="title"
              colorType="error"
              fontType="montserratSemibold"
              fontSize="caption"
              width="100%">
              {locationCaptureInstruction}
            </Text>
          </Spacer>

          <OnboardingErrorComponent
            pageError={responseMessage.code === "failed"}
            text="Location Access Denied! Please allow Your-Fusion to access your location"
          />

          <View
            style={{
              height: "45%",
              justifyContent: "flex-end",
            }}>
            {isLoading ? (
              <Spinner size="large" color={theme.colors.brand.base} />
            ) : (
              <Button
                backgroundColor={theme.colors.brand.base}
                isBorder={false}
                buttonFunction={() => {
                  // if (!user.longitude && !user.latitude) return;
                  // if (responseMessage.code === "failed") return;
                  setLoading(true);
                  handleLocationCapture();
                }}
                text="Enable Location"
                textColor={theme.colors.brand.basewhite}
              />
            )}
          </View>
          {/* {isLoading && (
            <PopupModal>
              <View
                style={{
                  height: "60%",
                  backgroundColor: theme.colors.brand.basewhite,
                  paddingTop: theme.spaceNumberBy10[0],
                  width: "80%",
                  alignItems: "center",
                  elevation: 5,
                  shadowColor: theme.colors.brand.black,
                  shadowOpacity: 0.3,
                  shadowRadius: "5px",
                }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 22,
                    paddingBottom: theme.spaceNumberBy10[0],
                  }}
                  variant="title"
                  colorType="black"
                  fontType="playfairbold"
                  fontSize="h4"
                  width="80%">
                  Allow "Fusion" use your location.
                </Text>
                <Image
                  style={{ width: "100%", flex: 1, resizeMode: "cover" }}
                  source={{
                    uri: locationBackgroundImage,
                  }}
                />
                <LocationButtonWrapper
                  onPress={() =>
                    openLocationSettings(Linking, Platform, navigation)
                  }>
                  <LocationButtonText>Always Allow</LocationButtonText>
                </LocationButtonWrapper>
                <LocationButtonWrapper
                  onPress={() =>
                    openLocationSettings(Linking, Platform, navigation)
                  }
                  noBorderBottom={true}>
                  <LocationButtonText>Allow While Using App</LocationButtonText>
                </LocationButtonWrapper>
              </View>
            </PopupModal>
          )} */}
        </HorizontalPaddingSpace>
      </Pressable>
    </SafeArea>
  );
}
