import React, { useState } from "react";
import { Pressable, Switch, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import HeaderComponent from "../../../components/general-component/HeaderComponent";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  strictlynecessarypermissionsmessage,
  personalizemarkingserviceinfo,
  privacypreferencemessage,
  storeandusedeviceinformation,
} from "../../../constants";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { ScrollView } from "react-native";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import StrictlyNecessaryPermissionModal from "./StrictlyNecessaryPermissionModal";
import StoreAndAccessInformationModal from "./StoreAndAccessInformationModal.";
import CustomizedMarketingSolutuonModal from "./CustomizedMarketingSolutionModal";

const PrivacyPreference = ({
  theme,
  title,
  setModalOpen,
  currentUser,
  setIsTrigger,
}) => {
  const [allowAllServices, setAllowAllServices] = useState(
    currentUser?.allowAllServices ?? false
  );
  const [
    showStrictlyNecessaryPermissionModal,
    setShowStrictlyNecessaryPermissionModal,
  ] = useState(false);
  const [
    showStoreAndAccessInformationModal,
    setShowStoreAndAccessInformationModal,
  ] = useState(false);
  const [
    showCustomizedMarketingSolutionModal,
    setShowCustomizedMarketingSolutionModal,
  ] = useState(false);

  return (
    <SafeArea style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          width: "100%",
          borderBottomWidth: 0.5,
          borderColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
        }}>
        <HeaderComponent
          title={title}
          hideLogo={true}
          theme={theme}
          LeftComp={() => (
            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text
                variant="custom"
                colorType="base"
                fontType="montserratBold"
                fontSize="caption">
                Cancel
              </Text>
            </TouchableOpacity>
          )}
          RightComp={() => (
            <TouchableOpacity
              onPress={async () => {
                const privacyPreferenceConfirmation = {
                  phoneDataStorageAndRetrievalGrant:
                    currentUser?.phoneDataStorageAndRetrievalGrant,
                  allowAllServices: currentUser?.allowAllServices,
                  enableAllMarketingTool: currentUser?.enableAllMarketingTool,
                };
                await updateUserValueField(
                  "all-users",
                  currentUser?.id,
                  "privacyPreferenceConfirmation",
                  privacyPreferenceConfirmation,
                  setIsTrigger
                );
              }}>
              <Text
                variant="custom"
                colorType="base"
                fontType="montserratBold"
                fontSize="caption">
                Confirm
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer position="bottom" size="xxlarge">
          {/* ############################################################################ */}
          {/* Allow all Services */}
          <Spacer position="top" size="large">
            <HorizontalPaddingSpace space={theme.space[2]}>
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
            <HorizontalPaddingSpace space={theme.space[2]}>
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
                    {allowAllServices
                      ? "By default, new features will be enabled."
                      : "Only Strictly Necessary Services are enabled."}
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
                    setAllowAllServices(val);
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

          {/* ############################################################################ */}
          {/* Manage Consent Preferences */}
          <Spacer
            position="top"
            size="xxxxlarge"
            style={{
              borderBottomWidth: 0.5,
              borderColor: theme.colors.brand.linesLighter,
              paddingBottom: theme.spaceNumber[3],
            }}>
            <HorizontalPaddingSpace space={theme.space[2]}>
              <View>
                <Text
                  variant="custom"
                  colorType="linesLight"
                  fontType="montserratBold"
                  fontSize="button">
                  Manage Consent Preferences
                </Text>
              </View>
            </HorizontalPaddingSpace>
          </Spacer>

          {/* ############################################################################ */}
          {/* Strictly Necessary Permissions */}
          <HorizontalPaddingSpace space={theme.space[2]}>
            <Spacer
              position="top"
              size="medium"
              style={{
                borderBottomWidth: 0.5,
                borderColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumber[6],
              }}>
              <Pressable
                onPress={() => setShowStrictlyNecessaryPermissionModal(true)}
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
                    Strictly Necessary Permissions
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: theme.spaceNumber[2],
                  }}>
                  <IconComponent
                    iconFunction={() =>
                      setShowStrictlyNecessaryPermissionModal(true)
                    }
                    iconName="keyboard-arrow-right"
                    IconComponent={MaterialIcons}
                    size={20}
                    color={theme.colors.brand.brandTone}
                  />
                </View>
              </Pressable>
            </Spacer>
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
                  {strictlynecessarypermissionsmessage}
                </Text>
              </View>
            </Spacer>
          </HorizontalPaddingSpace>

          {/* ############################################################################ */}
          {/* Store and/or access information */}
          <HorizontalPaddingSpace space={theme.space[2]}>
            <Spacer
              position="top"
              size="medium"
              style={{
                borderBottomWidth: 0.5,
                borderColor: theme.colors.brand.linesLighter,
                paddingBottom: theme.spaceNumber[6],
              }}>
              <Pressable
                onPress={() => setShowStoreAndAccessInformationModal(true)}
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
                    Store and/or access information on device
                  </Text>
                </View>
                <View
                  style={{
                    marginRight: theme.spaceNumber[2],
                  }}>
                  <IconComponent
                    iconFunction={() =>
                      setShowStoreAndAccessInformationModal(true)
                    }
                    iconName="keyboard-arrow-right"
                    IconComponent={MaterialIcons}
                    size={20}
                    color={theme.colors.brand.brandTone}
                  />
                </View>
              </Pressable>
            </Spacer>
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
                  {storeandusedeviceinformation}
                </Text>
              </View>
            </Spacer>
          </HorizontalPaddingSpace>

          {/* ############################################################################ */}
          {/* Customized Marketing Solutions. */}
          <HorizontalPaddingSpace space={theme.space[2]}>
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
              <Pressable
                onPress={() => setShowCustomizedMarketingSolutionModal(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                  <View style={{ width: "90%" }}>
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
                    iconFunction={() =>
                      setShowCustomizedMarketingSolutionModal(true)
                    }
                    iconName="keyboard-arrow-right"
                    IconComponent={MaterialIcons}
                    size={20}
                    color={theme.colors.brand.brandTone}
                  />
                </View>
              </Pressable>
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

      {/* ############################################################### */}
      {/* Strictly Necessary Permissions modal */}
      <AnimatedModal
        isVisible={showStrictlyNecessaryPermissionModal}
        onClose={() => setShowStrictlyNecessaryPermissionModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <StrictlyNecessaryPermissionModal
          currentUser={currentUser}
          theme={theme}
          title="Strictly Necessary"
          onClose={() => setShowStrictlyNecessaryPermissionModal(false)}
        />
      </AnimatedModal>

      {/* ############################################################### */}
      {/* Store and/or access information on device modal */}
      <AnimatedModal
        isVisible={showStoreAndAccessInformationModal}
        onClose={() => setShowStoreAndAccessInformationModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <StoreAndAccessInformationModal
          currentUser={currentUser}
          theme={theme}
          title="Device Information"
          onClose={() => setShowStoreAndAccessInformationModal(false)}
          setIsTrigger={setIsTrigger}
        />
      </AnimatedModal>

      {/* ############################################################### */}
      {/* Store and/or access information on device modal */}
      <AnimatedModal
        isVisible={showCustomizedMarketingSolutionModal}
        onClose={() => setShowCustomizedMarketingSolutionModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <CustomizedMarketingSolutuonModal
          currentUser={currentUser}
          theme={theme}
          title="Marketing Solution"
          onClose={() => setShowCustomizedMarketingSolutionModal(false)}
          setIsTrigger={setIsTrigger}
        />
      </AnimatedModal>
    </SafeArea>
  );
};

export default PrivacyPreference;
