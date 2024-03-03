import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { industriesList } from "../../../constants";
import { sortByKey } from "../../../utilities/sortByKey";
import { CloseButton } from "../../Main/screen/main.style";

export default function IndustryUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [industries, setIndustries] = useState(
    currentUser?.preferredIndustries
      ? [...currentUser?.preferredIndustries]
      : []
  );

  async function updateIndustries() {
    if (!industries?.length) return;

    industries?.length &&
      (await updateUserValueField(
        "all-users",
        currentUser?.id,
        "preferredIndustries",
        industries,
        () => {}
      ));
  }
  function handleUpdateIndustryList(int) {
    if (!int) return;
    if (industries?.includes(int)) {
      const popedIndustriesArray = industries.filter((item) => item !== int);

      setIndustries(popedIndustriesArray);
    } else {
      setIndustries([...industries, int]);
    }
  }

  return (
    <View style={{ height: height, position: "relative" }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme?.colors.brand.linesLighter,
          paddingBottom: theme?.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme?.spaceNumberBy10[2]}
          color={theme?.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme?.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          Industry Preference
        </Text>
      </View>

      <Spacer position="top" size="large">
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: theme?.spaceNumberBy50[3] - 40 }}>
          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}>
            {sortByKey(industriesList).map((industry, idx) => (
              <Pressable
                onPress={() => handleUpdateIndustryList(industry)}
                key={idx}
                style={{
                  flexDirection: "row",
                  paddingRight: theme?.spaceNumber[6],
                }}>
                <View
                  style={{
                    width: theme.spaceNumber[0],
                    height: "100%",
                    marginRight: theme.spaceNumber[0],
                    backgroundColor: industries?.includes(industry)
                      ? theme?.colors.brand.base
                      : theme?.colors.brand.highlight,
                  }}
                />
                <View
                  style={{
                    marginLeft: theme.spaceNumber[1],
                    flexDirection: "row",
                    flexWrap: "wrap",
                    backgroundColor: industries?.includes(industry)
                      ? theme?.colors.brand.base
                      : theme?.colors.brand.highlight,
                    paddingVertical: theme?.spaceNumber[3],
                    borderTopEndRadius: theme?.spaceNumberBy10[9],
                    borderBottomEndRadius: theme?.spaceNumberBy10[9],
                    paddingHorizontal: theme?.spaceNumber[3],
                  }}>
                  <Text
                    style={{
                      color: industries?.includes(industry)
                        ? theme?.colors.brand.basewhite
                        : theme?.colors.brand.black,
                    }}
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    {industry}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Spacer>
      <CloseButton
        onPress={updateIndustries}
        spaceBottom="230px"
        style={{
          alignSelf: "flex-end",
          elevation: 5,
          shadowColor: theme.colors.brand.black,
          shadowOpacity: 0.5,
          shadowRadius: "5px",
          backgroundColor: theme.colors.brand.base,
        }}>
        <IconComponent
          iconFunction={updateIndustries}
          iconName="send"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[1]}
          color={theme.colors.brand.basewhite}
        />
      </CloseButton>
    </View>
  );
}
