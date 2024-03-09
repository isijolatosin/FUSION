import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { personalizemarkingserviceinfo } from "../../../constants";
import { Text } from "../../../components/typography/text.component";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import IconComponent from "../../../components/icon-components/IconComponent";
import TextAndIconComponent from "./TextAndIconComponent";
import { View } from "react-native";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";

const CustomizedMarketingSolutuonModal = ({
  currentUser,
  theme,
  title,
  onClose,
  setIsTrigger,
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
            {personalizemarkingserviceinfo}
          </Text>
        </Spacer>
      </HorizontalPaddingSpace>
      <Spacer position="top" size="xxlarge">
        <TextAndIconComponent
          currentUserGrantType={currentUser?.enableAllMarketingTool}
          pressFunction={() => {}}
          theme={theme}
          title="Enable all new tools"
          value="Enabling this toggle will activate new tools automatically"
          font="montserratRegular"
          size="caption"
          isSwitch={true}
          compFunction={async (val) => {
            await updateUserValueField(
              "all-users",
              currentUser?.id,
              "enableAllMarketingTool",
              val,
              setIsTrigger
            );
          }}
        />
      </Spacer>
    </SafeArea>
  );
};

export default CustomizedMarketingSolutuonModal;
