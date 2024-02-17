import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";

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
import { MessageContainer } from "../../../components/Input-Forms/input.styles";
import { CloseButton } from "../../Main/screen/main.style";
import GeneralPopupModal from "../../Profile/components/GeneralPopupModal";
import MessageGroupComponent from "./MessageGroupComponent";
import { groupDataByKey } from "../../../utilities/groupDataByKey";
import firebase, { database } from "../../../../config";
import { detectUrl } from "../../../utilities/detectTextType";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import Loading from "../../../components/general-component/Loading";
import {
  addToArrayField,
  getAllData,
  removeDocumentFromCollections,
  removeItemFromArray,
} from "../../../utilities/updateFirestoreDatabaseField";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import { handlePickImageAsync } from "../../../utilities/handleUploadImage";
import MessageDotsPopupModal from "./MessageDotsPopupModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../../components/general-component/ProfileViewModal";
import getAddress from "../../../utilities/getAddress";

export default function MessageScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const scrollViewRef = useRef(null);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { currentUser, otherUserPhonenumber } = route.params || {};

  const [messagesKeys, setMessagesKeys] = useState([]);
  const [messagesForMessagesScreen, setMessagesForMessagesScreen] = useState(
    {}
  );
  const [input, setInput] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [triggerReload, setTriggerReload] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openDotActionModal, setOpenDotActionModal] = useState(false);
  const [addressFromLatLong, setAddressFromLatLong] = useState({});
  const [otherUserDataObject, setOtherUserData] = useState({});

  // Scroll to bottom when content size changes
  const onContentSizeChange = () => {
    scrollViewRef.current.scrollToEnd({
      animated: true,
    });
    // scrollViewRef.current.scrollTo({
    //   y: height,
    //   animated: true,
    // });
  };

  useEffect(() => {
    async function getMessages() {
      try {
        const matchId = await retrieveData("match-id");
        setMatchId(matchId);
        //get other user
        const allUsers = await getAllData("all-users");
        const otherUserData = allUsers.find(
          (data) => data.phonenumber === otherUserPhonenumber
        );
        setOtherUserData(otherUserData);

        const _address = await getAddress(
          +otherUserData?.latitude,
          +otherUserData?.longitude
        );
        setAddressFromLatLong(_address);

        // get message for current match id
        if (matchId) {
          const snapshot = await database
            .collection("matches")
            .doc(matchId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get();

          // Access the documents in the subcollection
          const data = snapshot?.docs?.map((doc) => doc?.data());

          const { groupedDataKeys, groupedData } = groupDataByKey(data);
          setMessagesKeys(groupedDataKeys);
          setMessagesForMessagesScreen(groupedData);
        }
      } catch (error) {
        console.error("Error getting message data:", error);
      }
    }

    const timeoutId = setTimeout(() => {
      getMessages();
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [triggerReload, input]);

  const sendNotification = async () => {
    // check if user opt for in app notification
    if (!otherUserDataObject?.inAppNotification) return;

    // notification message
    const message = {
      to: otherUserDataObject?.notificationToken,
      sound: "default",
      title: `${otherUserDataObject?.firstname}`,
      body: "Notification",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  const sendMessage = async () => {
    setTriggerReload(false);
    if (!input?.length) return;

    if (matchId) {
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
        .doc(matchId)
        .collection("messages")
        .add({
          firstname: currentUser?.firstname,
          matchId: matchId,
          message: textTransform,
          photo: currentUser?.mediaArray?.[0],
          recieverphonenumber: otherUserDataObject?.phonenumber,
          senderphonenumber: currentUser?.phonenumber,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          // call in-app notification function
          sendNotification();
          console.log(`MESSAGE SENT SUCCESSFULLY`);
        })
        .catch((error) => console.log("Error " + error.message));

      setTriggerReload(true);
      setInput("");
    }
  };
  const sendPhotoMessage = (photo) => {
    //pushing message to firebase db...
    database.collection("matches").doc(matchId).collection("messages").add({
      firstname: currentUser.firstname,
      matchId: matchId,
      message: photo,
      photo: currentUser.mediaArray?.[0],
      recieverphonenumber: otherUserDataObject?.phonenumber,
      senderphonenumber: currentUser?.phonenumber,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTriggerReload(true);
    setInput("");
  };

  function handlePickImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      "",
      false,
      true,
      sendPhotoMessage,
      false,
      () => {}
    );
  }
  function handleCaptureImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      "",
      true,
      true,
      sendPhotoMessage,
      false,
      () => {}
    );
  }

  async function handleBlockMatch(matchPhonenumber, otherMatchId, text) {
    // For current user
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "likedMeList",
      matchPhonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "listOfAllLikedNumbers",
      matchPhonenumber,
      () => {}
    );

    // for other user
    removeItemFromArray(
      "all-users",
      otherMatchId,
      "likedMeList",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      otherMatchId,
      "listOfAllLikedNumbers",
      currentUser?.phonenumber,
      () => {}
    );

    // create block list for current user
    const currentUserReason = {
      reason: text,
      phonenumber: matchPhonenumber,
    };
    await addToArrayField(
      "all-users",
      currentUser?.id,
      "blockedList",
      currentUserReason,
      () => {}
    );

    // create block list for other user
    const otherUserReason = {
      reason: text,
      phonenumber: currentUser?.phonenumber,
    };
    await addToArrayField(
      "all-users",
      otherMatchId,
      "blockedMeList",
      otherUserReason,
      () => {}
    );

    // For match object
    removeDocumentFromCollections("matches", matchId, () => {});

    storeData("refreshChatScreen", true);
    navigation.navigate("chat");
  }

  function handleUnmatch(matchPhonenumber, otherMatchId) {
    // For current user
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "likedMeList",
      matchPhonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      currentUser?.id,
      "listOfAllLikedNumbers",
      matchPhonenumber,
      () => {}
    );

    // for other user
    removeItemFromArray(
      "all-users",
      otherMatchId,
      "likedMeList",
      currentUser?.phonenumber,
      () => {}
    );
    removeItemFromArray(
      "all-users",
      otherMatchId,
      "listOfAllLikedNumbers",
      currentUser?.phonenumber,
      () => {}
    );

    // For match object
    removeDocumentFromCollections("matches", matchId, () => {});

    storeData("refreshChatScreen", true);
    navigation.navigate("chat");
  }

  return (
    <View style={{ flex: 1 }}>
      <HorizontalPaddingSpace
        style={{
          marginTop: Platform.OS !== "ios" ? 60 : 80,
        }}
        space={theme.space[3]}>
        <NavigationBar>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.brandFade}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: theme.spaceNumberBy10[1],
              }}>
              <Avatar
                data={otherUserDataObject?.mediaArray?.[0]}
                theme={theme}
                dimensionIndex={theme.spaceNumber[1]}
                func={() => setShowProfile(true)}
              />
              <Text
                style={{ marginLeft: theme.spaceNumber[3] }}
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="title">
                {otherUserDataObject?.firstname}
              </Text>
            </View>
          </View>
          <IconComponent
            iconFunction={() => setOpenDotActionModal(true)}
            iconName="dots-vertical"
            IconComponent={MaterialCommunityIcons}
            size={30}
            color={theme.colors.brand.brandFade}
          />
        </NavigationBar>
      </HorizontalPaddingSpace>
      {messagesKeys?.length ? (
        <MessageContainer
          ref={scrollViewRef}
          onContentSizeChange={onContentSizeChange}>
          {messagesKeys.map((key, idx) => (
            <MessageGroupComponent
              key={idx}
              theme={theme}
              dateTitle={key}
              data={messagesForMessagesScreen[key]}
              currentUser={currentUser}
              setSelectedImage={setSelectedImage}
              setShowImageModal={setShowImageModal}
            />
          ))}
        </MessageContainer>
      ) : (
        <Loading text="Loading..." size="body" color="linesLight" />
      )}
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
        <PopupModal height={height} backgroundColor="rgba(255, 255, 255, 0.9)">
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
      <AnimatedModal
        isVisible={openImageUploadModal}
        onClose={() => setOpenImageUploadModal(false)}
        theme={theme}
        width={width}
        isTransparent={true}>
        <GeneralPopupModal
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
        />
      </AnimatedModal>
      {/* This is for action in vertical dots */}
      <AnimatedModal
        isVisible={openDotActionModal}
        onClose={() => setOpenDotActionModal(false)}
        theme={theme}
        width={width}
        isTransparent={true}>
        <MessageDotsPopupModal
          height={height}
          theme={theme}
          functionCallTop={() =>
            handleUnmatch(
              otherUserDataObject?.phonenumber,
              otherUserDataObject?.id
            )
          }
          functionCallBottom={handleBlockMatch}
          otherUserMatchId={otherUserDataObject?.id}
          otherUserMatchPhonenumber={otherUserDataObject?.phonenumber}
          setTriggerRefresh={() => {}}
          textTop="Unmatch"
          textBottom="Block"
          textCancel="Cancel"
          setOpenImageUploadModal={setOpenDotActionModal}
          horizontalSpace={`${theme.spaceNumberBy10[3]}px`}
        />
      </AnimatedModal>
      <AnimatedModal
        isVisible={showProfile}
        onClose={() => setShowProfile(false)}
        theme={theme}
        width={width}>
        <ProfileViewModal
          otherUser={otherUserDataObject}
          theme={theme}
          setShowProfile={setShowProfile}
          width={width}
          addressFromLatLong={addressFromLatLong}
        />
      </AnimatedModal>
    </View>
  );
}
