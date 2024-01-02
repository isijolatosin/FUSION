import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { useAppContext } from "../../../context/ThemeContext";
import {
  NavigationBar,
  YouAreSpecialCircleWrapper,
} from "../../Onboarding/components/onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import calculateAge from "../../../utilities/calculateAge";
import PhotoComponent from "../../Onboarding/components/sub-component/PhotoComponent";
import PopupProfileImageModal from "./PopupProfileImageModal";
import {
  handleDeleteImageAsync,
  handlePickImageAsync,
} from "../../../utilities/handleUploadImage";

export default function ProfileScreen() {
  const {
    state: { theme },
  } = useAppContext();
  const { height } = Dimensions.get("window");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [deleteImageItem, setDeleteImageItem] = useState("");

  const { width } = Dimensions.get("window");
  const [currentUser, serCurrentUser] = useState([]);

  const [photoUrl1, setPhotoUrl1] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [photoUrl3, setPhotoUrl3] = useState("");
  const [photoUrl4, setPhotoUrl4] = useState("");
  const [photoUrl5, setPhotoUrl5] = useState("");
  const [photoUrl6, setPhotoUrl6] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    async function fetchUsersData() {
      const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

      const newData = await getAllData();

      const currentUserData = newData.find(
        (data) => data.phonenumber === phoneValueFromPhoneMemory
      );

      currentUserData?.mediaArray[0] &&
        setPhotoUrl1(currentUserData?.mediaArray[0]);
      currentUserData?.mediaArray[1] &&
        setPhotoUrl2(currentUserData?.mediaArray[1]);
      currentUserData?.mediaArray[2] &&
        setPhotoUrl3(currentUserData?.mediaArray[2]);
      currentUserData?.mediaArray[3] &&
        setPhotoUrl4(currentUserData?.mediaArray[3]);
      currentUserData?.mediaArray[4] &&
        setPhotoUrl5(currentUserData?.mediaArray[4]);
      currentUserData?.mediaArray[5] &&
        setPhotoUrl6(currentUserData?.mediaArray[5]);
      serCurrentUser(currentUserData);
    }

    fetchUsersData();
  }, [triggerRefresh]);

  const mediaArray = [];

  if (photoUrl1) mediaArray.push(photoUrl1);
  if (photoUrl2) mediaArray.push(photoUrl2);
  if (photoUrl3) mediaArray.push(photoUrl3);
  if (photoUrl4) mediaArray.push(photoUrl4);
  if (photoUrl5) mediaArray.push(photoUrl5);
  if (photoUrl6) mediaArray.push(photoUrl6);

  function handleDeleteImageAsyncInModal() {
    handleDeleteImageAsync(
      currentUser?.id,
      deleteImageItem,
      setTriggerRefresh,
      setOpenDeleteModal
    );
  }

  function handlePickImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      currentUser?.id,
      setTriggerRefresh
    );
  }
  function handleCaptureImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      () => {},
      setOpenImageUploadModal,
      currentUser?.id,
      setTriggerRefresh,
      true
    );
  }

  return (
    <SafeArea>
      <YouAreSpecialCircleWrapper
        style={{
          position: "absolute",
          top: -250,
          left: 0,
        }}
        color="highlight"
        width={width}
        height={width}
      />
      <NavigationBar>
        <View
          style={{
            marginTop: Platform.OS !== "ios" ? 40 : 20,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: theme.spaceNumber[9],
            width: "100%",
          }}>
          <IconComponent
            iconFunction={() => {}}
            iconName="settings-sharp"
            IconComponent={Ionicons}
            size={25}
            color={theme.colors.brand.brandTone}
          />
        </View>
      </NavigationBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer style={{ alignItems: "center" }} position="top" size="medium">
            <Image
              style={{
                width: theme.spaceNumberBy10[9],
                height: theme.spaceNumberBy10[9],
                resizeMode: "cover",
                borderRadius: theme.spaceNumberBy10[9],
              }}
              source={{
                uri: `${currentUser?.mediaArray?.[0]}`,
              }}
            />
            <Spacer position="top" size="xsmall">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratBold"
                fontSize="body">
                {currentUser?.firstname},{" "}
                {calculateAge(
                  currentUser?.dob?.year,
                  currentUser?.dob?.month,
                  currentUser?.dob?.day
                )}
              </Text>
            </Spacer>
          </Spacer>
        </HorizontalPaddingSpace>
        <Spacer
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.brand.lines,
            paddingBottom: theme.spaceNumber[5],
          }}
          position="top"
          size="large">
          <HorizontalPaddingSpace
            style={{ paddingTop: 5 }}
            space={theme.space[5]}>
            <Text
              variant="subHeading"
              colorType="black"
              fontType="montserratBold"
              fontSize="body">
              Uploaded Photos
            </Text>
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer position="top" size="large">
          <HorizontalPaddingSpace
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spaceNumberBy10[0],
              justifyContent: "center",
            }}
            space={theme.space[5]}>
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl1}
              setPhotoUrl={setPhotoUrl1}
              showDeleteIcon={true}
              index={0}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl2}
              setPhotoUrl={setPhotoUrl2}
              showDeleteIcon={true}
              index={1}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl3}
              setPhotoUrl={setPhotoUrl3}
              showDeleteIcon={true}
              index={2}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl4}
              setPhotoUrl={setPhotoUrl4}
              showDeleteIcon={true}
              index={3}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl5}
              setPhotoUrl={setPhotoUrl5}
              showDeleteIcon={true}
              index={4}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
            <PhotoComponent
              isUpdatingPhoto={true}
              dimension={31}
              photoUrl={photoUrl6}
              setPhotoUrl={setPhotoUrl6}
              showDeleteIcon={true}
              index={5}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteImageItem={setDeleteImageItem}
              deleteImageItem={deleteImageItem}
              setOpenImageUploadModal={setOpenImageUploadModal}
            />
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.brand.lines,
            paddingBottom: theme.spaceNumber[5],
          }}
          position="top"
          size="large">
          <HorizontalPaddingSpace
            style={{
              paddingTop: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
            space={theme.space[5]}>
            <Text
              style={{ marginRight: 5 }}
              variant="subHeading"
              colorType="black"
              fontType="montserratBold"
              fontSize="body">
              About Me
            </Text>
            <IconComponent
              iconFunction={() => {}} // TODO: Edit the about me list
              iconName="edit"
              IconComponent={AntDesign}
              size={15}
              color={theme.colors.brand.black}
            />
          </HorizontalPaddingSpace>
        </Spacer>
        <Spacer position="top" size="large">
          <HorizontalPaddingSpace
            style={{ paddingTop: 5 }}
            space={theme.space[5]}>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                My Gender
              </Text>
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption"
                transform="capitalize">
                {currentUser?.gender}
              </Text>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="xlarge">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                Where I work
              </Text>
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption"
                transform="capitalize">
                {currentUser?.workplace?.work}
              </Text>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="xlarge">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                What I do
              </Text>
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption"
                transform="capitalize">
                {currentUser?.jobtitle?.job}
              </Text>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="xlarge">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                My Height
              </Text>
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption"
                transform="capitalize">
                {currentUser?.height}
              </Text>
            </Spacer>
            <Spacer
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              position="top"
              size="xlarge">
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                My Country
              </Text>
              <Text
                variant="subHeading"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption"
                transform="capitalize">
                {currentUser?.country}
              </Text>
            </Spacer>
            <Spacer position="top" size="xlarge">
              <Spacer
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                position="bottom"
                size="xlarge">
                <Text
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratSemibold"
                  fontSize="caption">
                  I am interested in
                </Text>
                <Text
                  variant="subHeading"
                  colorType="black"
                  fontType="montserratSemibold"
                  fontSize="caption"
                  transform="capitalize">
                  {currentUser?.interest}
                </Text>
              </Spacer>
            </Spacer>
          </HorizontalPaddingSpace>
        </Spacer>
      </ScrollView>
      {openDeleteModal && (
        <PopupProfileImageModal
          height={height}
          theme={theme}
          functionCallTop={handleDeleteImageAsyncInModal}
          functionCallBottom={setOpenDeleteModal}
          setTriggerRefresh={setTriggerRefresh}
          textTop="Delete Photo"
          textBottom="Cancel"
        />
      )}
      {openImageUploadModal && (
        <PopupProfileImageModal
          height={height}
          theme={theme}
          functionCallTop={handlePickImageAsyncInModal}
          functionCallBottom={handleCaptureImageAsyncInModal}
          setTriggerRefresh={setTriggerRefresh}
          textTop="Upload Photo"
          textBottom="Take Photo"
        />
      )}
    </SafeArea>
  );
}
