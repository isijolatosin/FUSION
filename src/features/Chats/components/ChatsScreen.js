import React, { useEffect, useState } from "react";
import { ScrollView, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  const [selectedChatMatchId, setSelectedChatMatchId] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [newMessageInput, setNewMessageInput] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const [isRefreshChatScreen, setIsRefreshChatScreen] = useState(false);
  const [otherUsers, setOtherUsers] = useState([]); // match ID is included in each object in array

  useEffect(() => {
    async function getRefreshTrigger() {
      const refreshChatScreen = await retrieveData("refreshChatScreen");
      setIsRefreshChatScreen(refreshChatScreen);
    }
    getRefreshTrigger();
  }, []);

  useEffect(() => {
    async function fetchMatches() {
      // get all macthes
      const allMatchesResult = await getAllData("matches");

      // get phone number from memory
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      // get all users
      const newData = await getAllData("all-users");

      // get current user
      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );
      setCurrentUser(currentUserData);

      const otherWithMatchIdArray = [];
      if (allMatchesResult?.length) {
        // get all matches for current user
        allMatchesResult?.find(async (res) => {
          const current_Match_id = res?.id; // current match id

          // get matches messages
          const snapshot = await database
            .collection("matches")
            .doc(current_Match_id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get();

          const data = snapshot?.docs?.map((doc) => doc?.data());

          // create return object
          const otherWithMatchId = {
            id: current_Match_id,
            match: [res?.likedByprofile, res?.likedProfile].find(
              (profile) => profile?.id !== currentUserData?.id
            ),
            messages: data,
          };

          otherWithMatchIdArray.push(otherWithMatchId);
        });
      } else {
        const timeID = setTimeout(() => {
          setShowCard(true);
        }, 2000);

        return () => clearTimeout(timeID);
      }

      const timeoutID = setTimeout(() => {
        setOtherUsers(otherWithMatchIdArray);
      }, 1000);

      return () => clearTimeout(timeoutID);
    }

    fetchMatches();
  }, [triggerReload, isRefreshChatScreen]);

  function handleStartMessaging() {
    setTriggerReload(false);
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
    //pushing message to firebase db...
    database
      .collection("matches")
      .doc(selectedChatMatchId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: textTransform,
        id: currentUser?.id,
        photo: currentUser.mediaArray?.[0],
        phonenumber: currentUser?.phonenumber,
        firstname: currentUser.firstname,
      })
      .then(() => {
        console.log(`FIRST CONVERSATION SENT SUCCESSFULLY`);
      })
      .catch((error) => console.log("Error " + error.message));

    setTriggerReload(!triggerReload);
    setInput("");
    setNewMessageInput(false);
  }

  function checkData(data) {
    const truthy = [];
    data?.map((dt) => {
      dt?.messages?.length ? truthy.push(false) : truthy.push(true);
    });

    return truthy?.some((truthy) => truthy === true);
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
        {checkData(otherUsers) && (
          <Spacer position="bottom" size="xxlarge">
            <HorizontalPaddingSpace space={theme.space[3]}>
              <Text variant="title" colorType="black" fontType="montserratBold">
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
                {otherUsers?.length ? (
                  otherUsers?.map(
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
                              setSelectedChatMatchId(otherUser?.id);
                              setNewMessageInput(true);
                            }}
                          />
                          <View>
                            <Text
                              variant="title"
                              colorType="black"
                              fontType="montserratSemibold"
                              fontSize="button">
                              {otherUser?.match?.firstname}
                            </Text>
                          </View>
                        </Pressable>
                      )
                  )
                ) : (
                  <AvatarList theme={theme} />
                )}
              </ScrollView>
            </HorizontalPaddingSpace>
          </Spacer>
        )}
        <Spacer position="bottom" size="small">
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Text variant="title" colorType="black" fontType="montserratBold">
              Messages
            </Text>
          </HorizontalPaddingSpace>
        </Spacer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: theme.spaceNumber[6],
          }}>
          {otherUsers?.length ? (
            otherUsers?.map((otherUser) => (
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
                  }}
                  style={{
                    width: "100%",
                    paddingBottom: theme.spaceNumber[7],
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.brand.linesLight,
                  }}>
                  {otherUser?.messages?.length ? (
                    <MessagesListItem
                      photo={otherUser?.match?.mediaArray[0]}
                      theme={theme}
                      name={otherUser?.match?.firstname}
                      lastSenderMessage={
                        otherUser?.messages[otherUser?.messages?.length - 1]
                          ?.message
                      }
                      lastSenderName={
                        currentUser?.firstname ===
                        otherUser?.messages[otherUser?.messages?.length - 1]
                          ?.firstname
                          ? "You"
                          : otherUser?.messages[otherUser?.messages.length - 1]
                              ?.firstname
                      }
                    />
                  ) : (
                    <HorizontalPaddingSpace space={theme.space[3]}>
                      <Text
                        variant="title"
                        colorType="black"
                        fontType="montserratRegular"
                        fontSize="caption">
                        {nochatlistsinformation}
                      </Text>
                    </HorizontalPaddingSpace>
                  )}
                </Pressable>
              </Spacer>
            ))
          ) : (
            <AvatarVerticalList theme={theme} />
          )}
        </ScrollView>
      </Spacer>
      {newMessageInput && (
        <PopupModal backgroundColor="rgba(255, 255, 255, 0.9)">
          <HorizontalPaddingSpace
            space={theme.space[7]}
            style={{ width: "100%" }}>
            <Spacer position="bottom" size="xxxxlarge">
              <Text
                variant="title"
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
                keyboardType="url"
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
