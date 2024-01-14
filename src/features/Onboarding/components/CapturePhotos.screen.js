import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import "firebase/database";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";
import { NavigationBar } from "./onboarding.styles";
import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import NextNavigation from "../../../components/Next-navigation";
import { addPhotosInstruction } from "../../../constants";
import OnboardingErrorComponent from "./OnboardingErrorComponent";
import PhotoComponentPhotoScreen from "./sub-component/PhotoComponentPhotoScreen";
import { database } from "../../../../config";
import { storeData } from "../../../utilities/storeDataInPhoneMemory";

export default function CapturePhotos({ navigation }) {
  const [photoUrl1, setPhotoUrl1] = useState("");
  const [photoUrl2, setPhotoUrl2] = useState("");
  const [photoUrl3, setPhotoUrl3] = useState("");
  const [photoUrl4, setPhotoUrl4] = useState("");
  const [photoUrl5, setPhotoUrl5] = useState("");
  const [photoUrl6, setPhotoUrl6] = useState("");
  const [pageError, setPageError] = useState(false);
  const {
    state: {
      theme,
      user: {
        address,
        email,
        firstname,
        gender,
        interest,
        lastname,
        latitude,
        longitude,
        phonenumber,
      },
    },
  } = useAppContext();
  const route = useRoute();
  const {
    dob,
    _height,
    religious,
    country,
    sexualOrientation,
    preference,
    whatThreeWordsDescribeYou,
    workplace,
    jobtitle,
    interestsArray,
    lifestyleHabits,
  } = route.params || {};

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library denied");
      }
    })();
  }, []);

  const mediaArray = [];

  if (photoUrl1) mediaArray.push(photoUrl1);
  if (photoUrl2) mediaArray.push(photoUrl2);
  if (photoUrl3) mediaArray.push(photoUrl3);
  if (photoUrl4) mediaArray.push(photoUrl4);
  if (photoUrl5) mediaArray.push(photoUrl5);
  if (photoUrl6) mediaArray.push(photoUrl6);

  function checkMediaArrayLength(array) {
    const nonEmptyCount = array.filter(
      (x) => x !== "" && x !== undefined && x !== null
    ).length;

    return nonEmptyCount >= 3;
  }

  const saveDataToFirebase = async () => {
    storeData("phonenumber", phonenumber);

    database
      .collection("all-users")
      .add({
        address,
        country,
        dob,
        email,
        firstname,
        gender,
        height: _height,
        interest,
        interestsArray,
        jobtitle,
        lastname,
        latitude,
        lifestyleHabits,
        longitude,
        mediaArray,
        phonenumber,
        preference,
        religious,
        sexualOrientation,
        whatThreeWordsDescribeYou,
        workplace,
      })
      .then(() => {
        console.log(`USER ADDED SUCCESSFULLY`);
      })
      .catch((error) => console.log("Error " + error.message));
  };

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[5]}>
        <NavigationBar>
          <IconComponent
            iconFunction={() => navigation.goBack()}
            iconName="chevron-back"
            IconComponent={Ionicons}
            size={30}
            color={theme.colors.brand.base}
          />
          <NextNavigation
            theme={theme}
            color={theme.colors.brand.base}
            nextFunction={() => {
              if (checkMediaArrayLength(mediaArray)) {
                saveDataToFirebase();
                navigation.navigate("your-profile-is-set", { phonenumber });
              } else {
                setPageError(true);
              }
            }}
          />
        </NavigationBar>
        <Spacer position="top" size="large">
          <Text variant="headingSlim" width="100%">
            Add your photos
          </Text>
        </Spacer>
        <Spacer position="top" size="xsmall">
          <Text variant="captionlight" width="95%">
            {addPhotosInstruction}
          </Text>
        </Spacer>
        <Spacer position="top" size="xxxlarge">
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl1}
              setPhotoUrl={setPhotoUrl1}
              dimension={theme.spaceNumberBy10[2]}
            />
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl2}
              setPhotoUrl={setPhotoUrl2}
              dimension={theme.spaceNumberBy10[2]}
            />
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl3}
              setPhotoUrl={setPhotoUrl3}
              dimension={theme.spaceNumberBy10[2]}
            />
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl4}
              setPhotoUrl={setPhotoUrl4}
              dimension={theme.spaceNumberBy10[2]}
            />
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl5}
              setPhotoUrl={setPhotoUrl5}
              dimension={theme.spaceNumberBy10[2]}
            />
            <PhotoComponentPhotoScreen
              photoUrl={photoUrl6}
              setPhotoUrl={setPhotoUrl6}
              dimension={theme.spaceNumberBy10[2]}
            />
          </View>
        </Spacer>

        <OnboardingErrorComponent
          pageError={pageError}
          text="Please your photos. Minimum of 3 required"
        />
      </HorizontalPaddingSpace>
    </SafeArea>
  );
}
