import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { industriesList } from "../../../constants";
import { sortByKey } from "../../../utilities/sortByKey";

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
      const popedIndustriesArray = industries?.filter((item) => item !== int);

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
          iconFunction={() => {
            updateIndustries();
            onClose();
          }}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme?.spaceNumberBy10[2]}
          color={theme?.colors.brand.base1}
          horizontalLeftSpace={`-${theme?.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
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
                      ? theme?.colors.brand.base6
                      : theme?.colors.brand.base8,
                  }}
                />
                <View
                  style={{
                    marginLeft: theme.spaceNumber[1],
                    flexDirection: "row",
                    flexWrap: "wrap",
                    backgroundColor: industries?.includes(industry)
                      ? theme?.colors.brand.base6
                      : theme?.colors.brand.base8,
                    paddingVertical: theme?.spaceNumber[3],
                    borderTopEndRadius: theme?.spaceNumberBy10[9],
                    borderBottomEndRadius: theme?.spaceNumberBy10[9],
                    paddingHorizontal: theme?.spaceNumber[3],
                  }}>
                  <Text
                    style={{
                      color: theme?.colors.brand.base1,
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
    </View>
  );
}
