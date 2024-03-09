import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  storeandusedeviceinformation,
  storeandusedeviceinformationp1,
  storeandusedeviceinformationp2,
  storeandusedeviceinformationp3,
  storeandusedeviceinformationp4,
  storeandusedeviceinformationp5,
} from "../../../constants";
import { Text } from "../../../components/typography/text.component";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import IconComponent from "../../../components/icon-components/IconComponent";
import { ScrollView, Switch, View } from "react-native";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";

const StoreAndAccessInformationModal = ({
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
        RightComp={() => (
          <View style={{ marginRight: theme.spaceNumber[2] }}>
            <Switch
              trackColor={{
                false: theme.colors.brand.linesLight,
                true: theme.colors.brand.base,
              }}
              thumbColor={
                currentUser?.phoneDataStorageAndRetrievalGrant
                  ? theme.colors.brand.highlight
                  : theme.colors.brand.lines
              }
              onValueChange={async (val) => {
                await updateUserValueField(
                  "all-users",
                  currentUser?.id,
                  "phoneDataStorageAndRetrievalGrant",
                  val,
                  setIsTrigger
                );
              }}
              value={currentUser?.phoneDataStorageAndRetrievalGrant}
            />
          </View>
        )}
      />
      <HorizontalPaddingSpace space={theme.space[2]}>
        <Spacer position="top" size="small" style={{ width: "90%" }}>
          <Text
            variant="custom"
            colorType="lines"
            fontType="montserratRegular"
            fontSize="caption"
            lineHeight={theme.lineHeights[3]}>
            {storeandusedeviceinformation}
          </Text>
        </Spacer>
        <Spacer position="top" size="xxlarge">
          <Spacer
            position="top"
            size="small"
            style={{
              width: "95%",
              borderBottomWidth: 0.5,
              borderColor: theme.colors.brand.linesLighter,
              paddingBottom: theme.spaceNumber[2],
            }}>
            <Text
              variant="custom"
              colorType="lines"
              fontType="montserratBold"
              fontSize="caption"
              lineHeight={theme.lineHeights[3]}>
              Here's why allowing the app to store and use this information can
              benefit you:
            </Text>
          </Spacer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: theme.spaceNumberBy50[6] + theme.spaceNumberBy10[3],
            }}>
            <Spacer position="top" size="small" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                Phone Number:{" "}
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption"
                  lineHeight={theme.lineHeights[3]}>
                  {storeandusedeviceinformationp1}
                </Text>
              </Text>
            </Spacer>
            <Spacer position="top" size="large" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                Last Click (Swipe) Index:{" "}
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption"
                  lineHeight={theme.lineHeights[3]}>
                  {storeandusedeviceinformationp2}
                </Text>
              </Text>
            </Spacer>
            <Spacer position="top" size="large" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                Match ID:{" "}
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption"
                  lineHeight={theme.lineHeights[3]}>
                  {storeandusedeviceinformationp3}
                </Text>
              </Text>
            </Spacer>
            <Spacer position="top" size="large" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                {storeandusedeviceinformationp4}
              </Text>
            </Spacer>
            <Spacer position="top" size="large" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                {storeandusedeviceinformationp4}
              </Text>
            </Spacer>
            <Spacer position="top" size="large" style={{ width: "90%" }}>
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                {storeandusedeviceinformationp5}
              </Text>
            </Spacer>
          </ScrollView>
        </Spacer>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default StoreAndAccessInformationModal;
