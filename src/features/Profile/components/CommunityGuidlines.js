import React from "react";
import HTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HeaderComponent from "../../../components/general-component/HeaderComponent";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { communityguidelinetext } from "../../../constants";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { ScrollView } from "react-native";
import { Text } from "../../../components/typography/text.component";

const CommunityGuidelines = ({ theme, setModalOpen }) => {
  const { height, width } = useWindowDimensions();
  return (
    <SafeArea style={{ width: width, height: height }}>
      <HeaderComponent
        title="Community Guidelines"
        textWidth="90%"
        hideLogo={true}
        theme={theme}
        LeftComp={() => (
          <View
            style={{
              marginLeft: theme.spaceNumber[2],
            }}>
            <IconComponent
              iconFunction={() => {
                setModalOpen({ type: "", open: false });
              }}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.brandFade}
              horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
            />
          </View>
        )}
        RightComp={() => <></>}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="top" size="xxxlarge">
          <HorizontalPaddingSpace space={theme.space[2]}>
            <Text
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3">
              Wiingr Member
            </Text>
            <Text
              style={{ marginTop: -theme.spaceNumberBy10[1] }}
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3">
              Principles, Expectations
            </Text>
            <Text
              style={{ marginTop: -theme.spaceNumberBy10[1] }}
              variant="custom"
              colorType="black"
              fontType="arimaMadurai"
              fontSize="h3">
              & Reporting
            </Text>
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer position="top" size="large">
          <HorizontalPaddingSpace space={theme.space[2]}>
            <HTML source={{ html: communityguidelinetext }} />
          </HorizontalPaddingSpace>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

export default CommunityGuidelines;
