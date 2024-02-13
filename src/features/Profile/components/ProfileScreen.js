import React, { Fragment, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

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
import GeneralPopupModal from "./GeneralPopupModal";
import {
  handleDeleteImageAsync,
  handlePickImageAsync,
} from "../../../utilities/handleUploadImage";
import SettingModal from "./SettingModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";

export default function ProfileScreen() {
  const {
    state: { theme },
  } = useAppContext();
  const { height } = Dimensions.get("window");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSettingModal, setSettingModal] = useState(false);
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

  async function fetchUsersData() {
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");

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

  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

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

  function AboutMeListComponent({ title, value, isList }) {
    if (isList) {
      return (
        <Fragment>
          <HorizontalPaddingSpace
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: theme.spaceNumberBy10[1],
            }}
            space={theme.space[5]}>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratSemibold"
                fontSize="caption">
                {title}
              </Text>
            </View>
            <View>
              {value?.map((val, idx) => (
                <Text
                  style={{
                    textAlign: "right",
                    marginBottom: theme.spaceNumberBy10[0],
                  }}
                  key={idx}
                  variant="custom"
                  colorType="black"
                  fontType="montserratSemibold"
                  fontSize="caption"
                  transform="capitalize">
                  {val}
                </Text>
              ))}
            </View>
          </HorizontalPaddingSpace>
        </Fragment>
      );
    }

    return (
      <HorizontalPaddingSpace
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: theme.spaceNumberBy10[1],
        }}
        space={theme.space[5]}>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratSemibold"
            fontSize="caption">
            {title}
          </Text>
        </View>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratSemibold"
            fontSize="caption"
            transform="capitalize">
            {value}
          </Text>
        </View>
      </HorizontalPaddingSpace>
    );
  }

  function handleCloseSettingModal() {
    setSettingModal(false);
  }
  function handleOpenSettingModal() {
    setSettingModal(true);
  }

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.basewhite,
      }}>
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
            iconFunction={handleOpenSettingModal}
            iconName="settings-sharp"
            IconComponent={Ionicons}
            size={25}
            color={theme.colors.brand.brandTone}
          />
        </View>
      </NavigationBar>
      <View style={{ height: "100%" }}>
        <HorizontalPaddingSpace space={theme.space[3]}>
          <Spacer style={{ alignItems: "center" }} position="top" size="medium">
            {photoUrl1 && (
              <Image
                style={{
                  width: theme.spaceNumberBy10[9],
                  height: theme.spaceNumberBy10[9],
                  resizeMode: "cover",
                  borderRadius: theme.spaceNumberBy10[9],
                }}
                source={{
                  uri: `${photoUrl1}`,
                }}
              />
            )}
            <Spacer position="top" size="xsmall">
              <Text
                variant="custom"
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
              variant="custom"
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
              style={{ marginRight: 5, flex: 1 }}
              variant="custom"
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          position="top"
          size="large"
          style={{
            marginBottom: theme.spaceNumberBy10[5],
          }}>
          <AboutMeListComponent title="My Gender" value={currentUser?.gender} />
          <AboutMeListComponent
            title="Where I work"
            value={currentUser?.workplace?.work}
          />
          <AboutMeListComponent
            title="What I do"
            value={currentUser?.jobtitle?.job}
          />
          <AboutMeListComponent title="My Height" value={currentUser?.height} />
          <AboutMeListComponent
            title="My Country"
            value={currentUser?.country}
          />
          <AboutMeListComponent
            title="I am interested in"
            value={currentUser?.interest}
          />
          <AboutMeListComponent
            title="I smoke"
            value={currentUser?.lifestyleHabits?.smoke}
          />
          <AboutMeListComponent
            title="I drink"
            value={currentUser?.lifestyleHabits?.drink}
          />
          <AboutMeListComponent
            title="I enjoy"
            value={currentUser?.interestsArray}
            isList={true}
          />
        </ScrollView>
      </View>
      <AnimatedModal
        isVisible={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        theme={theme}
        width={width}
        isTransparent={true}>
        <GeneralPopupModal
          height={height}
          theme={theme}
          functionCallTop={handleDeleteImageAsyncInModal}
          functionCallBottom={() => setOpenDeleteModal(false)}
          setTriggerRefresh={setTriggerRefresh}
          textTop="Delete Photo"
          textBottom="Cancel"
        />
      </AnimatedModal>
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
          setTriggerRefresh={setTriggerRefresh}
          textTop="Upload Photo"
          textBottom="Take Photo"
          textCancel="Cancel"
          setOpenImageUploadModal={setOpenImageUploadModal}
        />
      </AnimatedModal>
      <SettingModal
        theme={theme}
        currentUser={currentUser}
        openSettingModal={openSettingModal}
        onClose={handleCloseSettingModal}
      />
    </SafeArea>
  );
}
