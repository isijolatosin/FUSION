import { useState } from "react";
import LottieView from "lottie-react-native";
import { Dimensions, ScrollView, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import {
  locationCaptureInstruction,
  locationCaptureInstruction2,
} from "../../../constants";
import Button from "../../../components/utility/button.component";
import getUserLocation from "../../../utilities/getUserLocation";
import Spinner from "../../../components/general-component/Spinner";
import OnboardingErrorComponent from "../../Onboarding/components/OnboardingErrorComponent";
import getAddress from "../../../utilities/getAddress";

export default function LocationUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const { width } = Dimensions.get("window");
  const [isLoading, setLoading] = useState(false);
  const [isVisibleOnProfile, setIsVisibleOnProfile] = useState(
    currentUser?.locationVisibility ? currentUser?.locationVisibility : false
  );
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    code: "",
  });

  async function updateLocation(
    latitude,
    longitude,
    location,
    country,
    address
  ) {
    if (!latitude && !longitude) return;

    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "latitude",
      latitude,
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "longitude",
      longitude,
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "location",
      location,
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "country",
      country,
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "address",
      address,
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "locationVisibility",
      isVisibleOnProfile,
      () => {}
    );

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }

  const handleLocationCapture = async () => {
    const userLocation = await getUserLocation(setResponseMessage);
    const locationObject = await getAddress(
      userLocation.latitude,
      userLocation.longitude
    );
    const location = `${locationObject?.city}, ${locationObject?.region}`;
    const country = locationObject?.country;
    const address = `${locationObject?.streetNumber} ${locationObject?.street}. ${locationObject?.city}, ${locationObject?.region}`;

    const longitude = userLocation.longitude;
    const latitude = userLocation.latitude;

    updateLocation(latitude, longitude, location, country, address);
  };

  return (
    <View style={{ height: height }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          Location
        </Text>
      </View>
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
      <ScrollView>
        <HorizontalPaddingSpace space={theme.space[2]}>
          <Text
            variant="custom"
            colorType="black"
            fontType="arimaMadurai"
            fontSize="h3"
            width="100%">
            Reset your
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
          <Spacer position="top" size="xxlarge">
            <CheckBox
              title="Visible on your profile"
              checked={isVisibleOnProfile}
              onPress={() => setIsVisibleOnProfile(!isVisibleOnProfile)}
              checkedColor={theme.colors.brand.base}
              uncheckedColor={theme.colors.brand.brandFade}
              titleProps={{
                style: {
                  fontWeight: "thin",
                  fontFamily: theme.fonts.montserratRegular,
                },
              }}
              wrapperStyle={{
                margin: -20,
              }}
              containerStyle={{
                backgroundColor: theme.colors.brand.basewhite,
                borderColor: theme.colors.brand.basewhite,
              }}
            />
          </Spacer>
          <View
            style={{
              justifyContent: "flex-end",
            }}>
            {isLoading ? (
              <Spinner size="large" color={theme.colors.brand.base} />
            ) : (
              <Button
                fontType={theme.fonts.montserratBold}
                backgroundColor={theme.colors.brand.base}
                buttonFunction={() => {
                  setLoading(true);
                  handleLocationCapture();
                }}
                text="Reset Location"
                textColor={theme.colors.brand.basewhite}
                width="80%"
              />
            )}
          </View>
        </HorizontalPaddingSpace>
      </ScrollView>
    </View>
  );
}
