import React, { Fragment, useState } from "react";
import {
  View,
  ScrollView,
  Switch,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Linking,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons, Octicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Spacer } from "../../../components/spacer/spacer.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Text } from "../../../components/typography/text.component";
import {
  pauseaccounttext,
  deleteaccounttext,
  deactivateaccounttext,
  deleteaccountconfirmationtext,
} from "../../../constants";
import {
  removeItemFromArray,
  updateUserValueField,
} from "../../../utilities/updateFirestoreDatabaseField";
import firebase, { auth, database } from "../../../../config";
import { clearDataByKey } from "../../../utilities/removeDataFromPhoneMemory";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import ContactModal from "./ContactModal";
import EmailUpdateModal from "./EmailUpdateModal";
import ActionNotificationModal from "../../../components/general-component/ActionNotificationModal";
import PrivacyPreference from "./PrivacyPreference";
import HeaderComponent from "../../../components/general-component/HeaderComponent";
import CommunityGuidelines from "./CommunityGuidlines";

export default function SettingModal({
  theme,
  currentUser,
  openSettingModal,
  onClose,
  setIsTrigger,
}) {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  const [openContactModal, setOpenContactModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openEmailUpdateModal, setOpenEmailUpdateModal] = useState(false);
  const [messageSentNote, setMessageSentNote] = useState(false);
  const [pauseConfirmation, setPauseConfirmation] = useState(false);
  const [deactivateConfirmation, setDeactivateConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedHelp, setSelectedHelp] = useState("");
  const [selectedHelpValue, setSelectedHelpValue] = useState("");
  const userId = currentUser?.id;
  const [isOpenModal, setModalOpen] = useState({
    type: "",
    open: false,
  });

  async function handleDeleteUserProfile(val) {
    if (val) {
      // archive user
      database
        .collection("archive")
        .add({
          ...currentUser,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(async () => {
          console.log(`USER ARCHIVED SUCCESSFULLY`);

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

          //delete from all liked me list and list of all liked numbers array
          const allUsersRef = database.collection("all-users");
          const allUsersQuerySnapshot = await allUsersRef.get();
          allUsersQuerySnapshot.forEach((doc) => {
            const currentIterationUserData = doc.data();
            const currentIterationUserId = doc.id;

            if (
              currentIterationUserData?.likedMeList?.includes(
                currentUser?.phonenumber
              )
            ) {
              removeItemFromArray(
                "all-users",
                currentIterationUserId,
                "likedMeList",
                currentUser?.phonenumber,
                () => {}
              );
            }
            if (
              currentIterationUserData?.listOfAllLikedNumbers?.includes(
                currentUser?.phonenumber
              )
            ) {
              removeItemFromArray(
                "all-users",
                currentIterationUserId,
                "listOfAllLikedNumbers",
                currentUser?.phonenumber,
                () => {}
              );
            }
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

          // delete from matches
          const allMatches = database.collection("matches");
          const matchQuerySnapshot = await allMatches.get();
          matchQuerySnapshot.forEach(async (doc) => {
            const currentIterationMatchData = doc.data();

            if (
              currentIterationMatchData?.likedByprofile?.phonenumber ===
              currentUser?.phonenumber
            ) {
              await doc.ref.delete();

              // Get a reference to the message and delete messages
              const messageRef = database
                .collection("matches")
                .doc(doc?.id)
                .collection("messages");
              const querySnapshot = await messageRef.get();

              querySnapshot.forEach(async (doc) => {
                await doc.ref.delete();
              });
            }
            if (
              currentIterationMatchData?.likedProfile?.phonenumber ===
              currentUser?.phonenumber
            ) {
              await doc.ref.delete();

              // Get a reference to the message and delete messages
              const messageRef = database
                .collection("matches")
                .doc(doc?.id)
                .collection("messages");
              const querySnapshot = await messageRef.get();

              querySnapshot.forEach(async (doc) => {
                await doc.ref.delete();
              });
            }
          });

          // delete from friendship-matches
          const allFriendshipMatches =
            database.collection("friendship-matches");
          const friendshipMatchQuerySnapshot = await allFriendshipMatches.get();
          friendshipMatchQuerySnapshot.forEach(async (doc) => {
            const currentIterationFriendshipMatchData = doc.data();

            if (
              currentIterationFriendshipMatchData?.friendshipRequestFrom
                ?.phonenumber === currentUser?.phonenumber
            ) {
              await doc.ref.delete();

              // Get a reference to the message and delete messages
              const messageRef = database
                .collection("friendship-matches")
                .doc(doc?.id)
                .collection("messages");
              const querySnapshot = await messageRef.get();

              querySnapshot.forEach(async (doc) => {
                await doc.ref.delete();
              });
            }
            if (
              currentIterationFriendshipMatchData?.friendshipRequestTo
                ?.phonenumber === currentUser?.phonenumber
            ) {
              await doc.ref.delete();

              // Get a reference to the message and delete messages
              const messageRef = database
                .collection("friendship-matches")
                .doc(doc?.id)
                .collection("messages");
              const querySnapshot = await messageRef.get();

              querySnapshot.forEach(async (doc) => {
                await doc.ref.delete();
              });
            }
          });

          //delete user from authentication
          const user = auth.currentUser;
          if (user) {
            user
              .delete()
              .then(() => {
                console.log("User account deleted successfully.");
              })
              .catch((error) => {
                console.error("Error deleting user account:", error);
              });
          } else {
            console.error("No user signed in or user object is not available.");
          }

          await clearDataByKey("match-id");
          await clearDataByKey("phonenumber");
          await clearDataByKey("swipe-index");
          await clearDataByKey("last-screen-visit");

          const userProfileDeleteTimeoutId = setTimeout(() => {
            navigation.navigate("onBoard");
            setShowDeleteModal(false);
            setDeleteConfirmation(false);
            onClose();
          }, 1000);

          const userProfileDeleteNavigateTimeoutId = setTimeout(() => {
            onClose();
          }, 1500);

          return () => {
            clearTimeout(userProfileDeleteTimeoutId);
            clearTimeout(userProfileDeleteNavigateTimeoutId);
          };
        })
        .catch((error) => console.log("Error " + error.message));
    }
  }

  async function handleSignOut() {
    await clearDataByKey("phonenumber");
    await clearDataByKey("match-id");
    await clearDataByKey("swipe-index");
    await clearDataByKey("last-screen-visit");

    const userSignOutTimeoutId = setTimeout(() => {
      const phone = currentUser?.phonenumber;
      navigation.navigate("onBoard");
      auth.signOut();
    }, 500);

    const userNavigateTimeoutId2 = setTimeout(() => {
      onClose();
    }, 1000);

    return () => {
      clearTimeout(userSignOutTimeoutId);
      clearTimeout(userNavigateTimeoutId2);
    };
  }

  function onCloseContactModal() {
    setOpenContactModal(false);
    setSelectedHelp("");
    setSelectedHelpValue("");
    setMessageSentNote(false);
  }

  function TextIconComponent({ compFunction, title }) {
    return (
      <Pressable onPress={compFunction}>
        <Spacer
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          position="top"
          size="medium">
          <View
            style={{
              flex: 0.8,
            }}>
            <Text
              variant="custom"
              colorType="black"
              fontType="montserratBold"
              fontSize="caption">
              {title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={compFunction}
            style={{
              flex: 0.2,
              alignItems: "flex-end",
              marginRight: theme.spaceNumber[5],
            }}>
            <IconComponent
              iconFunction={compFunction}
              iconName="chevron-right"
              IconComponent={Octicons}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.brandFade}
            />
          </TouchableOpacity>
        </Spacer>
      </Pressable>
    );
  }

  function dynamicComponent() {
    switch (isOpenModal.type) {
      case "privacy preference":
        return (
          <PrivacyPreference
            theme={theme}
            title="Privacy Preference"
            setModalOpen={setModalOpen}
            currentUser={currentUser}
            setIsTrigger={setIsTrigger}
          />
        );
      case "community guidelines":
        return (
          <CommunityGuidelines
            theme={theme}
            title="Privacy Preference"
            setModalOpen={setModalOpen}
          />
        );

      default:
        return;
    }
  }

  return (
    <AnimatedModal
      isVisible={openSettingModal}
      onClose={onClose}
      theme={theme}
      width={width}>
      <Spacer
        style={{ paddingTop: theme.spaceNumber[0] }}
        position="top"
        size="xxxxlarge">
        <HeaderComponent
          title="Settings"
          textWidth="94%"
          hideLogo={true}
          theme={theme}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[2]}>
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
            space={theme.space[2]}>
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
              <Pressable
                onPress={() => setOpenEmailUpdateModal(true)}
                style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: theme.spaceNumber[2] }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratBold"
                    fontSize="caption">
                    Email Address
                  </Text>
                </View>
                <IconComponent
                  iconFunction={() => setOpenEmailUpdateModal(true)}
                  iconName="edit"
                  IconComponent={AntDesign}
                  size={15}
                  color={theme.colors.brand.brandFade}
                />
              </Pressable>
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
            space={theme.space[2]}>
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
            space={theme.space[2]}>
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
                  currentUser?.inAppNotification
                    ? theme.colors.brand.highlight
                    : theme.colors.brand.lines
                }
                onValueChange={async (val) => {
                  await updateUserValueField(
                    "all-users",
                    userId,
                    "inAppNotification",
                    val,
                    setIsTrigger
                  );
                }}
                value={currentUser?.inAppNotification}
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
            space={theme.space[2]}>
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
            space={theme.space[2]}>
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
                    Pause Account
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: theme.colors.brand.linesLight,
                    true: theme.colors.brand.base,
                  }}
                  thumbColor={
                    currentUser?.pause
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.lines
                  }
                  onValueChange={async (val) => {
                    if (currentUser?.pause) {
                      await updateUserValueField(
                        "all-users",
                        userId,
                        "pause",
                        val,
                        setIsTrigger
                      );
                    } else {
                      const pauseId = setTimeout(() => {
                        setShowPauseModal(val);
                      }, 250);

                      return () => clearTimeout(pauseId);
                    }
                  }}
                  value={currentUser?.pause}
                />
              </View>
              <Spacer position="top" size="small">
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption">
                  {pauseaccounttext}
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
                    Deactivate Account
                  </Text>
                </View>
                <Switch
                  trackColor={{
                    false: theme.colors.brand.linesLight,
                    true: theme.colors.brand.base,
                  }}
                  thumbColor={
                    currentUser?.deactivate
                      ? theme.colors.brand.highlight
                      : theme.colors.brand.lines
                  }
                  onValueChange={async (val) => {
                    if (currentUser?.deactivate) {
                      await updateUserValueField(
                        "all-users",
                        userId,
                        "deactivate",
                        val,
                        setIsTrigger
                      );
                    } else {
                      const deactivateId = setTimeout(() => {
                        setShowDeactivateModal(val);
                      }, 250);

                      return () => clearTimeout(deactivateId);
                    }
                  }}
                  value={currentUser?.deactivate}
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
            <Spacer position="top" size="large">
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
                <TouchableOpacity
                  style={{
                    marginVertical: theme.spaceNumber[2],
                    backgroundColor: theme.colors.brand.base,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[6],
                    borderRadius: theme.spaceNumber[8],
                  }}
                  onPress={() => {
                    const deleteId = setTimeout(() => {
                      setShowDeleteModal(true);
                    }, 250);

                    return () => clearTimeout(deleteId);
                  }}>
                  <Text
                    variant="custom"
                    colorType="basewhite"
                    fontType="montserratBold"
                    fontSize="caption">
                    Delete
                  </Text>
                </TouchableOpacity>
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
            space={theme.space[2]}>
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
            space={theme.space[2]}>
            <Pressable
              onPress={() => currentUser?.email && setOpenContactModal(true)}
              style={{ paddingTop: theme.spaceNumber[4] }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
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
                  style={{
                    flex: 0.2,
                    alignItems: "flex-end",
                    marginRight: theme.spaceNumber[5],
                  }}
                  onPress={() =>
                    currentUser?.email && setOpenContactModal(true)
                  }>
                  <IconComponent
                    iconFunction={() =>
                      currentUser?.email && setOpenContactModal(true)
                    }
                    iconName="chevron-right"
                    IconComponent={Octicons}
                    size={theme.spaceNumberBy10[1]}
                    color={theme.colors.brand.brandFade}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: theme.spaceNumber[3] }}>
                <Text
                  variant="custom"
                  colorType="lines"
                  fontType="montserratRegular"
                  fontSize="caption">
                  Please verify that your email is registered with us.
                </Text>
              </View>
            </Pressable>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[2]}>
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
            space={theme.space[2]}>
            <TextIconComponent
              title="Privacy Policy"
              compFunction={() =>
                Linking.openURL(
                  `${Constants.expoConfig.extra.eas.baseurl}privacy`
                )
              }
            />
            <TextIconComponent
              title="Terms of Service"
              compFunction={() =>
                Linking.openURL(
                  `${Constants.expoConfig.extra.eas.baseurl}terms`
                )
              }
            />
            <TextIconComponent
              title="Privacy preference"
              compFunction={() =>
                setModalOpen({ type: "privacy preference", open: true })
              }
            />
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.brand.linesLight,
              paddingBottom: theme.spaceNumberBy10[0],
            }}
            space={theme.space[2]}>
            <Spacer position="top" size="xxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                Community
              </Text>
            </Spacer>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace
            style={{
              position: "relative",
              paddingBottom: theme.spaceNumberBy10[2],
            }}
            space={theme.space[2]}>
            <TextIconComponent
              title="Community guidelines"
              compFunction={() =>
                setModalOpen({ type: "community guidelines", open: true })
              }
            />
          </HorizontalPaddingSpace>
          <TouchableOpacity
            onPress={handleSignOut} // open when app is ready to deploy
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
      <AnimatedModal
        isVisible={openEmailUpdateModal}
        onClose={() => {
          setIsTrigger(true);
          setOpenEmailUpdateModal(false);
        }}
        theme={theme}
        width={width}>
        <EmailUpdateModal
          theme={theme}
          currentUser={currentUser}
          onClose={() => {
            {
              setIsTrigger(true);
              setOpenEmailUpdateModal(false);
            }
          }}
        />
      </AnimatedModal>

      {/*################ pause modal ##################*/}
      <AnimatedModal
        isVisible={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <ActionNotificationModal
          title="Are you sure?"
          buttonText="Pause Account"
          confirmation={pauseConfirmation}
          confirmationText="YOUR ACCOUNT HAS BEEN PAUSED"
          message={pauseaccounttext}
          theme={theme}
          functionCall={async () => {
            await updateUserValueField(
              "all-users",
              userId,
              "pause",
              showPauseModal,
              setIsTrigger
            );
            setPauseConfirmation(true);
          }}
          onClose={() => {
            setPauseConfirmation(false);
            setShowPauseModal(false);
          }}
          horizontalSpace={theme.space[2]}
        />
      </AnimatedModal>

      {/*################ deactivate modal ##################*/}
      <AnimatedModal
        isVisible={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <ActionNotificationModal
          title="Are you sure?"
          buttonText="Deactivate Account"
          confirmation={deactivateConfirmation}
          confirmationText="YOUR ACCOUNT HAS BEEN DEACTIVATED"
          message={deactivateaccounttext}
          theme={theme}
          functionCall={async () => {
            await updateUserValueField(
              "all-users",
              userId,
              "deactivate",
              showDeactivateModal,
              setIsTrigger
            );
            setDeactivateConfirmation(true);
          }}
          onClose={() => {
            setDeactivateConfirmation(false);
            setShowDeactivateModal(false);
          }}
          horizontalSpace={theme.space[2]}
        />
      </AnimatedModal>

      {/*################ delete modal ##################*/}
      <AnimatedModal
        isVisible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        theme={theme}
        width="100%"
        isTransparent={true}>
        <ActionNotificationModal
          title="Are you sure?"
          buttonText="Delete Account"
          confirmation={deleteConfirmation}
          confirmationText="YOUR ACCOUNT HAS BEEN DELETED"
          message={deleteaccountconfirmationtext}
          theme={theme}
          functionCall={() => {
            handleDeleteUserProfile(showDeleteModal);
            setDeleteConfirmation(true);
          }}
          onClose={() => {
            setDeleteConfirmation(false);
            setShowDeleteModal(false);
          }}
          horizontalSpace={theme.space[2]}
        />
      </AnimatedModal>
      <AnimatedModal
        isVisible={isOpenModal.open}
        onClose={() => {
          setModalOpen({ type: "", open: false });
        }}
        theme={theme}
        width={width}
        isTransparent={false}>
        <Fragment>{dynamicComponent(currentUser)}</Fragment>
      </AnimatedModal>
    </AnimatedModal>
  );
}
