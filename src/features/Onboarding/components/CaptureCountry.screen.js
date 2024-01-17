import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { Dimensions } from "react-native";
import DropdownSelection from "./sub-component/DropdownSelection";
import { countryList } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";

export default function CaptureCountry({ navigation }) {
  const [isOpen, setOpen] = useState(false);
  const { height } = Dimensions.get("window");
  const [country, setCountry] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, religious } = route.params || {};

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[5]}>
        <NavigationBar>
          <IconComponent
            iconFunction={() => navigation.goBack()}
            iconName="chevron-back"
            IconComponent={Ionicons}
            size={30}
            color={theme.colors.brand.base}
          />
          <NextNavigation
            theme={theme}
            color={theme.colors.brand.base}
            nextFunction={() => {
              if (country) {
                navigation.navigate("capture-sexual-orientation-screen", {
                  dob,
                  _height,
                  religious,
                  country,
                });
              } else {
                setPageError(true);
              }
            }}
          />
        </NavigationBar>
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{
            marginTop: theme.spaceNumberBy10[9],
            height: height,
          }}>
          <Spacer position="top" size="large">
            <Text
              variant="custom"
              colorType="black"
              fontType="playfairbold"
              fontSize="h4"
              width="100%">
              What country are you from?
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your country"
          />
          <Spacer position="top" size="xxxlarge">
            <DropdownSelection
              data={countryList}
              isOpen={isOpen}
              setOpen={setOpen}
              value={country}
              setFunction={setCountry}
              theme={theme}
              isForHeightComponent={false}
            />
          </Spacer>
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
