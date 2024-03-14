import React, { useState } from "react";
import LottieView from "lottie-react-native";
import { Dimensions, View } from "react-native";
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
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    code: "",
  });

  const handleLocationCapture = async () => {
    const userLocation = await getUserLocation(setResponseMessage);
    const locationObject = await getAddress(
      userLocation.latitude,
      userLocation.longitude
    );
    user.longitude = userLocation.longitude;
    user.latitude = userLocation.latitude;
    user.location = `${locationObject?.city}, ${locationObject?.region}`;
    user.country = locationObject?.country;
    user.address = `${locationObject?.streetNumber} ${locationObject?.street}. ${locationObject?.city}, ${locationObject?.region}`;

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
        justifyContent: "flex-start",
      }}>
      <View>
        <View
          style={{
            height: theme.spaceNumberBy50[4],
            width: width,
          }}>
          <LottieView
            source={require("../../../../assets/animations/location.json")}
            autoPlay
            loop
          />
        </View>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <View>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3"
              width="100%">
              Enable your
            </Text>
            <View style={{ marginTop: -theme.spaceNumber[5] }}>
              <Text
                variant="custom"
                colorType="black"
                fontType="arimaMadurai"
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
              // height: "45%",
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
                  buttonFunction={() => {
                    // if (!user.longitude && !user.latitude) return;
                    // if (responseMessage.code === "failed") return;
                    setLoading(true);
                    handleLocationCapture();
                  }}
                  text="Enable Location"
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
