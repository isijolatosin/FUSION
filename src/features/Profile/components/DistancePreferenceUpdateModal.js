import { useState } from "react";
import { Switch, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import { RangeCompoentSection } from "../../Main/screen/main.style";
import { filterCaution } from "../../../constants";

export default function DistancePreferenceUpdateModal({
  theme,
  width,
  height,
  currentUser,
  onClose,
}) {
  const [distanceValue, setDistanceValue] = useState(
    currentUser?.distancePreference?.value
      ? currentUser?.distancePreference?.value
      : 0
  );
  const displayDistanceText = `${distanceValue ? distanceValue : 0}km`;
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] = useState(
    currentUser?.distancePreference?.suggest
      ? currentUser?.distancePreference?.suggest
      : false
  );

  async function triggerDistanceFilter() {
    const valueObject = {
      value: distanceValue,
      suggest: suggestDistanceWithRange,
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
          iconFunction={() => {
            triggerDistanceFilter();
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
                colorType="base1"
                fontType="montserratBold"
                fontSize="button">
                Maximum Distance
              </Text>
            </View>
            <View>
              <Text
                variant="custom"
                colorType="base1"
                fontType="montserratLight"
                fontSize="button">
                {displayDistanceText}
              </Text>
            </View>
          </RangeCompoentSection>
          {!suggestDistanceWithRange && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spaceNumber[2],
                paddingVertical: theme.spaceNumber[3],
              }}>
              <View
                style={{
                  marginRight: theme.spaceNumber[2],
                }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="warning-outline"
                  IconComponent={Ionicons}
                  size={20}
                  color={theme.colors.brand.teal}
                />
              </View>
              <View style={{ width: width - theme.spaceNumberBy10[6] }}>
                <Text
                  style={{
                    textAlign: "left",
                    lineHeight: theme.spaceNumber[6],
                  }}
                  variant="custom"
                  colorType="teal"
                  fontType="montserratRegular"
                  fontSize="xcaption">
                  {filterCaution}
                </Text>
              </View>
            </View>
          )}
          <RangeCompoentSection>
            <Slider
              style={{ width: "100%", margin: 0 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={currentUser?.distancePreference?.value ?? distanceValue}
              minimumTrackTintColor={theme.colors.brand.base6}
              maximumTrackTintColor={theme.colors.brand.black}
              thumbTintColor={theme.colors.brand.base1}
              onValueChange={setDistanceValue}
              onSlidingStart={() => setSuggestDistanceWithRange(false)}
            />
          </RangeCompoentSection>
          <RangeCompoentSection>
            <View>
              <Text
                variant="custom"
                colorType="base1"
                fontType="montserratRegular"
                fontSize="caption">
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
