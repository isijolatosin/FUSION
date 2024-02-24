import { useState } from "react";
import { Switch, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RangeSlider from "react-native-range-slider-expo";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { RangeCompoentSection } from "../../Main/screen/main.style";

export default function AgePreferenceUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [fromAgeValue, setFromAgeValue] = useState(
    currentUser?.agePreference?.value ?? 18
  );
  const [toAgeValue, setToAgeValue] = useState(
    currentUser?.agePreference?.value ?? 30
  );
  const [suggestAgeWithRange, setSuggestAgeWithRange] = useState(
    currentUser?.agePreference?.suggest
  );

  const displayValue = `${
    fromAgeValue ?? currentUser?.agePreference?.fromAgeValue
  } - ${toAgeValue ?? currentUser?.agePreference?.toAgeValue}`;

  async function triggerAgeFilter(useOption) {
    const value = {
      fromAgeValue: fromAgeValue,
      toAgeValue: toAgeValue,
      suggest: useOption ?? suggestAgeWithRange,
    };

    // age
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "agePreference",
      value,
      () => {}
    );
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
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          Age Range
        </Text>
      </View>
      <Spacer position="top" size="xxxlarge">
        <View
          style={{
            borderBottomColor: theme.colors.brand.linesLighter,
            borderBottomWidth: 0.3,
            paddingBottom: theme.spaceNumber[3],
            marginBottom: theme.spaceNumber[0],
          }}>
          <RangeCompoentSection>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="button">
                Age Range
              </Text>
            </View>
            <View>
              <Text
                variant="loading"
                colorType="black"
                fontType="montserratLight"
                fontSize="button">
                {displayValue}
              </Text>
            </View>
          </RangeCompoentSection>
          <RangeCompoentSection>
            <RangeSlider
              min={18}
              max={100}
              step={1}
              styleSize="small"
              barHeight={4}
              fromKnobColor={theme.colors.brand.base}
              toKnobColor={theme.colors.brand.base}
              inRangeBarColor={theme.colors.brand.base}
              outOfRangeBarColor={theme.colors.brand.highlight}
              showRangeLabels={false}
              showValueLabels={false}
              fromValueOnChange={(value) => {
                setSuggestAgeWithRange(false);
                setFromAgeValue(value);
              }}
              toValueOnChange={(value) => {
                setSuggestAgeWithRange(false);
                setToAgeValue(value);
              }}
              initialFromValue={
                currentUser?.agePreference?.fromAgeValue ?? fromAgeValue
              }
              initialToValue={
                currentUser?.agePreference?.toAgeValue ?? toAgeValue
              }
              containerStyle={{
                padding: 0,
                height: theme.spaceNumberBy10[3],
                width: "97%",
                marginLeft: 8,
              }}
            />
          </RangeCompoentSection>
          <RangeCompoentSection>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="button">
                Only suggest people within this age
              </Text>
            </View>
            <Switch
              trackColor={{
                false: theme.colors.brand.linesLight,
                true: theme.colors.brand.base,
              }}
              thumbColor={
                suggestAgeWithRange
                  ? theme.colors.brand.highlight
                  : theme.colors.brand.lines
              }
              onValueChange={(val) => {
                triggerAgeFilter(val);
                setSuggestAgeWithRange(val);
              }}
              value={suggestAgeWithRange}
            />
          </RangeCompoentSection>
        </View>
      </Spacer>
    </View>
  );
}
