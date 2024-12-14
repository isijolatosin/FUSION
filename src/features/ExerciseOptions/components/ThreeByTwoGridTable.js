import React, { useRef, useState } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { CheckBox } from "react-native-elements";

const ThreeByTwoGridTable = ({
  theme,
  sets,
  reps,
  rir,
  weight,
  setsChecked,
  setShowTimer,
  setSetsChecked,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const animatedWidths = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const animateWidth = (index, toValue) => {
    Animated.timing(animatedWidths[index], {
      toValue,
      duration: 500, // Adjust duration as needed
      useNativeDriver: false,
    }).start();
  };

  const handleCheckboxClick = (index) => {
    if (index !== activeIndex) {
      animateWidth(index, 100);
      setActiveIndex(index);

      setSetsChecked({
        ...setsChecked,
        [index]: true,
      });

      setShowTimer(true);
    } else {
      setActiveIndex(null);
      animateWidth(activeIndex, 0);

      setSetsChecked({
        ...setsChecked,
        [index]: false,
      });

      setShowTimer(false);
    }
  };

  return (
    <View>
      {/* First Row */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingVertical: theme.spaceNumber[5],
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingLeft: theme.spaceNumber[5],
        }}>
        <View style={{ flex: 0.2 }}>
          <Text
            variant="custom"
            colorType="base5"
            fontType="montserratSemibold"
            fontSize="button"
            transform="capitalize">
            Set
          </Text>
        </View>
        <View
          style={{
            flex: 0.8,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <View>
            <Text
              variant="custom"
              colorType="base5"
              fontType="montserratSemibold"
              fontSize="button"
              transform="capitalize">
              Reps
            </Text>
          </View>
          <View>
            <Text
              variant="custom"
              colorType="base5"
              fontType="montserratSemibold"
              fontSize="button">
              LBs
            </Text>
          </View>
          <View>
            <Text
              variant="custom"
              colorType="base5"
              fontType="montserratSemibold"
              fontSize="button"
              transform="uppercase">
              RIR
            </Text>
          </View>
          <View style={{ opacity: 0 }}>
            <Text
              variant="custom"
              colorType="base5"
              fontType="montserratSemibold"
              fontSize="button"
              transform="uppercase">
              RIR
            </Text>
          </View>
        </View>
      </View>

      {/* Second Row */}
      {Array(sets?.length)
        .fill()
        .map((_, index) => (
          <View
            key={index}
            style={{
              position: "relative",
              flexDirection: "row",
              width: "100%",
              height: theme.spaceNumber[14],
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: theme.colors.brand.linesLighter,
              marginTop: theme.spaceNumber[5],
              paddingLeft: theme.spaceNumber[5],
              borderBottomWidth: 0.5,
            }}>
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <Animated.View
                style={[
                  {
                    backgroundColor: theme.colors.brand.tealLight,
                    height: "100%",
                    borderRadius: theme.spaceNumber[10],
                  },
                  {
                    width: animatedWidths[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <View style={{ flex: 0.2 }}>
              <Text
                variant="custom"
                colorType="base1"
                fontType="montserratLight"
                fontSize="button"
                transform="capitalize">
                # {index + 1}
              </Text>
            </View>
            <View
              style={{
                flex: 0.6,
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: -theme.spaceNumber[12],
              }}>
              <View>
                <Text
                  variant="custom"
                  colorType="base1"
                  fontType="montserratLight"
                  fontSize="button"
                  transform="capitalize">
                  {reps?.[index]}
                </Text>
              </View>
              <View>
                <Text
                  variant="custom"
                  colorType="base1"
                  fontType="montserratLight"
                  fontSize="button"
                  transform="capitalize">
                  {weight?.[index]}
                </Text>
              </View>
              <View>
                <Text
                  variant="custom"
                  colorType="base1"
                  fontType="montserratLight"
                  fontSize="button"
                  transform="uppercase">
                  {rir?.[index]}
                </Text>
              </View>
            </View>
            <View
              style={{ width: 50 }}
              onPress={() => {
                handleCheckboxClick(index);
              }}>
              <CheckBox
                title=""
                checked={setsChecked[index]}
                onPress={() => {
                  handleCheckboxClick(index);
                }}
                checkedColor={theme.colors.brand.base3}
                uncheckedColor={theme.colors.brand.base3}
                wrapperStyle={{
                  width: 50,
                  height: 20,
                  // padding: 0,
                }}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
              />
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ThreeByTwoGridTable;
