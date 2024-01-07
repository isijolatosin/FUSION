import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import {
  NavigationBar,
  PopupModal,
} from "../../Onboarding/components/onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { useAppContext } from "../../../context/ThemeContext";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import MessageInput from "../../../components/Input-Forms/MessageInput";
import firebase, { database } from "../../../../config";
import { MessageContainer } from "../../../components/Input-Forms/input.styles";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import { detectUrl } from "../../../utilities/detectTextType";
import { CloseButton } from "../../Main/screen/main.style";
import PopupProfileImageModal from "../../Profile/components/PopupProfileImageModal";
import { handlePickImageAsync } from "../../../utilities/handleUploadImage";
import { groupDataByKey } from "../../../utilities/groupDataByKey";
import MessageGroupComponent from "./MessageGroupComponent";

export default function MessageScreen({ navigation }) {
  const { height } = Dimensions.get("window");
  const scrollViewRef = useRef(null);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { currentUser, match } = route.params || {};
  const [input, setInput] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [messages, setMessages] = useState({});
  const [messagesKeys, setMessagesKeys] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  // Scroll to bottom when content size changes
  const onContentSizeChange = () => {
    scrollViewRef.current.scrollTo({
      y: height,
      animated: true,
    });
  };

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

          const { groupedDataKeys, groupedData } = groupDataByKey(data);
          setMessagesKeys(groupedDataKeys);
          setMessages(groupedData);
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
  const sendPhotoMessage = (photo) => {
    //pushing message to firebase db...
    database
      .collection("match-messages")
      .doc(matchId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: photo,
        id: currentUser?.id,
        photo: currentUser.mediaArray?.[0],
        phonenumber: currentUser?.phonenumber,
        firstname: currentUser.firstname,
      });

    setInput("");
  };

  function handlePickImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      "",
      () => {},
      false,
      true,
      sendPhotoMessage
    );
  }
  function handleCaptureImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      "",
      () => {},
      true,
      true,
      sendPhotoMessage
    );
  }

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
      <MessageContainer
        ref={scrollViewRef}
        onContentSizeChange={onContentSizeChange}>
        {messagesKeys.map((key, idx) => (
          <MessageGroupComponent
            key={idx}
            theme={theme}
            dateTitle={key}
            data={messages[key]}
            currentUser={currentUser}
            setSelectedImage={setSelectedImage}
            setShowImageModal={setShowImageModal}
          />
        ))}
      </MessageContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <MessageInput
          value={input}
          theme={theme}
          setInput={setInput}
          sendMessage={sendMessage}
          setOpenImageUploadModal={setOpenImageUploadModal}
        />
      </KeyboardAvoidingView>
      {showImageModal && (
        <PopupModal height={height}>
          <View
            style={{
              width: "100%",
              height: "65%",
            }}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
              source={{
                uri: selectedImage,
              }}
            />
          </View>
          <CloseButton
            spaceBottom={theme.space[9]}
            style={{
              elevation: 5,
              shadowColor: theme.colors.brand.black,
              shadowOpacity: 0.2,
              shadowRadius: "10px",
              backgroundColor: theme.colors.brand.basewhite,
              position: "absolute",
              marginLeft: theme.spaceNumberBy10[1],
            }}>
            <IconComponent
              iconFunction={() => setShowImageModal(false)}
              iconName="close-a"
              IconComponent={Fontisto}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.black}
            />
          </CloseButton>
        </PopupModal>
      )}
      {openImageUploadModal && (
        <PopupProfileImageModal
          height={height}
          theme={theme}
          functionCallTop={handlePickImageAsyncInModal}
          functionCallBottom={handleCaptureImageAsyncInModal}
          setTriggerRefresh={() => {}}
          textTop="Upload Photo"
          textBottom="Take Photo"
          textCancel="Cancel"
          setOpenImageUploadModal={setOpenImageUploadModal}
          horizontalSpace={`${theme.spaceNumberBy10[5]}px`}
          backgroundColor="rgba(0,0,0,0.9)"
        />
      )}
    </View>
  );
}
