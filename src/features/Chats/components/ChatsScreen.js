import React, { Fragment, useEffect, useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  updateUserValueField,
} from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import Avatar from "../../../components/general-component/Avatar";
import MessagesListItem from "./MessagesListItem";
import firebase, { database } from "../../../../config";
import CustomUseCardWithCTA from "../../../components/general-component/CustomUseCardWithCTA";
import {
  activateAccountForMainScreen,
  firstmessagehype,
  nomatchmessage,
} from "../../../constants";
import { PopupModal } from "../../Onboarding/components/onboarding.styles";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import Button from "../../../components/utility/button.component";
import { detectUrl } from "../../../utilities/detectTextType";
import AvatarVerticalList from "./AvatarVerticalList";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import BrandAvatarO from "../../../components/general-component/BrandAvatarO";
import { sortByTimestamp } from "../../../utilities/sortByKey";
import ProfileDeactivateCardComponent from "../../../components/general-component/ProfileDeactivateCardComponent";

// SETTING UP NOTIFICATION
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      })
    ).data;
    // console.log("token", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const ChatsScreen = () => {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [matchesListContentHeight, setMatchesListContentHeight] = useState(0);
  const [communitiesListContentHeight, setCommunitiesListContentHeight] =
    useState(0);
  const [showCard, setShowCard] = useState(false);
  const [newMessageInput, setNewMessageInput] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});
  const [isRefreshChatScreen, setIsRefreshChatScreen] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]); // match ID is included in each object in array
  const [otherFriendshipUsers, setOtherFriendshipUsers] = useState([]); // match ID is included in each object in array

  async function pushTokenToUserObject(val, id) {
    if (!val) return;
    await updateUserValueField(
      "all-users",
      id,
      "notificationToken",
      val,
      () => {}
    );
  }

  async function fetchMatches() {
    try {
      const allMatchesResult = await getAllData("matches");
      const friendshipData = await getAllData("friendship-matches");

      // #############################################################################
      // sort data by timestamp
      const allMatchesResultSort = sortByTimestamp(allMatchesResult);
      const allFriendshipMatchesResultSort = sortByTimestamp(friendshipData);
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
      const newData = await getAllData("all-users");

      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );

      setCurrentUser(currentUserData);

      registerForPushNotificationsAsync()
        .then((token) => {
          if (currentUserData?.notificationToken) return;
          pushTokenToUserObject(token, currentUserData?.id);
        })
        .catch((error) =>
          console.log(
            `Error from Register For Push NotificationsAsync : ${error.message}`
          )
        );

      // #############################################################################
      // matches
      const otherWithMatchIdArray = await Promise.all(
        allMatchesResultSort.map(async (res) => {
          if (
            res?.likedByprofile?.phonenumber === phoneValueFromPhoneMemory ||
            res?.likedProfile?.phonenumber === phoneValueFromPhoneMemory
          ) {
            const current_Match_id = res?.id;

            // ########################################
            // get match messages
            const messagesCollection = database
              .collection("matches")
              .doc(current_Match_id)
              .collection("messages")
              .orderBy("timestamp", "asc");

            const snapshot = await messagesCollection.get();
            const results = snapshot.docs.map((doc) => doc.data());

            const matchingResults = results.filter(
              (result) => result.matchId === res?.id
            );

            // ########################################
            //get other user
            const matchMate = [res?.likedByprofile, res?.likedProfile].find(
              (profile) => profile?.id !== currentUserData?.id
            );

            const allUsers = await getAllData("all-users");
            const otherUserData = allUsers.find(
              (data) => data.phonenumber === matchMate?.phonenumber
            );

            const matchdataAndMessagesList = {
              id: current_Match_id,
              match: otherUserData,
              messages: matchingResults,
            };

            return matchdataAndMessagesList;
          }
          return null;
        })
      );

      // #############################################################################
      // friendship
      const otherWithFriendshipMatchIdArray = await Promise.all(
        allFriendshipMatchesResultSort.map(async (res) => {
          if (
            res?.friendshipRequestFrom?.phonenumber ===
              phoneValueFromPhoneMemory ||
            res?.friendshipRequestTo?.phonenumber === phoneValueFromPhoneMemory
          ) {
            const current_friendship_id = res?.id;

            // #######################################
            // get friendship messages
            const messagesCollection = database
              .collection("friendship-matches")
              .doc(current_friendship_id)
              .collection("messages")
              .orderBy("timestamp", "asc");

            const snapshot = await messagesCollection.get();
            const results = snapshot.docs.map((doc) => doc.data());

            const friendshipMatchingResults = results.filter(
              (result) => result.matchId === res?.id
            );

            // ########################################
            //get other user
            const friendshipMatchMate = [
              res?.friendshipRequestFrom,
              res?.friendshipRequestTo,
            ].find((profile) => profile?.id !== currentUserData?.id);

            const allUsers = await getAllData("all-users");
            const otherUserData = allUsers.find(
              (data) => data.phonenumber === friendshipMatchMate?.phonenumber
            );

            const matchdataAndMessagesList = {
              id: current_friendship_id,
              flag: res?.flag,
              friendshipMatch: otherUserData,
              messages: friendshipMatchingResults,
            };

            return matchdataAndMessagesList;
          }
          return null;
        })
      );

      const validMatches = otherWithMatchIdArray.filter(
        (match) => match !== null
      );

      const validFriendshipMatches = otherWithFriendshipMatchIdArray.filter(
        (match) => match !== null
      );

      if (validMatches.length > 0) {
        setOtherUsers(validMatches);
      }
      if (validFriendshipMatches.length > 0) {
        setOtherFriendshipUsers(validFriendshipMatches);
      }

      if (!validMatches.length && !validFriendshipMatches.length) {
        const timeID = setTimeout(() => {
          setShowCard(true);
        }, 3000);
        return () => clearTimeout(timeID);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMatches();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    fetchMatches();

    const resetChatTrigger = setTimeout(() => {
      setIsRefreshChatScreen(false);
    }, 1000);

    return () => clearTimeout(resetChatTrigger);
  }, [isRefreshChatScreen]);

  function handleStartMessaging() {
    if (!input?.length) return;

    let textTransform = input;
    if (
      detectUrl(input) &&
      (input?.startsWith("www") || input?.startsWith("Www"))
    ) {
      textTransform = `https://${input?.toLowerCase()}`;
    } else if (detectUrl(input) && input?.startsWith("Https://")) {
      textTransform = input?.toLowerCase();
    }

    // #############################################################################
    //pushing message to firebase db
    database
      .collection(selectedMatch?.flag ? "friendship-matches" : "matches")
      .doc(selectedMatch?.id)
      .collection("messages")
      .add({
        firstname: currentUser.firstname,
        matchId: selectedMatch?.id,
        message: textTransform,
        photo: currentUser.mediaArray?.[0],
        recieverphonenumber:
          selectedMatch?.match?.phonenumber ??
          selectedMatch?.friendshipMatch?.phonenumber,
        senderphonenumber: currentUser?.phonenumber,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`FIRST CONVERSATION SENT SUCCESSFULLY`);
      })
      .catch((error) => console.log("Error " + error.message));

    setInput("");
    setNewMessageInput(false);
    setIsRefreshChatScreen(true);
  }

  // #############################################################################
  // match
  function checkIfMatchMessageListsAreEmpty() {
    let isEmpty = [];
    otherUsers.map((otherUser) => {
      if (otherUser?.messages?.length) {
        isEmpty.push(true);
      } else {
        isEmpty.push(false);
      }
    });

    return isEmpty?.some((truthy) => truthy === true);
  }

  // #############################################################################
  // friendship
  function checkIfFriendshipMessageListsAreEmpty() {
    let isEmpty = [];
    otherFriendshipUsers.map((otherUser) => {
      if (otherUser?.messages?.length) {
        isEmpty.push(true);
      } else {
        isEmpty.push(false);
      }
    });

    return isEmpty?.some((truthy) => truthy === true);
  }

  // #############################################################################
  // matches & friendship
  function checkIfMessagingHasStarted(flag) {
    let checkArray = otherUsers;
    if (flag) {
      checkArray = otherFriendshipUsers;
    }
    const truthy = [];
    checkArray?.map((dt) => {
      dt?.messages?.length ? truthy.push(false) : truthy.push(true);
    });

    return truthy?.some((truthy) => truthy === true);
  }

  // #############################################################################
  // check if user's profile is deactivated
  if (currentUser?.deactivate) {
    return (
      <ProfileDeactivateCardComponent
        currentUser={currentUser}
        message={activateAccountForMainScreen}
        setIsRetrigger={setIsRefreshChatScreen}
        theme={theme}
      />
    );
  }

  // #############################################################################
  // show no matches and friend requests information
  if (showCard) {
    return (
      <CustomUseCardWithCTA
        text={nomatchmessage}
        buttonText="Keep liking"
        cardFunction={() => navigation.navigate("home")}
      />
    );
  }

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <Spacer
        style={{
          paddingBottom: theme.spaceNumberBy10[16],
          backgroundColor: theme.colors.brand.basewhite,
          flex: 1,
        }}
        position="top"
        size="xxxlarge">
        {checkIfMessagingHasStarted() && (
          <Spacer position="bottom" size="xxlarge">
            <HorizontalPaddingSpace space={theme.space[3]}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="body"
                transform="capitalize">
                New Matches
              </Text>
            </HorizontalPaddingSpace>
            <HorizontalPaddingSpace space={theme.space[3]}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{
                  flexDirection: "row",
                  width: "100%",
                }}
                position="top"
                size="small">
                {[...otherUsers, ...otherFriendshipUsers]?.map(
                  (otherUser, idx) =>
                    !otherUser?.messages?.length && (
                      <Pressable
                        key={idx}
                        style={{
                          alignItems: "center",
                          marginRight: theme.spaceNumber[5],
                          marginTop: theme.spaceNumber[5],
                        }}>
                        <Avatar
                          ringBorder={otherUser?.flag ? true : false}
                          data={
                            otherUser?.match?.mediaArray[0] ??
                            otherUser?.friendshipMatch?.mediaArray[0]
                          }
                          theme={theme}
                          func={() => {
                            setSelectedMatch(otherUser);
                            setNewMessageInput(true);
                          }}
                          isSmallIcon={true}
                        />
                        <View>
                          <Text
                            variant="custom"
                            colorType="black"
                            fontType="montserratSemibold"
                            fontSize="button">
                            {otherUser?.match?.firstname}
                          </Text>
                        </View>
                      </Pressable>
                    )
                )}
              </ScrollView>
            </HorizontalPaddingSpace>
          </Spacer>
        )}

        {/* ################################################################# */}
        {/* Matches messages List */}
        {checkIfMatchMessageListsAreEmpty() && (
          <Fragment>
            <Spacer position="bottom" size="small">
              <HorizontalPaddingSpace space={theme.space[3]}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="body"
                  transform="capitalize">
                  Match messages
                </Text>
              </HorizontalPaddingSpace>
            </Spacer>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onContentSizeChange={(_contentWidth, height) => {
                setMatchesListContentHeight(height);
              }}
              contentContainerStyle={{ minHeight: matchesListContentHeight }}
              style={{
                paddingTop: theme.spaceNumber[6],
                height: theme.spaceNumberBy10[2],
                marginBottom: theme.spaceNumber[6],
              }}>
              {otherUsers?.map(
                (otherUser, idx) =>
                  otherUser?.messages?.length > 0 && (
                    <Spacer key={idx} position="bottom" size="medium">
                      <Pressable
                        onPress={() => {
                          const matchId = otherUser?.id;
                          storeData("match-id", matchId);
                          const otherUserPhonenumber = otherUser?.flag
                            ? otherUser?.friendshipMatch?.phonenumber
                            : otherUser?.match?.phonenumber;
                          const flag = otherUser?.flag;

                          navigation.navigate("message-screen", {
                            currentUser,
                            otherUserPhonenumber,
                            flag,
                          });
                        }}>
                        <MessagesListItem
                          photo={
                            otherUser?.match?.mediaArray[0] ??
                            otherUser?.friendshipMatch?.mediaArray[0]
                          }
                          theme={theme}
                          name={
                            otherUser?.match?.firstname ??
                            otherUser?.friendshipMatch?.firstname
                          }
                          lastSenderMessage={
                            otherUser?.messages?.[
                              otherUser?.messages?.length - 1
                            ]?.message
                          }
                          lastSenderName={
                            otherUser?.messages?.[
                              otherUser?.messages?.length - 1
                            ]?.firstname === currentUser.firstname
                              ? "You"
                              : otherUser?.messages?.[
                                  otherUser?.messages?.length - 1
                                ]?.firstname
                          }
                          flag={otherUser?.flag}
                        />
                      </Pressable>
                    </Spacer>
                  )
              )}
            </ScrollView>
          </Fragment>
        )}

        {/* ################################################################# */}
        {/* Communities messages List */}
        {checkIfFriendshipMessageListsAreEmpty() && (
          <Fragment>
            <Spacer position="bottom" size="small">
              <HorizontalPaddingSpace space={theme.space[3]}>
                <Text
                  variant="custom"
                  colorType="black"
                  fontType="montserratBold"
                  fontSize="body"
                  transform="capitalize">
                  Communities messages
                </Text>
              </HorizontalPaddingSpace>
            </Spacer>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onContentSizeChange={(_contentWidth, height) => {
                setCommunitiesListContentHeight(height);
              }}
              contentContainerStyle={{
                minHeight: communitiesListContentHeight,
              }}
              style={{
                paddingTop: theme.spaceNumber[6],
                height: theme.spaceNumberBy10[2],
                marginBottom: theme.spaceNumber[6],
              }}>
              {otherFriendshipUsers?.map(
                (otherFriendshipUser, idx) =>
                  otherFriendshipUser?.messages?.length > 0 && (
                    <Spacer key={idx} position="bottom" size="medium">
                      <Pressable
                        onPress={() => {
                          const matchId = otherFriendshipUser?.id;
                          storeData("match-id", matchId);
                          const otherUserPhonenumber =
                            otherFriendshipUser?.friendshipMatch?.phonenumber;
                          const flag = otherFriendshipUser?.flag;

                          navigation.navigate("message-screen", {
                            currentUser,
                            otherUserPhonenumber,
                            flag,
                          });
                        }}>
                        <MessagesListItem
                          photo={
                            otherFriendshipUser?.friendshipMatch?.mediaArray[0]
                          }
                          theme={theme}
                          name={otherFriendshipUser?.friendshipMatch?.firstname}
                          lastSenderMessage={
                            otherFriendshipUser?.messages?.[
                              otherFriendshipUser?.messages?.length - 1
                            ]?.message
                          }
                          lastSenderName={
                            otherFriendshipUser?.messages?.[
                              otherFriendshipUser?.messages?.length - 1
                            ]?.firstname === currentUser.firstname
                              ? "You"
                              : otherFriendshipUser?.messages?.[
                                  otherFriendshipUser?.messages?.length - 1
                                ]?.firstname
                          }
                          flag={otherFriendshipUser?.flag}
                        />
                      </Pressable>
                    </Spacer>
                  )
              )}
            </ScrollView>
          </Fragment>
        )}
        {/* ################################################################# */}
        {/* No Messages Information */}
        {!checkIfMatchMessageListsAreEmpty() &&
          !checkIfFriendshipMessageListsAreEmpty() && (
            <Spacer
              style={{
                paddingBottom: theme.spaceNumberBy10[16],
                backgroundColor: theme.colors.brand.basewhite,
                flex: 1,
              }}
              position="top"
              size="small">
              <AvatarVerticalList
                theme={theme}
                interest={currentUser?.interest}
              />
            </Spacer>
          )}
      </Spacer>
      {newMessageInput && (
        <PopupModal backgroundColor="rgba(255, 255, 255, 0.9)">
          <HorizontalPaddingSpace
            space={theme.space[7]}
            style={{ width: "100%" }}>
            <Spacer position="bottom" size="xxxxlarge">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="caption">
                {firstmessagehype}
              </Text>
            </Spacer>
            <View
              style={{
                elevation: 5,
                shadowColor: theme.colors.brand.lines,
                shadowOpacity: 0.3,
                shadowRadius: "10px",
                backgroundColor: theme.colors.brand.basewhite,
              }}>
              <InputComponent
                includeIcon={false}
                keyboardType="default"
                setValue={setInput}
                value={input}
                width="100%"
                isCountryCode={false}
                placeholder="Begin the adventure..."
                fontSize={theme.fontSizes.body}
                fontType={theme.fonts.montserratLight}
                backgroundColor="basewhite"
                isBackgroundColor={true}
              />
            </View>
            <Spacer
              position="top"
              size="large"
              style={{ alignItems: "center" }}>
              <Button
                backgroundColor={theme.colors.brand.base}
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={handleStartMessaging}
                text="Send your first impression"
                textColor={theme.colors.brand.basewhite}
                width="80%"
              />
            </Spacer>
          </HorizontalPaddingSpace>
        </PopupModal>
      )}
    </SafeArea>
  );
};

export default ChatsScreen;
