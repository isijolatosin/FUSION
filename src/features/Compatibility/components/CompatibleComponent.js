import { View, ImageBackground } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import calculateAge from "../../../utilities/calculateAge";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";

const CompatibleContainer = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  position: relative;
`;

export default function CompatibleComponent({ data, width, theme }) {
  const image = { uri: `${data?.mediaArray[0]}` };

  return (
    <View
      style={{
        width: width,
        height: theme.spaceNumberBy50[10],
      }}>
      <CompatibleContainer source={image}>
        <View
          style={{
            flex: 1,
            marginTop: theme.spaceNumberBy10[4],
            marginBottom: theme.spaceNumberBy10[2],
            marginHorizontal: theme.spaceNumberBy10[2],
            justifyContent: "space-between",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View>
              <Text
                style={{
                  backgroundColor: "transparent",
                  elevation: 5,
                  shadowColor: theme.colors.brand.basewhite,
                  shadowOpacity: 0.5,
                  shadowRadius: theme.spaceNumber[2],
                }}
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="h5"
                width="100%">
                {data?.firstname},{" "}
                {calculateAge(
                  data?.dob?.year,
                  data?.dob?.month,
                  data?.dob?.day
                )}
              </Text>
            </View>
            <IconComponent
              iconFunction={() => {}}
              iconName="heart"
              IconComponent={MaterialCommunityIcons}
              size={50}
              color={theme.colors.brand.base}
            />
          </View>
          <View>
            <Spacer position="bottom" size="small">
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="h5">
                My Interest
              </Text>
            </Spacer>
            <View
              style={{
                flexDirection: "row",
                gap: theme.spaceNumber[3],
                flexWrap: "wrap",
              }}>
              {data?.interestsArray?.map((interest, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: theme.colors.brand.highlight,
                    paddingVertical: theme.spaceNumber[3],
                    paddingHorizontal: theme.spaceNumber[7],
                    borderRadius: theme.spaceNumberBy10[4],
                    elevation: 5,
                    shadowColor: theme.colors.brand.black,
                    shadowOpacity: 0.12,
                    shadowRadius: theme.spaceNumber[2],
                  }}>
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button"
                    width="100%">
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </CompatibleContainer>
    </View>
  );
}
