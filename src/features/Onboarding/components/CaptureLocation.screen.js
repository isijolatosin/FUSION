import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Dimensions, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import Button from "../../../components/utility/button.component";
import {
  locationCaptureInstruction,
  locationCaptureInstruction2,
  mapImage,
} from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import getUserLocation from "../../../utilities/getUserLocation";
import Spinner from "../../../components/general-component/Spinner";
import getAddress from "../../../utilities/getAddress";

export default function CaptureLocation({ navigation }) {
  const {
    state: { theme },
    dispatch,
  } = useAppContext();
  const route = useRoute();
  const { user } = route.params || {};
  const { width, height } = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    code: "",
  });

  const handleLocationCapture = async () => {
    setLoading(true);

    const userLocation = await getUserLocation(setResponseMessage);
    const locationObject = await getAddress(
      userLocation?.latitude,
      userLocation?.longitude
    );
    user.longitude = userLocation?.longitude;
    user.latitude = userLocation?.latitude;
    user.location = `${locationObject?.city}, ${locationObject?.region}`;
    user.country = locationObject?.country;
    user.address = `${locationObject?.streetNumber} ${locationObject?.street}. ${locationObject?.city}, ${locationObject?.region}`;

    dispatch({
      type: "SET_USER",
      payload: user,
    });

    const locId = setTimeout(() => {
      setLoading(false);
      if (userLocation?.latitude || userLocation?.longitude) setIsEnabled(true);
    }, 1000);

    const locId2 = setTimeout(() => {
      if (user.longitude && user.latitude) {
        setIsEnabled(false);
        navigation.navigate("you-are-special-screen");
      }
    }, 3000);

    return () => clearTimeout(locId, locId2);
  };

  return (
    <SafeArea
      style={{
        height: height,
        justifyContent: "flex-start",
      }}>
      <View>
        <View
          style={{
            height: theme.spaceNumberBy50[4],
            width: width,
            marginVertical:
              Platform.OS === "ios" ? 0 : theme.spaceNumberBy10[1],
          }}>
          {Platform.OS === "ios" ? (
            <LottieView
              source={require("../../../../assets/animations/location.json")}
              autoPlay
              loop
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: theme.spaceNumberBy50[4],
                width: width,
              }}>
              <Image
                width={width}
                height={theme.spaceNumberBy50[4]}
                source={{ uri: mapImage }}
              />
            </View>
          )}
        </View>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <View>
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              lineHeight={theme.lineHeights[25]}
              fontSize="h3"
              width="100%">
              Enable your
            </Text>
            <View style={{ marginTop: -theme.spaceNumber[5] }}>
              <Text
                style={{ textAlign: "center" }}
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
                lineHeight={theme.lineHeights[25]}
                fontSize="h3"
                width="100%">
                Location Services
              </Text>
            </View>
          </View>
          <Spacer position="top" size="medium">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratSemibold"
              lineHeight={theme.lineHeights[0]}
              fontSize="caption"
              width="100%">
              {locationCaptureInstruction}
              {"\n"}
              {"\n"}
              {locationCaptureInstruction2}
            </Text>
          </Spacer>

          <OnboardingErrorComponent
            pageError={responseMessage.code === "failed"}
            text="Location Access Denied! Please allow Wiingr to access your location"
            size="caption"
          />
          <View
            style={{
              marginTop: theme.spaceNumberBy10[3],
              justifyContent: "flex-end",
            }}>
            {isLoading ? (
              <Spinner size="large" color={theme.colors.brand.base} />
            ) : (
              <HorizontalPaddingSpace space={theme.space[6]}>
                <Button
                  fontType={theme.fonts.montserratBold}
                  backgroundColor={theme.colors.brand.base}
                  buttonFunction={() => handleLocationCapture()}
                  text={isEnabled ? "Location Enabled 📍" : "Enable Location"}
                  textColor={theme.colors.brand.basewhite}
                />
              </HorizontalPaddingSpace>
            )}
          </View>
        </HorizontalPaddingSpace>
      </View>
    </SafeArea>
  );
}
