import React, { useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import Avatar from "../../../components/general-component/Avatar";
import MessagesListItem from "./MessagesListItem";
import firebase, { database } from "../../../../config";
import CustomUseCardWithCTA from "../../../components/general-component/CustomUseCardWithCTA";
import {
  firstmessagehype,
  nochatlistsinformation,
  nomatchmessage,
} from "../../../constants";
import { PopupModal } from "../../Onboarding/components/onboarding.styles";
import InputComponent from "../../../components/Input-Forms/InputComponent";
import Button from "../../../components/utility/button.component";
import { detectUrl } from "../../../utilities/detectTextType";
import AvatarList from "./AvatarList";
import AvatarVerticalList from "./AvatarVerticalList";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";

const ChatsScreen = () => {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [selectedChatMatchPhonenumber, setSelectedChatMatchPhonenumber] =
    useState("");
  const [showCard, setShowCard] = useState(false);
  const [newMessageInput, setNewMessageInput] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});
  const [isRefreshChatScreen, setIsRefreshChatScreen] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]); // match ID is included in each object in array

  useFocusEffect(
    React.useCallback(() => {
      fetchMatches();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  async function fetchMatches() {
    try {
      const allMatchesResult = await getAllData("matches");
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");
      const newData = await getAllData("all-users");

      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );

      setCurrentUser(currentUserData);

      const otherWithMatchIdArray = await Promise.all(
        allMatchesResult.map(async (res) => {
          if (
            res?.likedByprofile?.phonenumber === phoneValueFromPhoneMemory ||
            res?.likedProfile?.phonenumber === phoneValueFromPhoneMemory
          ) {
            const current_Match_id = res?.id;

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

            const matchdataAndMessagesList = {
              id: current_Match_id,
              match: [res?.likedByprofile, res?.likedProfile].find(
                (profile) => profile?.id !== currentUserData?.id
              ),
              messages: matchingResults,
            };

            return matchdataAndMessagesList;
          }
          return null;
        })
      );

      const validMatches = otherWithMatchIdArray.filter(
        (match) => match !== null
      );

      if (validMatches.length > 0) {
        setOtherUsers(validMatches);
      } else {
        const timeID = setTimeout(() => {
          setShowCard(true);
        }, 2000);
        return () => clearTimeout(timeID);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }

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
    //pushing message to firebase db
    database
      .collection("matches")
      .doc(selectedMatch?.id)
      .collection("messages")
      .add({
        firstname: currentUser.firstname,
        matchId: selectedMatch?.id,
        message: textTransform,
        photo: currentUser.mediaArray?.[0],
        recieverphonenumber: selectedChatMatchPhonenumber,
        senderphonenumber: currentUser?.phonenumber,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log(`FIRST CONVERSATION SENT SUCCESSFULLY`);
      })
      .catch((error) => console.log("Error " + error.message));

    setInput("");
    setNewMessageInput(false);
  }

  if (showCard) {
    return (
      <CustomUseCardWithCTA
        text={nomatchmessage}
        buttonText="Back to swipe"
        route="home"
      />
    );
  }

  function checkIfMessageListsAreEmpty() {
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

  function checkIfMessagingHasStarted() {
    const truthy = [];
    otherUsers?.map((dt) => {
      dt?.messages?.length ? truthy.push(false) : truthy.push(true);
    });

    return truthy?.some((truthy) => truthy === true);
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
                fontType="montserratBold">
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
                {otherUsers?.map(
                  (otherUser) =>
                    !otherUser?.messages?.length && (
                      <Pressable
                        key={otherUser?.id}
                        style={{
                          alignItems: "center",
                          marginRight: theme.spaceNumber[5],
                          marginTop: theme.spaceNumber[5],
                        }}>
                        <Avatar
                          data={otherUser?.match?.mediaArray[0]}
                          theme={theme}
                          func={() => {
                            setSelectedMatch(otherUser);
                            setNewMessageInput(true);
                          }}
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
        <Spacer position="bottom" size="small">
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Text variant="custom" colorType="black" fontType="montserratBold">
              Messages
            </Text>
          </HorizontalPaddingSpace>
        </Spacer>
        {checkIfMessageListsAreEmpty() ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: theme.spaceNumber[6],
            }}>
            {otherUsers?.map(
              (otherUser) =>
                otherUser?.messages?.length > 0 && (
                  <Spacer
                    key={otherUser?.match?.id}
                    position="bottom"
                    size="medium">
                    <Pressable
                      onPress={() => {
                        const matchId = otherUser?.id;
                        storeData("match-id", matchId);

                        navigation.navigate("message-screen", {
                          currentUser,
                          otherUser,
                        });
                      }}>
                      <MessagesListItem
                        photo={otherUser?.match?.mediaArray[0]}
                        theme={theme}
                        name={otherUser?.match?.firstname}
                        lastSenderMessage={
                          otherUser?.messages?.[otherUser?.messages?.length - 1]
                            ?.message
                        }
                        lastSenderName={
                          otherUser?.messages?.[otherUser?.messages?.length - 1]
                            ?.firstname === currentUser.firstname
                            ? "You"
                            : otherUser?.messages?.[
                                otherUser?.messages?.length - 1
                              ]?.firstname
                        }
                      />
                    </Pressable>
                  </Spacer>
                )
            )}
          </ScrollView>
        ) : (
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
            <HorizontalPaddingSpace space={theme.space[3]}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                {nochatlistsinformation}
              </Text>
            </HorizontalPaddingSpace>
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
