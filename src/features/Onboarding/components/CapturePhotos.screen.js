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
import PhotoComponent from "./sub-component/PhotoComponent";
import firebase, { database } from "../../../../config";
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
        phonenumber,
      },
    },
  } = useAppContext();
  const route = useRoute();
  const {
    dob,
    height,
    religious,
    country,
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
        height,
        interest,
        interestsArray,
        jobtitle,
        lastname,
        lifestyleHabits,
        mediaArray,
        phonenumber,
        preference,
        religious,
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
            color={theme.colors.brand.orange}
          />
          <NextNavigation
            theme={theme}
            color={theme.colors.brand.orange}
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
            <PhotoComponent photoUrl={photoUrl1} setPhotoUrl={setPhotoUrl1} />
            <PhotoComponent photoUrl={photoUrl2} setPhotoUrl={setPhotoUrl2} />
            <PhotoComponent photoUrl={photoUrl3} setPhotoUrl={setPhotoUrl3} />
            <PhotoComponent photoUrl={photoUrl4} setPhotoUrl={setPhotoUrl4} />
            <PhotoComponent photoUrl={photoUrl5} setPhotoUrl={setPhotoUrl5} />
            <PhotoComponent photoUrl={photoUrl6} setPhotoUrl={setPhotoUrl6} />
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
