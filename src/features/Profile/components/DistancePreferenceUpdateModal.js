import { useState } from "react";
import { Switch, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { RangeCompoentSection } from "../../Main/screen/main.style";

export default function DistancePreferenceUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [distanceValue, setDistanceValue] = useState(
    currentUser?.distancePreference?.value ?? 0
  );
  const displayDistanceText = `${distanceValue ? distanceValue : 0}km`;
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] = useState(
    currentUser?.distancePreference?.suggest
  );

  const handleValueChange = (newValue) => {
    setDistanceValue(newValue);
  };

  async function triggerDistanceFilter(booleanValue) {
    const valueObject = {
      value: distanceValue,
      suggest: booleanValue ?? suggestDistanceWithRange,
    };
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "distancePreference",
      valueObject,
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
          Maximum Distance
        </Text>
      </View>
      <Spacer position="top" size="xxxlarge">
        <View
          style={{
            borderBottomColor: theme.colors.brand.linesLighter,
            borderBottomWidth: 0.3,
            paddingBottom: theme.spaceNumber[3],
            marginBottom: theme.spaceNumber[6],
          }}>
          <RangeCompoentSection>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratBold"
                fontSize="button">
                Maximum Distance
              </Text>
            </View>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratLight"
                fontSize="button">
                {displayDistanceText}
              </Text>
            </View>
          </RangeCompoentSection>
          <RangeCompoentSection>
            <Slider
              style={{ width: "100%", margin: 0 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={currentUser?.distancePreference?.value ?? distanceValue}
              minimumTrackTintColor={theme.colors.brand.base}
              maximumTrackTintColor={theme.colors.brand.highlight}
              thumbTintColor={theme.colors.brand.base}
              onValueChange={handleValueChange}
              onSlidingStart={() => setSuggestDistanceWithRange(false)}
            />
          </RangeCompoentSection>
          <RangeCompoentSection>
            <View>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratRegular"
                fontSize="button">
                Only suggest people within this range
              </Text>
            </View>
            <Switch
              trackColor={{
                false: theme.colors.brand.linesLight,
                true: theme.colors.brand.base,
              }}
              thumbColor={
                suggestDistanceWithRange
                  ? theme.colors.brand.highlight
                  : theme.colors.brand.lines
              }
              onValueChange={(val) => {
                triggerDistanceFilter(val);
                setSuggestDistanceWithRange(val);
              }}
              value={suggestDistanceWithRange}
            />
          </RangeCompoentSection>
        </View>
      </Spacer>
    </View>
  );
}
