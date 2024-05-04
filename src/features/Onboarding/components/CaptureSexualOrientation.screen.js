import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { Dimensions } from "react-native";
import DropdownSelection from "./sub-component/DropdownSelection";
import { sexualOrientationList } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function CaptureSexualOrientation({ navigation }) {
  const [isOpen, setOpen] = useState(false);
  const { height } = Dimensions.get("window");
  const [sexualOrientation, setSexualOrientation] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { dob, _height, religious } = route.params || {};

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[2]}>
        <HeaderComponent
          title="Onboarding"
          theme={theme}
          textWidth="102%"
          topSpace="small"
          size="title"
          LeftComp={() => (
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.base}
            />
          )}
          RightComp={() => (
            <NextNavigation
              theme={theme}
              color={theme.colors.brand.base}
              nextFunction={() => {
                if (sexualOrientation) {
                  navigation.navigate("capture-looking-for-screen", {
                    dob,
                    _height,
                    religious,
                    sexualOrientation,
                  });
                } else {
                  setPageError(true);
                }
              }}
            />
          )}
        />
        <HorizontalPaddingSpace
          space={theme.space[3]}
          style={{
            height: height,
          }}>
          <Spacer position="top" size="xxxxlarge">
            <Text
              variant="custom"
              colorType="lines"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              We would love to know
            </Text>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h4"
              lineHeight={theme.lineHeights[25]}
              width="100%">
              your sexual orientation?
            </Text>
          </Spacer>
          <OnboardingErrorComponent
            pageError={pageError}
            text="Please provide your sexual orientation"
            size="body"
            classes={{
              textAlign: "left",
              color: theme.colors.brand.error,
              fontFamily: theme.fonts.montserratSemibold,
              fontSize: theme.spaceNumber[7],
              marginTop: theme.spaceNumber[2],
            }}
          />
          <Spacer position="top" size="xxxlarge">
            <DropdownSelection
              data={sexualOrientationList}
              isOpen={isOpen}
              setOpen={setOpen}
              value={sexualOrientation}
              setFunction={setSexualOrientation}
              theme={theme}
              isForHeightComponent={false}
            />
          </Spacer>
        </HorizontalPaddingSpace>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
