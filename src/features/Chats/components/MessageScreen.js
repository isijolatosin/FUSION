import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import MessageInput from "../../../components/Input-Forms/MessageInput";
import firebase, { database } from "../../../../config";
import {
  MessageBubble,
  MessageBubbleWrap,
  MessageContainer,
} from "../../../components/Input-Forms/input.styles";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import {
  detectPhoneNumber,
  detectUrl,
  handleCallPress,
  handleUrlPress,
} from "../../../utilities/detectTextType";

export default function MessageScreen({ navigation }) {
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { currentUser, match } = route.params || {};
  const [input, setInput] = useState("");
  const [matchId, setMatchId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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

    getMessages();
  }, [input]);

  const sendMessage = () => {
    if (!input?.length) return;

    let textTransform = input;
    if (
      detectUrl(input) &&
      (input.startsWith("www") || input.startsWith("Www"))
    ) {
      textTransform = `https://${input.toLowerCase()}`;
    } else if (detectUrl(input) && input.startsWith("Https://")) {
      textTransform = input.toLowerCase();
    }
    //pushing message to firebase db...
    database
      .collection("match-messages")
      .doc(matchId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: textTransform,
        id: currentUser?.id,
        photo: currentUser.mediaArray?.[0],
        phonenumber: currentUser?.phonenumber,
        firstname: currentUser.firstname,
      });

    setInput("");
  };

  return (
    <View style={{ flex: 1 }}>
      <HorizontalPaddingSpace
        style={{
          marginTop: Platform.OS !== "ios" ? 60 : 80,
        }}
        space={theme.space[3]}>
        <NavigationBar>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.brandFade}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: theme.spaceNumberBy10[1],
              }}>
              <Avatar data={match} theme={theme} dimensionIndex={4} />
              <Text
                style={{ marginLeft: theme.spaceNumber[3] }}
                variant="subHeading"
                colorType="black"
                fontType="montserratBold"
                fontSize="title">
                {match?.firstname}
              </Text>
            </View>
          </View>
          <IconComponent
            iconFunction={() => {}}
            iconName="dots-vertical"
            IconComponent={MaterialCommunityIcons}
            size={30}
            color={theme.colors.brand.brandFade}
          />
        </NavigationBar>
      </HorizontalPaddingSpace>
      <MessageContainer>
        {messages.map((item, idx) => (
          <MessageBubbleWrap
            key={idx}
            currentUser={currentUser?.phonenumber === item?.phonenumber}>
            <MessageBubble
              currentUser={currentUser?.phonenumber === item?.phonenumber}>
              {detectPhoneNumber(item?.message) ? (
                <Pressable onPress={() => handleCallPress(item?.message)}>
                  <Text
                    variant="subHeading"
                    colorType={
                      detectPhoneNumber(item?.message) ? "brandFade" : "black"
                    }
                    fontType="montserratSemibold"
                    fontSize="body">
                    {item?.message}
                  </Text>
                </Pressable>
              ) : detectUrl(item?.message) ? (
                <Pressable
                  onPress={() => handleUrlPress(item?.message.toLowerCase())}>
                  <Text
                    variant="subHeading"
                    colorType={detectUrl(item?.message) ? "error" : "black"}
                    fontType="montserratSemibold"
                    fontSize="body">
                    {item?.message.toLowerCase()}
                  </Text>
                </Pressable>
              ) : (
                <Text
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratSemibold"
                  fontSize="body">
                  {item?.message}
                </Text>
              )}

              <Text
                style={{ position: "absolute", bottom: 2, right: 5 }}
                variant="subHeading"
                colorType="lines"
                fontType="montserratRegular"
                fontSize="xcaption">
                {new Date(item?.timestamp?.toDate())
                  .toLocaleString()
                  .substr(
                    new Date(item?.timestamp?.toDate())
                      .toLocaleString()
                      .indexOf(" "),
                    new Date(item?.timestamp?.toDate()).toLocaleString().length
                  )}
              </Text>
            </MessageBubble>
          </MessageBubbleWrap>
        ))}
      </MessageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <MessageInput
          value={input}
          theme={theme}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </KeyboardAvoidingView>
    </View>
  );
}
