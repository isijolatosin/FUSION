import React from "react";
import { Pressable, Switch, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import HeaderComponent from "./HeaderComponent";
import { SafeArea } from "../utility/safe-area.component";
import { Text } from "../typography/text.component";
import {
  enssentialpermissionsmessage,
  personalizemarkingserviceinfo,
  privacypreferencemessage,
} from "../../constants";
import { Spacer } from "../spacer/spacer.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../icon-components/IconComponent";
import { ScrollView } from "react-native";

const PrivacyPreference = ({
  theme,
  title,
  setModalOpen,
  currentUser,
  setIsTrigger,
}) => {
  return (
    <SafeArea style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 0.5,
          borderColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
          paddingRight: theme.spaceNumber[3],
        }}>
        <HeaderComponent
          title={title}
          hideLogo={true}
          theme={theme}
          font="montserratSemibold"
          size="title"
          LeftComp={() => (
            <Pressable
              onPress={() => setModalOpen(false)}
              style={{ marginLeft: -theme.spaceNumber[3] }}>
              <IconComponent
                iconFunction={() => setModalOpen(false)}
                iconName="keyboard-arrow-left"
                IconComponent={MaterialIcons}
                size={35}
                color={theme.colors.brand.brandTone}
              />
            </Pressable>
          )}
          RightComp={() => (
            <Pressable onPress={() => setModalOpen(false)}>
              <IconComponent
                iconFunction={() => setModalOpen(false)}
                iconName="done"
                IconComponent={MaterialIcons}
                size={20}
                color={theme.colors.brand.brandTone}
              />
            </Pressable>
          )}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="bottom" size="xxlarge">
          <Spacer position="top" size="large">
            <HorizontalPaddingSpace space={theme.space[3]}>
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="caption"
                lineHeight={theme.lineHeights[3]}>
                {privacypreferencemessage}
              </Text>
            </HorizontalPaddingSpace>
          </Spacer>
          <Spacer position="top" size="xxxlarge">
            <HorizontalPaddingSpace space={theme.space[3]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                  borderColor: theme.colors.brand.linesLighter,
                  paddingBottom: theme.spaceNumber[8],
                }}>
                <View>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="caption">
                    Allow All Services
                  </Text>
                  <Text
                    variant="custom"
                    colorType="lines"
                    fontType="montserratRegular"
                    fontSize="caption">
                    By default, new features will be enabled.
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: theme.colors.brand.linesLight,
                    true: theme.colors.brand.base,
                  }}
                  thumbColor={
                    currentUser?.allowAllServices
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.lines
                  }
                  onValueChange={async (val) => {
                    await updateUserValueField(
                      "all-users",
                      currentUser?.id,
                      "allowAllServices",
                      val,
                      setIsTrigger
                    );
                  }}
                  value={currentUser?.allowAllServices}
                />
              </View>
            </HorizontalPaddingSpace>
          </Spacer>
          <Spacer
            position="top"
            size="xxxxlarge"
            style={{
              borderBottomWidth: 0.5,
              borderColor: theme.colors.brand.linesLighter,
              paddingBottom: theme.spaceNumber[3],
            }}>
            <HorizontalPaddingSpace space={theme.space[3]}>
              <View>
                <Text
                  variant="custom"
                  colorType="linesLight"
                  fontType="montserratBold"
                  fontSize="button">
                  Administer Utilities
                </Text>
              </View>
            </HorizontalPaddingSpace>
          </Spacer>
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Spacer
              position="top"
              size="medium"
              style={{
                borderBottomWidth: 0.5,
                borderColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumber[6],
              }}>
              <Pressable
                onPress={() => {}}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <View>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="caption">
                    Essential Permissions
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: theme.spaceNumber[2],
                  }}>
                  <IconComponent
                    iconFunction={() => {}}
                    iconName="keyboard-arrow-right"
                    IconComponent={MaterialIcons}
                    size={20}
                    color={theme.colors.brand.brandTone}
                  />
                </View>
              </Pressable>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Spacer
              position="top"
              size="small"
              style={{
                borderBottomWidth: 0.5,
                borderColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumberBy10[3],
              }}>
              <View style={{ width: "85%" }}>
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption"
                  lineHeight={theme.lineHeights[3]}>
                  {enssentialpermissionsmessage}
                </Text>
              </View>
            </Spacer>
            <Spacer
              position="top"
              size="large"
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 0.5,
                borderColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumber[7],
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption"
                  lineHeight={theme.lineHeights[3]}>
                  Customized Marketing Solutions.
                </Text>
                <View>
                  <Text
                    variant="custom"
                    colorType="lines"
                    fontType="montserratRegular"
                    fontSize="caption"
                    lineHeight={theme.lineHeights[3]}>
                    I am activating Marketing Services. New marketing features
                    will be enabled.
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginRight: theme.spaceNumber[2],
                }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="keyboard-arrow-right"
                  IconComponent={MaterialIcons}
                  size={20}
                  color={theme.colors.brand.brandTone}
                />
              </View>
            </Spacer>
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
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

export default PrivacyPreference;
