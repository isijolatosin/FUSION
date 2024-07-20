import { useState } from "react";
import { ScrollView, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import * as Updates from "expo-updates"; // reload entire app

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";
import { appreloadmessage } from "../../../constants";

export default function PreferenceUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [datingPreference, setDatingPreference] = useState(
    currentUser?.preference ?? ""
  );
  async function updatePreference() {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "preference",
      datingPreference,
      () => {}
    );

    //     const reloadAppId = setTimeout(async () => {
    //       await Updates.reloadAsync();
    //     }, 1000);
    //
    //     return () => clearTimeout(reloadAppId);
  }

  return (
    <View style={{ height: height }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={() => {
            updatePreference();
            onClose();
          }}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.base1}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="base1"
          fontType="montserratRegular"
          fontSize="title">
          Preference
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[0]}>
        <Spacer position="top" size="medium">
          <View>
            <Text
              style={{ textAlign: "center" }}
              variant="custom"
              colorType="base6"
              fontType="montserratRegular"
              fontSize="button">
              {appreloadmessage}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}>
            <Spacer position="top" size="xxxlarge">
              <Button
                backgroundColor={
                  datingPreference === "Friendship"
                    ? theme.colors.brand.base6
                    : theme.colors.brand.base8
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setDatingPreference("Friendship")}
                text="Friendship"
                textColor={theme.colors.brand.base1}
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  datingPreference === "Life Partner"
                    ? theme.colors.brand.base6
                    : theme.colors.brand.base8
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setDatingPreference("Life Partner")}
                text="Life Partner"
                textColor={theme.colors.brand.base1}
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  datingPreference === "Casual Dating"
                    ? theme.colors.brand.base6
                    : theme.colors.brand.base8
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setDatingPreference("Casual Dating")}
                text="Casual Dating"
                textColor={theme.colors.brand.base1}
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  datingPreference === "Don't know yet"
                    ? theme.colors.brand.base6
                    : theme.colors.brand.base8
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setDatingPreference("Don't know yet")}
                text="Don't know yet"
                textColor={theme.colors.brand.base1}
              />
            </Spacer>
            <Spacer position="top" size="small">
              <Button
                backgroundColor={
                  datingPreference === "Prefer Not to Say"
                    ? theme.colors.brand.base6
                    : theme.colors.brand.base8
                }
                isBorder={false}
                isNotBold={true}
                borderColor="transparent"
                buttonFunction={() => setDatingPreference("Prefer Not to Say")}
                text="Prefer Not to Say"
                textColor={theme.colors.brand.base1}
              />
            </Spacer>
          </ScrollView>
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
