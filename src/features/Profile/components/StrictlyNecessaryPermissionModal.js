import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { strictlynecessarypermissionsmessage } from "../../../constants";
import { Text } from "../../../components/typography/text.component";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import IconComponent from "../../../components/icon-components/IconComponent";
import { View } from "react-native";
import TextAndIconComponent from "./TextAndIconComponent";

const StrictlyNecessaryPermissionModal = ({
  currentUser,
  theme,
  title,
  onClose,
}) => {
  return (
    <SafeArea style={{ width: "100%" }}>
      <HeaderComponent
        title={title}
        textWidth="93%"
        hideLogo={true}
        theme={theme}
        isBorder={true}
        LeftComp={() => (
          <View
            style={{
              marginLeft: theme.spaceNumber[2],
            }}>
            <IconComponent
              iconFunction={onClose}
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
      <HorizontalPaddingSpace space={theme.space[2]}>
        <Spacer position="top" size="small" style={{ width: "90%" }}>
          <Text
            variant="custom"
            colorType="lines"
            fontType="montserratRegular"
            fontSize="caption"
            lineHeight={theme.lineHeights[3]}>
            {strictlynecessarypermissionsmessage}
          </Text>
        </Spacer>
      </HorizontalPaddingSpace>
      <Spacer position="top" size="xxlarge">
        <TextAndIconComponent
          currentUserGrantType={currentUser?.cloudinaryAccessGrant}
          pressFunction={() => {}}
          theme={theme}
          title="Cloudinary"
          value="View Details"
          font="montserratRegular"
          size="caption"
          isSwitch={true}
          disabled={true}
        />
      </Spacer>
      <TextAndIconComponent
        currentUserGrantType={currentUser?.expoLocationAccessGrant}
        pressFunction={() => {}}
        theme={theme}
        title="Expo"
        value="View Details"
        font="montserratRegular"
        size="caption"
        isSwitch={true}
        disabled={true}
      />

      <TextAndIconComponent
        currentUserGrantType={currentUser?.googlefirebaseAccessGrant}
        pressFunction={() => {}}
        theme={theme}
        title="Google Firebase"
        value="View Details"
        font="montserratRegular"
        size="caption"
        isSwitch={true}
        disabled={true}
      />
      <TextAndIconComponent
        currentUserGrantType={currentUser?.lottieAccessGrant}
        pressFunction={() => {}}
        theme={theme}
        title="Lottie"
        value="View Details"
        font="montserratRegular"
        size="caption"
        isSwitch={true}
        disabled={true}
      />
    </SafeArea>
  );
};

export default StrictlyNecessaryPermissionModal;
