import React, { useState } from "react";
import {
  View,
  ScrollView,
  Switch,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import { deactivateaccounttext, deleteaccounttext } from "../../../constants";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import { database } from "../../../../config";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import ContactModal from "./ContactModal";

export default function SettingModal({
  theme,
  currentUser,
  openSettingModal,
  onClose,
}) {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const [openContactModal, setOpenContactModal] = useState(false);
  const [inAppNotification, setInAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [deactivateAccount, setDeactivateAccount] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [messageSentNote, setMessageSentNote] = useState(false);
  const [selectedHelp, setSelectedHelp] = useState("");
  const [selectedHelpValue, setSelectedHelpValue] = useState("");
  const userId = currentUser?.id;

  async function handleDeleteUserProfile(val) {
    if (val) {
      // delete from all users
      database
        .collection("all-users")
        .doc(userId)
        .delete()
        .then(() => {
          console.log("User successfully deleted!");
        })
        .catch((_error) => {
          console.error("Error deleting user with Id: ", userId);
        });

      //delete from all likes
      const allLikesRef = database.collection("all-likes");
      const querySnapshot = await allLikesRef.get();
      querySnapshot.forEach(async (doc) => {
        const docData = doc.data();
        const likedBy = docData?.likedBy;
        const profileLikedNumber = docData?.profileLikedNumber;

        if (profileLikedNumber === currentUser?.phonenumber) {
          await doc.ref.delete();
        }
        if (likedBy?.phonenumber === currentUser?.phonenumber) {
          await doc.ref.delete();
        }
      });

      await clearDataByKey("match-id");
      await clearDataByKey("phonenumber");
      await clearDataByKey("refreshChatScreen");

      setTimeout(() => {
        onClose();
        navigation.navigate("onBoard");
      }, 500);

      return () => clearTimeout(userTimeoutId);
    }
  }

  async function handleSignOut() {
    await clearDataByKey("phonenumber");
    await clearDataByKey("match-id");
    await clearDataByKey("refreshChatScreen");
    setTimeout(() => {
      onClose();
      navigation.navigate("onBoard");
    }, 500);

    return () => clearTimeout(userTimeoutId);
  }

  function onCloseContactModal() {
    setOpenContactModal(false);
    setSelectedHelp("");
    setSelectedHelpValue("");
    setMessageSentNote(false);
  }

  return (
    <AnimatedModal
      isVisible={openSettingModal}
      onClose={onClose}
      theme={theme}
      width={width}>
      <Spacer
        style={{ paddingTop: theme.spaceNumberBy10[2] }}
        position="top"
        size="xxxxlarge">
        <HorizontalPaddingSpace
          style={{
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            width: width,
          }}
          space={theme.space[5]}>
          <IconComponent
            iconFunction={onClose}
            iconName="chevron-back"
            IconComponent={Ionicons}
            size={theme.spaceNumberBy10[2]}
            color={theme.colors.brand.brandFade}
            horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
          />
          <Text
            style={{
              textAlign: "center",
              width: "90%",
            }}
            variant="custom"
            colorType="black"
            fontType="playfairbold"
            fontSize="h4">
            Settings
          </Text>
        </HorizontalPaddingSpace>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="xxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Account Settings
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
            }}
            space={theme.space[5]}>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="medium">
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Phone Number
                </Text>
              </View>
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="caption">
                  {currentUser?.phonenumber}
                </Text>
              </View>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="medium">
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Email Address
                </Text>
              </View>
              <View>
                <Text
                  style={{ textTransform: "lowercase" }}
                  variant="custom"
                  colorType="black"
                  fontType="montserratRegular"
                  fontSize="caption">
                  {currentUser?.email}
                </Text>
              </View>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="xxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Notification Settings
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
            }}
            space={theme.space[5]}>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              position="top"
              size="small">
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  In-App Notification
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: theme.colors.brand.linesLight,
                  true: theme.colors.brand.base,
                }}
                thumbColor={
                  inAppNotification
                    ? theme.colors.brand.highlight
                    : theme.colors.brand.lines
                }
                onValueChange={async (val) => {
                  setInAppNotification(val);
                  await updateUserValueField(
                    "all-users",
                    userId,
                    "inAppNotification",
                    val,
                    () => {}
                  );
                }}
                value={inAppNotification}
              />
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              position="top"
              size="small">
              <View>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Email Notification
                </Text>
              </View>
              <Switch
                trackColor={{
                  false: theme.colors.brand.linesLight,
                  true: theme.colors.brand.base,
                }}
                thumbColor={
                  emailNotification
                    ? theme.colors.brand.highlight
                    : theme.colors.brand.lines
                }
                onValueChange={async (val) => {
                  setEmailNotification(val);
                  await updateUserValueField(
                    "all-users",
                    userId,
                    "emailNotification",
                    val,
                    () => {}
                  );
                }}
                value={emailNotification}
              />
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="xxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Profile Settings
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="small">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <View>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="caption">
                    Deactivate Account
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: theme.colors.brand.linesLight,
                    true: theme.colors.brand.base,
                  }}
                  thumbColor={
                    deactivateAccount
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.lines
                  }
                  onValueChange={async (val) => {
                    setDeactivateAccount(val);
                    await updateUserValueField(
                      "all-users",
                      userId,
                      "deactivateAccount",
                      val,
                      () => {}
                    );
                  }}
                  value={deactivateAccount}
                />
              </View>
              <Spacer position="top" size="small">
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption">
                  {deactivateaccounttext}
                </Text>
              </Spacer>
            </Spacer>
            <Spacer position="top" size="small">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <View>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="caption">
                    Delete Account
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: theme.colors.brand.linesLight,
                    true: theme.colors.brand.base,
                  }}
                  thumbColor={
                    deleteAccount
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.lines
                  }
                  onValueChange={(val) => {
                    setDeleteAccount(val);
                    // handleDeleteUserProfile(val); open when app is ready to deploy
                  }}
                  value={deleteAccount}
                />
              </View>
              <Spacer position="top" size="small">
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption">
                  {deleteaccounttext}
                </Text>
              </Spacer>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Help Center
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
            }}
            space={theme.space[5]}>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              position="top"
              size="medium">
              <View style={{ flex: 0.8 }}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Contact Us
                </Text>
              </View>
              <TouchableOpacity
                style={{ flex: 0.2, alignItems: "flex-end" }}
                onPress={() => setOpenContactModal(true)}>
                <IconComponent
                  iconFunction={() => setOpenContactModal(true)}
                  iconName="chevron-right"
                  IconComponent={Octicons}
                  size={theme.spaceNumberBy10[1]}
                  color={theme.colors.brand.brandFade}
                />
              </TouchableOpacity>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[5]}>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Legal
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              paddingBottom: theme.spaceNumberBy10[2],
            }}
            space={theme.space[5]}>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              position="top"
              size="medium">
              <View style={{ flex: 0.8 }}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Privacy Policy
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 0.2, alignItems: "flex-end" }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="chevron-right"
                  IconComponent={Octicons}
                  size={theme.spaceNumberBy10[1]}
                  color={theme.colors.brand.brandFade}
                />
              </TouchableOpacity>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              position="top"
              size="medium">
              <View style={{ flex: 0.8 }}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="caption">
                  Terms of Service
                </Text>
              </View>
              <TouchableOpacity style={{ flex: 0.2, alignItems: "flex-end" }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="chevron-right"
                  IconComponent={Octicons}
                  size={theme.spaceNumberBy10[1]}
                  color={theme.colors.brand.brandFade}
                />
              </TouchableOpacity>
            </Spacer>
          </HorizontalPaddingSpace>
          <TouchableOpacity
            // onPress={handleSignOut} // open when app is ready to deploy
            style={{
              marginBottom: theme.spaceNumberBy50[1],
            }}>
            <Text
              style={{
                textAlign: "center",
                backgroundColor: theme.colors.brand.highlight,
                paddingVertical: theme.spaceNumberBy10[1],
              }}
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="body">
              Log Out
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Spacer>
      <ContactModal
        currentUser={currentUser}
        messageSentNote={messageSentNote}
        openContactModal={openContactModal}
        onCloseContactModal={onCloseContactModal}
        selectedHelp={selectedHelp}
        selectedHelpValue={selectedHelpValue}
        setMessageSentNote={setMessageSentNote}
        setSelectedHelp={setSelectedHelp}
        setSelectedHelpValue={setSelectedHelpValue}
        theme={theme}
        width={width}
      />
    </AnimatedModal>
  );
}
