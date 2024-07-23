import React, { useRef, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, View } from "react-native";
import { useRoute } from "@react-navigation/native";
// import { Audio } from "expo-av";
import { Ionicons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

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
import { handlePickImageAsync } from "../../../utilities/handleUploadImage";
import MessageDotsPopupModal from "./MessageDotsPopupModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import ProfileViewModal from "../../../components/general-component/ProfileViewModal";
import ImageViewer from "../../../components/general-component/ImageViewer";
// import { uploadAudioToCloudinary } from "../../../utilities/pickImageAsync";

export default function MessageScreen({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const scrollViewRef = useRef(null);
  const {
    state: { theme },
  } = useAppContext();

  const route = useRoute();
  const { currentUser, otherUserPhonenumber, flag } = route.params || {};

  const [messagesKeys, setMessagesKeys] = useState([]);
  const [messagesForMessagesScreen, setMessagesForMessagesScreen] = useState(
    {}
  );
  const [input, setInput] = useState("");
  const [matchId, setMatchId] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [recording, setRecording] = useState();
  // const [sound, setSound] = useState();
  // const [recordingActive, setRecordingActive] = useState(false);
  // const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openDotActionModal, setOpenDotActionModal] = useState(false);
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

      // get message for current match id
      if (matchId) {
        database
          .collection(flag ? "friendship-matches" : "matches")
          .doc(matchId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            const dataArr = [];
            snapshot?.forEach((doc) => {
              dataArr?.push({
                id: doc?.id,
                ...doc?.data(),
              });
            });

            if (dataArr?.length > 0) {
              const { groupedDataKeys, groupedData } = groupDataByKey(dataArr);
              setMessagesKeys(groupedDataKeys);
              setMessagesForMessagesScreen(groupedData);
            }
          });
      }
    } catch (error) {
      console.error("Error getting message data:", error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getMessages();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  const sendNotification = async () => {
    // check if user opt for in app notification
    if (!otherUserDataObject?.inAppNotification) return;

    // notification message
    const message = {
      to: otherUserDataObject?.notificationToken,
      sound: "default",
      title: `${currentUser?.firstname}`,
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
        .collection(flag ? "friendship-matches" : "matches")
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
          if (otherUserDataObject?.inAppNotification) {
            sendNotification();
            console.log(`MESSAGE SENT SUCCESSFULLY`);
          }
        })
        .catch((error) => console.log("Error " + error.message));

      setInput("");
    }
  };
  const sendPhotoMessage = (photo) => {
    //pushing message to firebase db...
    database
      .collection(flag ? "friendship-matches" : "matches")
      .doc(matchId)
      .collection("messages")
      .add({
        firstname: currentUser.firstname,
        matchId: matchId,
        message: photo,
        photo: currentUser.mediaArray?.[0],
        recieverphonenumber: otherUserDataObject?.phonenumber,
        senderphonenumber: currentUser?.phonenumber,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        // call in-app notification function
        if (otherUserDataObject?.inAppNotification) {
          sendNotification();
          console.log(`PHOTO MESSAGE SENT SUCCESSFULLY`);
        }
      })
      .catch((error) => console.log("Error " + error.message));

    setInput("");
  };

  function handlePickImageAsyncInModal() {
    handlePickImageAsync(
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
    removeDocumentFromCollections(
      flag ? "friendship-matches" : "matches",
      matchId,
      () => {}
    );
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
    removeDocumentFromCollections(
      flag ? "friendship-matches" : "matches",
      matchId,
      () => {}
    );
    navigation.navigate("chat", { refresh: true });
  }

  //   async function startRecording() {
  //     try {
  //       if (permissionResponse.status !== "granted") {
  //         console.log("Requesting permission..");
  //         await requestPermission();
  //       }
  //       await Audio.setAudioModeAsync({
  //         allowsRecordingIOS: true,
  //         playsInSilentModeIOS: true,
  //       });
  //
  //       const { recording } = await Audio.Recording.createAsync(
  //         Audio.RecordingOptionsPresets.HIGH_QUALITY
  //       );
  //
  //       if (recording) setRecordingActive(true);
  //       setRecording(recording);
  //     } catch (err) {
  //       console.error("Failed to start recording", err);
  //     }
  //   }

  // async function stopRecording() {
  //   setRecordingActive(false);
  //   await recording?.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });
  //   const uri = recording.getURI();
  //   setRecording(undefined);

  // upload to cloudinary
  // const result = await uploadAudioToCloudinary(uri);

  //     database
  //       .collection(flag ? "friendship-matches" : "matches")
  //       .doc(matchId)
  //       .collection("messages")
  //       .add({
  //         firstname: currentUser.firstname,
  //         matchId: matchId,
  //         message: uri,
  //         photo: currentUser.mediaArray?.[0],
  //         recieverphonenumber: otherUserDataObject?.phonenumber,
  //         senderphonenumber: currentUser?.phonenumber,
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //       })
  //       .then(() => {
  //         // call in-app notification function
  //         sendNotification();
  //         console.log(`AUDIO MESSAGE SENT SUCCESSFULLY`);
  //       })
  //       .catch((error) => console.log("Error " + error.message));
  //
  //     setTriggerReload(true);
  // }

  // async function playAudio(audioFile) {
  // const { sound } = await Audio.Sound.createAsync(
  //   require("file:///var/mobile/Containers/Data/Application/183C3684-E540-4655-A4D8-AEE4A487B611/Library/Caches/ExponentExperienceData/@isijolatosin2210/wiingr-app/AV/recording-F3CCCDC6-20AE-4DF3-B4E7-3B22C323DD9E.m4a")
  // );
  // setSound(sound);
  // await sound.playAsync();
  // }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <HorizontalPaddingSpace
        style={{
          marginTop:
            Platform.OS !== "ios"
              ? theme.spaceNumberBy10[5]
              : theme.spaceNumberBy10[6],
        }}
        space={theme.space[1]}>
        <NavigationBar>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={theme.spaceNumberBy10[2]}
              color={theme.colors.brand.base1}
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
                isSmallIcon={true}
              />
              <Text
                style={{ marginLeft: theme.spaceNumber[3] }}
                variant="custom"
                colorType="base6"
                fontType="montserratRegular"
                fontSize="title">
                {otherUserDataObject?.firstname}{" "}
              </Text>
            </View>
          </View>
          <IconComponent
            iconFunction={() => setOpenDotActionModal(true)}
            iconName="dots-vertical"
            IconComponent={MaterialCommunityIcons}
            size={30}
            color={theme.colors.brand.base6}
          />
        </NavigationBar>
      </HorizontalPaddingSpace>
      {messagesKeys?.length ? (
        <MessageContainer
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={onContentSizeChange}>
          {messagesKeys?.map((key, idx) => (
            <MessageGroupComponent
              key={idx}
              theme={theme}
              dateTitle={key}
              data={messagesForMessagesScreen?.[key]}
              currentUser={currentUser}
              setSelectedImage={setSelectedImage}
              setShowImageModal={setShowImageModal}
              // playAudio={playAudio}
            />
          ))}
        </MessageContainer>
      ) : (
        <Loading theme={theme} isMessage={true} />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <MessageInput
          value={input}
          theme={theme}
          setInput={setInput}
          recording={recording}
          setRecording={setRecording}
          sendMessage={sendMessage}
          setOpenImageUploadModal={setOpenImageUploadModal}
        />
      </KeyboardAvoidingView>
      {showImageModal && (
        <PopupModal
          height={height}
          backgroundColor={theme.colors.brand.baseTint}>
          <View
            style={{
              width: "100%",
              height: "65%",
            }}>
            <ImageViewer
              url={selectedImage}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          </View>
          <CloseButton
            spaceBottom={theme.space[9]}
            style={{
              backgroundColor: theme.colors.brand.base8,
              position: "absolute",
              marginLeft: theme.spaceNumberBy10[1],
            }}>
            <IconComponent
              iconFunction={() => setShowImageModal(false)}
              iconName="close-a"
              IconComponent={Fontisto}
              size={theme.spaceNumberBy10[1]}
              color={theme.colors.brand.base1}
            />
          </CloseButton>
        </PopupModal>
      )}
      <AnimatedModal
        isVisible={openImageUploadModal}
        onClose={() => setOpenImageUploadModal(false)}
        theme={theme}
        width={width}>
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
        width={width}>
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
        />
      </AnimatedModal>
    </View>
  );
}
