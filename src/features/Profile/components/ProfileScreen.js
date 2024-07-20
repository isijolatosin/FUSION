import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, View } from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { useAppContext } from "../../../context/ThemeContext";
import IconComponent from "../../../components/icon-components/IconComponent";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import PhotoComponent from "../../Onboarding/components/sub-component/PhotoComponent";
import GeneralPopupModal from "./GeneralPopupModal";
import {
  handleDeleteImageAsync,
  handlePickImageAsync,
  handleReplaceImageAsync,
} from "../../../utilities/handleUploadImage";
import SettingModal from "./SettingModal";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import UpdateModal from "./UpdateModal";
import GenderUpdateModal from "./GenderUpdateModal";
import WorkUpdateModal from "./WorkUpdateModal";
import JobUpdateModal from "./JobUpdateModal";
import HeightUpdateModal from "./HeightUpdateModal";
import InterestUpdateModal from "./InterestUpdateModal";
import SmokeUpdateModal from "./SmokingUpdateModal";
import DrinkUpdateModal from "./DrinkingUpdateModal";
import GymUpdateModal from "./GymUpdateModal";
import CannabisUpdateModal from "./CannabisUpdateModal";
import PreferenceUpdateModal from "./PreferenceUpdateModal";
import SexualOrientationUpdateModal from "./SexualOrientationUpdateModal";
import ReligionUpdateModal from "./ReligionUpdateModal";
import InterestsUpdateModal from "./InterestsUpdateModal";
import ProfileViewModal from "../../../components/general-component/ProfileViewModal";
import LocationUpdateModal from "./LocationUpdateModal";
import FacebookUpdateModal from "./FacebookUpdateModal";
import InstagramUpdateModal from "./InstagramUpdateModal";
import TikTokUpdateModal from "./TikTokUpdateModal";
import SharePlayListUpdateModal from "./SharePlayListUpdateModal";
import BioUpdateModal from "./BioUpdateModal";
import truncateSentence from "../../../utilities/truncateSentence";
import ZodiacUpdateModal from "./ZodiacUpdateModal";
import TribeUpdateModal from "./TribeUpdateModal";
import NationalityUpdateModal from "./NationalityUpdateModal";
import SnapchatUpdateModal from "./SnapchatUpdateModal";
import AgePreferenceUpdateModal from "./AgePreferenceUpdateModal";
import DistancePreferenceUpdateModal from "./DistancePreferenceUpdateModal";
import Avatar from "../../../components/general-component/Avatar";
import IndustryUpdateModal from "./IndustryUpdateModal";
import TextAndIconComponent from "./TextAndIconComponent";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";
import HeaderComponent from "../../../components/general-component/HeaderComponent";

export default function ProfileScreen() {
  const {
    state: { theme },
  } = useAppContext();
  const { height } = Dimensions.get("window");
  const [isTrigger, setIsTrigger] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSettingModal, setSettingModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState({
    type: "",
    isOpen: false,
  });
  const [deleteImageItem, setDeleteImageItem] = useState("");

  const { width } = Dimensions.get("window");
  const [currentUser, setCurrentUser] = useState([]);

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
    storeData("last-screen-visit", "profile");
    const phoneValueFromPhoneMemory = await retrieveData("phonenumber");

    const newData = await getAllData("all-users");

    const currentUserData = newData.find(
      (data) => data.phonenumber === phoneValueFromPhoneMemory
    );
    setCurrentUser(currentUserData);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUsersData();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    fetchUsersData();

    const resetTrigger = setTimeout(() => {
      setIsTrigger(false);
    }, 2000);

    return () => clearTimeout(resetTrigger);
  }, [isTrigger]);

  async function handleReplaceImageAsyncInModal() {
    handleReplaceImageAsync(currentUser, deleteImageItem, setIsTrigger);
  }

  async function handleDeleteImageAsyncInModal() {
    handleDeleteImageAsync(currentUser, deleteImageItem, setIsTrigger);
  }

  function handlePickImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      setOpenImageUploadModal,
      currentUser?.id,
      false,
      false,
      () => {},
      false,
      setIsTrigger
    );
  }
  function handleCaptureImageAsyncInModal() {
    handlePickImageAsync(
      () => {},
      setOpenImageUploadModal,
      currentUser?.id,
      true,
      false,
      () => {},
      false,
      setIsTrigger
    );
  }

  function checkValForSocials(val) {
    switch (val) {
      case "instagram":
        return true;
      case "facebook":
        return true;
      case "tiktok":
        return true;
      case "playlist":
        return true;
      case "snapchat":
        return true;
      default:
        break;
    }
  }

  function AboutMeListComponent({ pressFunction, title, value, isList }) {
    if (isList) {
      return (
        <View>
          <HorizontalPaddingSpace
            style={{
              marginTop: theme.spaceNumberBy10[2],
              backgroundColor: theme.colors.brand.black,
              paddingVertical: theme.spaceNumber[3],
            }}
            space={theme.space[2]}>
            <View>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratSemibold"
                fontSize="button">
                {title}
              </Text>
            </View>
          </HorizontalPaddingSpace>
          <HorizontalPaddingSpace space={theme.space[2]}>
            {value?.map((val, idx) => (
              <Pressable
                onPress={() => setOpenUpdateModal({ type: val, isOpen: true })}
                key={idx}
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.colors.brand.linesLighter,
                  paddingVertical: theme.spaceNumber[6],
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  position: "relative",
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {checkValForSocials(val) && (
                    <IconComponent
                      iconFunction={() => {}}
                      iconName={val === "playlist" ? "playlist-music" : val}
                      IconComponent={
                        val === "instagram"
                          ? AntDesign
                          : val === "tiktok"
                          ? FontAwesome5
                          : val === "facebook"
                          ? Entypo
                          : val === "playlist"
                          ? MaterialCommunityIcons
                          : val === "snapchat"
                          ? Fontisto
                          : ""
                      }
                      size={val === "playlist" ? 35 : 25}
                      color={theme.colors.brand.base6}
                    />
                  )}
                  <View
                    style={{
                      marginLeft:
                        (val === "facebook" ||
                          val === "instagram" ||
                          val === "snapchat" ||
                          val === "playlist" ||
                          val === "tiktok") &&
                        theme.spaceNumber[3],
                    }}>
                    <Text
                      variant="custom"
                      colorType="base6"
                      fontType="montserratSemibold"
                      fontSize="button">
                      {val}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginRight: theme.spaceNumber[2],
                  }}>
                  <IconComponent
                    iconFunction={() => {}}
                    iconName="keyboard-arrow-right"
                    IconComponent={MaterialIcons}
                    size={20}
                    color={theme.colors.brand.base6}
                  />
                </View>
              </Pressable>
            ))}
          </HorizontalPaddingSpace>
        </View>
      );
    }

    return (
      <TextAndIconComponent
        pressFunction={pressFunction}
        theme={theme}
        title={title}
        value={value}
      />
    );
  }

  function handleCloseSettingModal() {
    setSettingModal(false);
  }
  function handleOpenSettingModal() {
    setSettingModal(true);
  }

  function sortRender() {
    switch (openUpdateModal.type) {
      case "facebook":
        return (
          <FacebookUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "instagram":
        return (
          <InstagramUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "tiktok":
        return (
          <TikTokUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "playlist":
        return (
          <SharePlayListUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "snapchat":
        return (
          <SnapchatUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "bio":
        return (
          <BioUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              setIsTrigger(true);
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case "gender":
        return (
          <GenderUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              setIsTrigger(true);
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case "work":
        return (
          <WorkUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "job":
        return (
          <JobUpdateModal
            theme={theme}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "height":
        return (
          <HeightUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "tribe preference":
        return (
          <TribeUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            myTribePreference="preferredTribe"
          />
        );
      case "interest":
        return (
          <InterestUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "smoking":
        return (
          <SmokeUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "drinking":
        return (
          <DrinkUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "gym":
        return (
          <GymUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "cannabis":
        return (
          <CannabisUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "cannabis preference":
        return (
          <CannabisUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            myCannabisPreference="preferredCannabis"
          />
        );
      case "drinking preference":
        return (
          <DrinkUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            myDrinkingPreference="preferredDrinking"
          />
        );
      case "smoking preference":
        return (
          <SmokeUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            mySmokingPreference="preferredSmoking"
          />
        );
      case "dating intentions":
        return (
          <PreferenceUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "sexualOrientation":
        return (
          <SexualOrientationUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "religious":
        return (
          <ReligionUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "location":
        return (
          <LocationUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "show zodiac":
        return (
          <ZodiacUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "tribe":
        return (
          <TribeUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "nationality":
        return (
          <NationalityUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "nationality preference":
        return (
          <NationalityUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            myNationalityPreference="preferredNationality"
          />
        );
      case "religious preference":
        return (
          <ReligionUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            interestedreligiousbeliefs="interestedreligiousbeliefs"
          />
        );
      case "height preference":
        return (
          <HeightUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            interestedheight="interestedheight"
          />
        );
      case "distance":
        return (
          <DistancePreferenceUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "age":
        return (
          <AgePreferenceUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              {
                setIsTrigger(true);
                setOpenUpdateModal({
                  type: "",
                  isOpen: false,
                });
              }
            }}
          />
        );
      case "industry":
        return (
          <IndustryUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setIsTrigger(true);
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[0]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[0]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[1]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[1]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[2]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[2]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[3]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[3]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[4]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[4]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );
      case currentUser?.interestsArray?.[5]:
        return (
          <InterestsUpdateModal
            interestValue={currentUser?.interestsArray?.[5]}
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
          />
        );

      default:
        break;
    }
  }

  return (
    <SafeArea
      style={{
        backgroundColor: theme.colors.brand.base,
      }}>
      <Spacer position="bottom" size="xxlarge">
        <HeaderComponent
          title={currentUser?.firstname && currentUser?.firstname}
          theme={theme}
          LeftComp={() => (
            <Avatar
              data={currentUser?.mediaArray?.[0]}
              theme={theme}
              dimensionIndex={2}
              func={() => setShowProfile(true)}
            />
          )}
          RightComp={() => (
            <IconComponent
              iconFunction={handleOpenSettingModal}
              iconName="settings-sharp"
              IconComponent={Ionicons}
              size={25}
              color={theme.colors.brand.base1}
            />
          )}
          size="h5"
        />
      </Spacer>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          position="top"
          size="large"
          style={{
            marginBottom: theme.spaceNumberBy10[5],
          }}>
          <View
            style={{
              backgroundColor: theme.colors.brand.black,
              paddingVertical: theme.spaceNumber[3],
              marginBottom: theme.spaceNumber[5],
            }}>
            <HorizontalPaddingSpace space={theme.space[2]}>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratSemibold"
                fontSize="button">
                Uploaded Photos
              </Text>
            </HorizontalPaddingSpace>
          </View>
          <View>
            <HorizontalPaddingSpace space={theme.space[1]}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  gap: theme.spaceNumberBy10[0],
                }}>
                {currentUser?.mediaArray?.map((media, idx) => (
                  <PhotoComponent
                    key={idx}
                    isUpdatingPhoto={true}
                    photoUrl={media}
                    showDeleteIcon={true}
                    index={0}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setDeleteImageItem={setDeleteImageItem}
                    deleteImageItem={deleteImageItem}
                    setOpenImageUploadModal={setOpenImageUploadModal}
                    width={width}
                    borderRadius={theme.spaceNumberBy10[1]}
                  />
                ))}
                {currentUser?.mediaArray?.length < 6 &&
                  new Array(6 - currentUser?.mediaArray.length)
                    .fill(0)
                    .map((_val, idx) => (
                      <PhotoComponent
                        key={idx}
                        isUpdatingPhoto={true}
                        photoUrl=""
                        showDeleteIcon={true}
                        index={0}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setDeleteImageItem={setDeleteImageItem}
                        deleteImageItem={deleteImageItem}
                        setOpenImageUploadModal={setOpenImageUploadModal}
                        width={width}
                        borderRadius={theme.spaceNumberBy10[1]}
                      />
                    ))}
              </ScrollView>
            </HorizontalPaddingSpace>
          </View>
          <AboutMeListComponent
            title="Socials"
            subTitle=""
            value={["facebook", "instagram", "playlist", "snapchat", "tiktok"]}
            isList={true}
          />
          <Spacer
            style={{
              paddingBottom: theme.spaceNumber[3],
              marginBottom: theme.spaceNumber[3],
              backgroundColor: theme.colors.brand.black,
            }}
            position="top"
            size="xxlarge">
            <HorizontalPaddingSpace
              style={{
                paddingTop: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
              space={theme.space[2]}>
              <View>
                <Text
                  style={{ marginRight: 5 }}
                  variant="custom"
                  colorType="base6"
                  fontType="montserratSemibold"
                  fontSize="button">
                  About Me
                </Text>
              </View>
              <IconComponent
                iconFunction={() => {}} // TODO: Edit the about me list
                iconName="edit"
                IconComponent={AntDesign}
                size={15}
                color={theme.colors.brand.base6}
              />
            </HorizontalPaddingSpace>
          </Spacer>
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "bio", isOpen: true })
            }
            title="Bio"
            value={
              currentUser?.bio
                ? truncateSentence(currentUser?.bio, 7)
                : "Update..."
            }
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "cannabis", isOpen: true })
            }
            title="Cannabis"
            value={currentUser?.lifestyleHabits?.cannabis}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "drinking", isOpen: true })
            }
            title="Drinking"
            value={currentUser?.lifestyleHabits?.drink}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "gender", isOpen: true })
            }
            title="Gender"
            value={currentUser?.gender}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "gym", isOpen: true })
            }
            title="Gym"
            value={currentUser?.lifestyleHabits?.gym}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "height", isOpen: true })
            }
            title="Height"
            value={currentUser?.height}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "job", isOpen: true })
            }
            title="Job Title"
            value={currentUser?.jobtitle?.job}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "location",
                isOpen: true,
              })
            }
            title="Location"
            value={currentUser?.location}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "nationality",
                isOpen: true,
              })
            }
            title="Nationality"
            value={
              currentUser?.nationality ? currentUser?.nationality : "Update..."
            }
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "religious",
                isOpen: true,
              })
            }
            title="Religious Beliefs"
            value={currentUser?.religious}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "sexualOrientation",
                isOpen: true,
              })
            }
            title="Sexual Orientation"
            value={currentUser?.sexualOrientation}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "show zodiac",
                isOpen: true,
              })
            }
            title="Show Zodiac"
            value={
              currentUser?.zodiac === true || currentUser?.zodiac === false
                ? currentUser?.zodiac?.toString()
                : "Update..."
            }
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "smoking", isOpen: true })
            }
            title="Smoking"
            value={currentUser?.lifestyleHabits?.smoke}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({
                type: "tribe",
                isOpen: true,
              })
            }
            title="Tribe"
            value={currentUser?.tribe ? currentUser?.tribe : "Update..."}
          />
          <AboutMeListComponent
            pressFunction={() =>
              setOpenUpdateModal({ type: "work", isOpen: true })
            }
            title="Work"
            value={currentUser?.workplace?.work}
          />
          <Spacer position="top" size="xxlarge">
            <HorizontalPaddingSpace
              space={theme.space[2]}
              style={{
                marginBottom: theme.spaceNumberBy10[0],
                backgroundColor: theme.colors.brand.black,
                paddingVertical: theme.spaceNumber[3],
              }}>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratSemibold"
                fontSize="button">
                Member Preference
              </Text>
            </HorizontalPaddingSpace>
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "age",
                  isOpen: true,
                })
              }
              title="Age Range"
              value={
                (currentUser?.agePreference?.toAgeValue &&
                  `${currentUser?.interest} ${currentUser?.agePreference?.fromAgeValue} - ${currentUser?.agePreference?.toAgeValue}`) ??
                "Update..."
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "interest", isOpen: true })
              }
              title="Interested in"
              value={currentUser?.interest}
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "distance",
                  isOpen: true,
                })
              }
              title="Maximum Distance"
              value={
                currentUser?.distancePreference?.value
                  ? `${currentUser?.distancePreference?.value} km`
                  : "Update..."
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "religious preference",
                  isOpen: true,
                })
              }
              title="Preferred Religious Beliefs"
              value={
                currentUser?.interestedreligiousbeliefs
                  ? currentUser?.interestedreligiousbeliefs
                  : "Update..."
              }
            />
          </Spacer>
          <Spacer position="top" size="xxlarge">
            <HorizontalPaddingSpace
              space={theme.space[2]}
              style={{
                marginBottom: theme.spaceNumberBy10[0],
                backgroundColor: theme.colors.brand.black,
                paddingVertical: theme.spaceNumber[3],
              }}>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratSemibold"
                fontSize="button">
                Subscription Preference
              </Text>
            </HorizontalPaddingSpace>
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "cannabis preference",
                  isOpen: true,
                })
              }
              title="Cannabis preference"
              value={
                currentUser?.preferredCannabis
                  ? currentUser?.preferredCannabis
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "dating intentions", isOpen: true })
              }
              title="Dating Intentions"
              value={currentUser?.preference}
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "drinking preference",
                  isOpen: true,
                })
              }
              title="Drinking preference"
              value={
                currentUser?.preferredDrinking
                  ? currentUser?.preferredDrinking
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "height preference", isOpen: true })
              }
              title="Height preference"
              value={
                currentUser?.interestedheight
                  ? currentUser?.interestedheight
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "industry", isOpen: true })
              }
              title="Industry preference"
              value={
                currentUser?.preferredIndustries?.length
                  ? `You have ${currentUser?.preferredIndustries?.length} ${
                      currentUser?.preferredIndustries?.length > 1
                        ? "preferences"
                        : "preference"
                    }`
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({
                  type: "nationality preference",
                  isOpen: true,
                })
              }
              title="Nationality preference"
              value={
                currentUser?.preferredNationality
                  ? currentUser?.preferredNationality
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "smoking preference", isOpen: true })
              }
              title="Smoking preference"
              value={
                currentUser?.preferredSmoking
                  ? currentUser?.preferredSmoking
                  : "Open to all"
              }
            />
            <AboutMeListComponent
              pressFunction={() =>
                setOpenUpdateModal({ type: "tribe preference", isOpen: true })
              }
              title="Tribe preference"
              value={
                currentUser?.preferredTribe
                  ? currentUser?.preferredTribe
                  : "Open to all"
              }
            />
          </Spacer>
          <View style={{ marginBottom: theme.spaceNumberBy10[2] }}>
            <AboutMeListComponent
              title="I Enjoy"
              subTitle=""
              value={currentUser?.interestsArray}
              isList={true}
            />
          </View>
        </ScrollView>
      </View>
      <AnimatedModal
        isVisible={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        theme={theme}
        width={width}>
        <GeneralPopupModal
          height={height}
          theme={theme}
          functionCallTop={handleReplaceImageAsyncInModal}
          functionCallBottom={handleDeleteImageAsyncInModal}
          textTop="Replace Photo"
          textBottom="Delete Photo"
          textCancel="Cancel"
          setOpenImageUploadModal={setOpenDeleteModal}
          setIsTrigger={setIsTrigger}
        />
      </AnimatedModal>
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
        setIsTrigger={setIsTrigger}
      />
      <AnimatedModal
        isVisible={openUpdateModal.isOpen}
        onClose={() => {
          setOpenUpdateModal({ type: "", isOpen: false });
        }}
        theme={theme}
        width={width}>
        <UpdateModal height={height} theme={theme}>
          {sortRender()}
        </UpdateModal>
      </AnimatedModal>
      <AnimatedModal
        isVisible={showProfile}
        onClose={() => setShowProfile(false)}
        theme={theme}
        width={width}>
        <ProfileViewModal
          otherUser={currentUser}
          theme={theme}
          setShowProfile={setShowProfile}
          width={width}
        />
      </AnimatedModal>
    </SafeArea>
  );
}
