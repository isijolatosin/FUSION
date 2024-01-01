import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text } from "../../../../components/typography/text.component";
import IconComponent from "../../../../components/icon-components/IconComponent";
import calculateAge from "../../../../utilities/calculateAge";

export default function IndividualUserProfileComponent({
  data,
  theme,
  scrollViewRef,
}) {
  const imageHeight = 450;

  let iconNamePerGender = "";
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-female";
  }
  if (data?.gender === "man") {
    iconNamePerGender = "gender-male";
  }
  if (data?.gender === "woman") {
    iconNamePerGender = "gender-non-binary";
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 100 }}>
      <View style={{ position: "relative" }}>
        <Image
          style={{
            width: "100%",
            height: imageHeight,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{
            uri: `${data?.mediaArray?.[0]}`,
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 70,
            left: 10,
            elevation: 5,
            shadowColor: theme.colors.brand.black,
            shadowOpacity: 0.8,
            shadowRadius: "8px",
          }}>
          <Text variant="headingWhiteSlim" width="100%">
            {data?.firstname}, {calculateAge(data?.dob?.year)}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "100%",
            padding: 10,
          }}>
          <TouchableOpacity>
            <IconComponent
              iconFunction={() => {}}
              iconName="heart"
              IconComponent={MaterialCommunityIcons}
              size={60}
              color={theme.colors.brand.basewhite}
            />
          </TouchableOpacity>
        </View>
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
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <Text variant="popButton" width="100%">
            {data?.whatThreeWordsDescribeYou?.firstword}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <Text variant="popButton" width="100%">
            {data?.whatThreeWordsDescribeYou?.secondword}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <Text variant="popButton" width="100%">
            {data?.whatThreeWordsDescribeYou?.thirdword}
          </Text>
        </View>
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
            key={idx}
            style={{
              backgroundColor: theme.colors.brand.highlight,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}>
            <Text key={idx} variant="popButton" width="100%">
              {word}
            </Text>
          </View>
        ))}
      </View>
      <Spacer style={{ position: "relative" }} position="top" size="large">
        <Image
          style={{
            width: "100%",
            height: imageHeight,
            resizeMode: "cover",
            borderRadius: 5,
          }}
          source={{
            uri: `${data?.mediaArray?.[1]}`,
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
          flexWrap: "wrap",
        }}>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 8, left: 8 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName={iconNamePerGender}
              IconComponent={MaterialCommunityIcons}
              size={15}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 8 }} variant="popButton" width="100%">
            {data?.gender}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 9, left: 9 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="flag"
              IconComponent={Fontisto}
              size={12}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 8 }} variant="popButton" width="100%">
            {data?.country}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 10.5, left: 10 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="praying-hands"
              IconComponent={FontAwesome5}
              size={10}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 10 }} variant="popButton" width="100%">
            {data?.religious}
          </Text>
        </View>
        {data?.jobtitle?.visibleOnProfile && (
          <View
            style={{
              backgroundColor: theme.colors.brand.highlight,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 50,
            }}>
            <View style={{ position: "absolute", top: 9, left: 9 }}>
              <IconComponent
                iconFunction={() => {}}
                iconName="work"
                IconComponent={MaterialIcons}
                size={12}
                color={theme.colors.brand.black}
              />
            </View>
            <Text style={{ marginLeft: 10 }} variant="popButton" width="100%">
              {data?.jobtitle?.job}
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 9, left: 9 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="human-male-height"
              IconComponent={MaterialCommunityIcons}
              size={12}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 10 }} variant="popButton" width="100%">
            {data?.height?.replace("feet", "'")?.replace("inch", '"')}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 9, left: 8 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="glass-wine"
              IconComponent={MaterialCommunityIcons}
              size={15}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 8 }} variant="popButton" width="100%">
            {data?.lifestyleHabits?.drink}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.brand.highlight,
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 50,
          }}>
          <View style={{ position: "absolute", top: 7, left: 10 }}>
            <IconComponent
              iconFunction={() => {}}
              iconName="cigar"
              IconComponent={MaterialCommunityIcons}
              size={15}
              color={theme.colors.brand.black}
            />
          </View>
          <Text style={{ marginLeft: 15 }} variant="popButton" width="100%">
            {data?.lifestyleHabits?.smoke}
          </Text>
        </View>
      </View>
      <Spacer position="top" size="medium">
        <Text variant="bodyBoldBold" width="100%">
          My Location
        </Text>
      </Spacer>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 8,
          borderRadius: 50,
        }}>
        <IconComponent
          iconFunction={() => {}}
          iconName="location-pin"
          IconComponent={Entypo}
          size={15}
          color={theme.colors.brand.black}
        />
        <Text style={{ marginLeft: 3 }} variant="popButton">
          {data?.address?.city}, {data?.address?.province}
        </Text>
      </View>
      {data?.mediaArray?.[2] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[2]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[3] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[3]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[4] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[4]}`,
            }}
          />
        </Spacer>
      )}
      {data?.mediaArray?.[5] && (
        <Spacer position="top" size="medium">
          <Image
            style={{
              width: "100%",
              height: imageHeight,
              resizeMode: "cover",
              borderRadius: 5,
            }}
            source={{
              uri: `${data?.mediaArray?.[5]}`,
            }}
          />
        </Spacer>
      )}
    </ScrollView>
  );
}
