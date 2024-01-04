import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import Avatar from "./Avatar";
import { Text } from "../../../components/typography/text.component";

export default function MessageScreen({ navigation }) {
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { currentUser, match } = route.params || {};

  return (
    <SafeArea>
      <HorizontalPaddingSpace
        style={{
          marginTop: Platform.OS !== "ios" ? 40 : 20,
        }}
        space={theme.space[5]}>
        <NavigationBar>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.brandFade}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: theme.spaceNumberBy10[1],
              }}>
              <Avatar data={match} theme={theme} dimensionIndex={4} />
              <Text
                style={{ marginLeft: theme.spaceNumber[3] }}
                variant="subHeading"
                colorType="black"
                fontType="montserratBold"
                fontSize="title">
                {match?.firstname}
              </Text>
            </View>
          </View>
          <IconComponent
            iconFunction={() => {}}
            iconName="dots-vertical"
            IconComponent={MaterialCommunityIcons}
            size={30}
            color={theme.colors.brand.brandFade}
          />
        </NavigationBar>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
