import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { theme } from "../../../infrastructure/theme";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { database } from "../../../../config";
import { NavigationBar } from "../../Onboarding/components/onboarding.styles";
import { retrieveData } from "../../../utilities/retrieveDataFromPhoneMemory";
import IconComponent from "../../../components/icon-components/IconComponent";

const Index = () => {
  const route = useRoute();
  const { phonenumber } = route.params || {}; // use number to fetch user data from firebase
  const [data, setData] = useState([]);

  const fetchPost = async (number) => {
    await getDocs(collection(database, "all-users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filterdata = newData.filter(
        // (datum) => datum.phonenumber === phonenumber
        (datum) => datum.phonenumber === "+14372208744" // change this to number
      );
      setData(filterdata[0]);
    });
  };

  useEffect(() => {
    const phoneFromPhoneStorage = retrieveData("phonenumber");

    if (phoneFromPhoneStorage) fetchPost(phoneFromPhoneStorage);
  }, []);

  let youInThreeWords = [];

  if (
    (data?.whatThreeWordsDescribeYou?.firstword,
    data?.whatThreeWordsDescribeYou?.secondword,
    data?.whatThreeWordsDescribeYou?.thirdword)
  )
    youInThreeWords = [
      data?.whatThreeWordsDescribeYou?.firstword,
      data?.whatThreeWordsDescribeYou?.secondword,
      data?.whatThreeWordsDescribeYou?.thirdword,
    ];

  function calculateAge(year) {
    const currentYear = new Date().getFullYear();

    return currentYear - year;
  }

  return (
    <SafeArea>
      <HorizontalPaddingSpace space={theme.space[5]}>
        <Spacer position="top" size="large">
          <Spacer position="bottom" size="large">
            <NavigationBar>
              <Text variant="captionlight"></Text>
              <Text
                style={{
                  backgroundColor: theme.colors.brand.lightorange,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
                variant="captionlight">
                Filter
              </Text>
            </NavigationBar>
          </Spacer>
        </Spacer>
        <ScrollView style={{ marginBottom: 100 }}>
          <Image
            style={{
              width: "100%",
              height: 400,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data.mediaArray?.[0]}`,
            }}
          />
          <View style={{ position: "absolute", top: 40, left: 10 }}>
            <Text variant="headingWhiteSlim" width="100%">
              {data?.firstname}, {calculateAge(data?.dob?.year)}
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingRight: 10,
            }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="close"
              IconComponent={Ionicons}
              size={60}
              color={theme.colors.brand.white}
            />
            <IconComponent
              iconFunction={() => {}}
              iconName="heart"
              IconComponent={MaterialCommunityIcons}
              size={60}
              color={theme.colors.brand.white}
            />
          </View>
          <Spacer position="top" size="medium">
            <Text variant="bodyBoldBold" width="100%">
              Me in Three Words
            </Text>
          </Spacer>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 8,
              marginVertical: 5,
            }}>
            {youInThreeWords.map((word, idx) => (
              <View
                style={{
                  backgroundColor: theme.colors.brand.lightorange,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 50,
                }}>
                <Text key={idx} variant="captionlight" width="100%">
                  {word}
                </Text>
              </View>
            ))}
          </View>
          <Spacer position="top" size="medium">
            <Text variant="bodyBoldBold" width="100%">
              My Interests
            </Text>
          </Spacer>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 8,
              marginVertical: 5,
              flexWrap: "wrap",
            }}>
            {data?.interestsArray?.map((word, idx) => (
              <View
                style={{
                  backgroundColor: theme.colors.brand.lightorange,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 50,
                }}>
                <Text key={idx} variant="captionlight" width="100%">
                  {word}
                </Text>
              </View>
            ))}
          </View>
          <Spacer style={{ position: "relative" }} position="top" size="large">
            <Image
              style={{
                width: "100%",
                height: 400,
                resizeMode: "cover",
                borderRadius: 5,
              }}
              source={{
                uri: `${data.mediaArray?.[1]}`,
              }}
            />
          </Spacer>
          <Spacer position="top" size="medium">
            <Text variant="bodyBoldBold" width="100%">
              My Basics
            </Text>
          </Spacer>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 8,
              marginVertical: 5,
            }}>
            {youInThreeWords.map((word, idx) => (
              <View
                style={{
                  backgroundColor: theme.colors.brand.lightorange,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 50,
                }}>
                <Text key={idx} variant="captionlight" width="100%">
                  {word}
                </Text>
              </View>
            ))}
          </View>
          <Spacer position="top" size="medium">
            <Text variant="bodyBoldBold" width="100%">
              My Location
            </Text>
            <Spacer position="top" size="xsmall">
              <Text variant="captionlight">{data?.address}</Text>
            </Spacer>
          </Spacer>
          <Spacer position="top" size="medium">
            {data?.mediaArray.splice(2).map((image) => (
              <Image
                style={{
                  width: "100%",
                  height: 400,
                  resizeMode: "cover",
                  borderRadius: 5,
                }}
                source={{
                  uri: `${image}`,
                }}
              />
            ))}
          </Spacer>
        </ScrollView>
      </HorizontalPaddingSpace>
    </SafeArea>
  );
};

export default Index;
