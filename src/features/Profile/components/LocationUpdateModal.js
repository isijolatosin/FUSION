import { useState } from "react";
import { ScrollView, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { locationCaptureInstruction } from "../../../constants";
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
  const [isLoading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    code: "",
  });

  async function updateReligious(
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

    updateReligious(latitude, longitude, location, country, address);
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
      <ScrollView>
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer position="top" size="xlarge">
            <IconComponent
              iconFunction={() => {}}
              iconName="map-marked-alt"
              IconComponent={FontAwesome5}
              size={70}
              color={theme.colors.brand.base}
              centralize={true}
            />
          </Spacer>
          <Spacer position="top" size="xxlarge">
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3"
              width="100%">
              Reset your location services
            </Text>
          </Spacer>
          <Spacer position="top" size="medium">
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratSemibold"
              fontSize="caption"
              width="100%">
              {locationCaptureInstruction}
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={responseMessage.code === "failed"}
            text="Location Access Denied! Please allow Your-Fusion to access your location"
            size="caption"
          />
          <View
            style={{
              height: "50%",
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
              />
            )}
          </View>
        </HorizontalPaddingSpace>
      </ScrollView>
    </View>
  );
}
