import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
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
import Avatar from "./Avatar";
import MessagesListItem from "./MessagesListItem";

const ChatsScreen = () => {
  const navigation = useNavigation();
  const {
    state: { theme },
  } = useAppContext();
  const [currentUser, setCurrentUser] = useState({});
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

        const bothProfile = [match?.likedByprofile, match?.likedProfile];

        const otherWithMatchId = {
          id: matchId,
          match: [
            bothProfile.find(
              (profile) => profile?.phonenumber !== currentUser?.phonenumber
            ),
          ],
        };

        other.push(otherWithMatchId);
      });
      setOtherUsers(other);
    }

    fetchMatches();
  }, []);

  return (
    <SafeArea>
      <Spacer
        style={{ paddingBottom: theme.spaceNumberBy10[16] }}
        position="top"
        size="xxxxlarge">
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
                <TouchableOpacity
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
                </TouchableOpacity>
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
              <TouchableOpacity
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
                <MessagesListItem data={match} theme={theme} />
              </TouchableOpacity>
            </Spacer>
          ))}
        </ScrollView>
      </Spacer>
    </SafeArea>
  );
};

export default ChatsScreen;
