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
import {
  getAddress,
  getUserLocation,
  requestLocationPermission,
} from "../../../utilities/getUserLocation";
import Spinner from "../../../components/general-component/Spinner";
import OnboardingErrorComponent from "../../Onboarding/components/OnboardingErrorComponent";

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
      latitude ?? "",
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "longitude",
      longitude ?? "",
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "location",
      location ?? "",
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "country",
      country ?? "",
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "address",
      address ?? "",
      () => {}
    );
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "locationVisibility",
      isVisibleOnProfile ?? false,
      () => {}
    );

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }

  const handleLocationCapture = async () => {
    setLoading(true);

    const status = await requestLocationPermission(setResponseMessage);
    if (status !== "granted") {
      setLoading(false);
      return;
    }

    const userLocation = await getUserLocation();

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
          color={theme.colors.brand.base1}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="base1"
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
            colorType="base6"
            fontType="arimaMadurai"
            fontSize="h3"
            width="100%">
            Reset your
          </Text>
          <View style={{ marginTop: -theme.spaceNumber[5] }}>
            <Text
              variant="custom"
              colorType="base6"
              fontType="arimaMadurai"
              fontSize="h3"
              width="100%">
              Location Services
            </Text>
          </View>
          <Spacer position="top" size="medium">
            <Text
              variant="custom"
              colorType="base1"
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
            text="Location Access Denied! Please allow location access to Wiingr in your location settings"
            size="caption"
          />
          <Spacer position="top" size="xxlarge">
            <CheckBox
              title="Visible on your profile"
              checked={isVisibleOnProfile}
              onPress={() => setIsVisibleOnProfile(!isVisibleOnProfile)}
              checkedColor={theme.colors.brand.base6}
              uncheckedColor={theme.colors.brand.base6}
              titleProps={{
                style: {
                  fontWeight: "thin",
                  fontFamily: theme.fonts.montserratRegular,
                  color: theme.colors.brand.base6,
                },
              }}
              wrapperStyle={{
                margin: -20,
              }}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
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
                fontType={theme.fonts.montserraRegular}
                backgroundColor={theme.colors.brand.base8}
                buttonFunction={() => {
                  handleLocationCapture();
                }}
                text="Reset Location"
                textColor={theme.colors.brand.base1}
                width="80%"
              />
            )}
          </View>
        </HorizontalPaddingSpace>
      </ScrollView>
    </View>
  );
}
