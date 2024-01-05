import React, { useEffect, useState } from "react";
import { ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import {
  getAllData,
  getAllMatchData,
} from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import Avatar from "../../../components/general-component/Avatar";
import MessagesListItem from "./MessagesListItem";
import Loading from "../../../components/general-component/Loading";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import { database } from "../../../../config";

const ChatsScreen = () => {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();
  const [currentUser, setCurrentUser] = useState({});
  const [id, setMatchId] = useState("");
  const [triggerReload, setTriggerReload] = useState(false);
  const [messages, setMessages] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]); // match ID is included in each object in array

  useEffect(() => {
    async function fetchMatches() {
      const result = await getAllMatchData();
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      const newData = await getAllData();
      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );
      setCurrentUser(currentUserData);

      // filter out match(s) for current user
      const other = [];
      result.filter((match) => {
        // capture match ID
        const matchId = match?.id;
        storeData("match-id", matchId);

        const bothProfile = [match?.likedByprofile, match?.likedProfile];

        const otherWithMatchId = {
          id: matchId,
          match: [
            bothProfile.find((profile) => profile?.id !== currentUserData?.id),
          ],
        };

        other.push(otherWithMatchId);
      });
      setOtherUsers(other);
    }

    async function getMessages() {
      try {
        const id = await retrieveData("match-id");
        setMatchId(id);

        if (id) {
          const snapshot = await database
            .collection("match-messages")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get();

          // Access the documents in the subcollection
          const data = snapshot.docs.map((doc) => doc.data());

          setMessages(data);
        }
      } catch (error) {
        console.error("Error getting message data:", error);
      }
    }

    fetchMatches();
    getMessages();
  }, [triggerReload]);

  if (!otherUsers?.length) {
    return <Loading text="Loading..." />;
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
        <Spacer position="bottom" size="xxlarge">
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Text
              variant="subHeading"
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
              {otherUsers?.[0]?.match.map((match) => (
                <Pressable
                  key={match?.id}
                  style={{
                    alignItems: "center",
                    marginRight: theme.spaceNumber[5],
                    marginTop: theme.spaceNumber[5],
                  }}>
                  <Avatar
                    data={match}
                    theme={theme}
                    func={() =>
                      navigation.navigate("message-screen", {
                        currentUser,
                        match,
                      })
                    }
                  />
                  <Text
                    variant="subHeading"
                    colorType="black"
                    fontType="montserratSemibold"
                    fontSize="button">
                    {match?.firstname}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer position="bottom" size="small">
          <HorizontalPaddingSpace space={theme.space[3]}>
            <Text
              variant="subHeading"
              colorType="black"
              fontType="montserratBold">
              Messages
            </Text>
          </HorizontalPaddingSpace>
        </Spacer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: theme.spaceNumber[6],
          }}>
          {otherUsers[0]?.match.map((match) => (
            <Spacer key={match?.id} position="bottom" size="medium">
              <Pressable
                onPress={() =>
                  navigation.navigate("message-screen", {
                    currentUser,
                    match,
                  })
                }
                style={{
                  width: "100%",
                  paddingBottom: theme.spaceNumber[7],
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.colors.brand.linesLight,
                }}>
                <MessagesListItem
                  data={match}
                  theme={theme}
                  lastSenderMessage={messages[messages.length - 1]?.message}
                  lastSenderName={
                    currentUser?.firstname ===
                    messages[messages.length - 1]?.firstname
                      ? "You"
                      : messages[messages.length - 1]?.firstname
                  }
                />
              </Pressable>
            </Spacer>
          ))}
        </ScrollView>
      </Spacer>
    </SafeArea>
  );
};

export default ChatsScreen;
