import React from "react";
import { ScrollView, View, Text } from "react-native";

import {
  DropdowSelectionLists,
  DropdownSelectionWrapper,
  DropdownSelectionContainer,
  DropdowSelectionItem,
  DropdowSelectionItemWrapper,
} from "./sub-component.style";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { Text as TypoText } from "../../../../components/typography/text.component";

export default function DropdownSelection({
  data,
  isOpen,
  setOpen,
  value,
  setFunction,
  theme,
  isForHeightComponent,
}) {
  let inputText = "Choose an option";
  // let inputText = isForHeightComponent ? data[0] : "";
  if (value !== "") inputText = value;

  function formatHeightText(height) {
    const feet = height?.split("feet")[0].trim();
    let inch = "";
    if (height?.includes("inch")) {
      inch = height?.split("feet")[1]?.split("inch")[0].trim();
    }

    return { feet, inch };
  }

  return (
    <DropdownSelectionContainer>
      <DropdownSelectionWrapper isOpen={isOpen} isSelectionDisplayInput={true}>
        <DropdowSelectionItemWrapper
          isBorderBottom={false}
          onPress={() => setOpen(!isOpen)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
            }}>
            <DropdowSelectionItem
              style={{
                color: theme.colors.brand.highlight,
                alignItems: "center",
              }}
              isSelectionDisplayInput={true}>
              <TypoText
                variant="custom"
                colorType="basewhite"
                fontType="montserratSemibold"
                fontSize="title">
                {isForHeightComponent
                  ? formatHeightText(inputText).feet
                  : inputText}
              </TypoText>
            </DropdowSelectionItem>
            {isForHeightComponent && inputText !== "Choose an option" && (
              <Text
                style={{
                  paddingHorizontal: 5,
                  color: theme.colors.brand.highlight,
                }}>
                ft
              </Text>
            )}
          </View>
          {isForHeightComponent && formatHeightText(inputText).inch && (
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <DropdowSelectionItem
                style={{ color: theme.colors.brand.highlight }}
                isSelectionDisplayInput={true}>
                {formatHeightText(inputText).inch}
              </DropdowSelectionItem>
              <Text
                style={{
                  paddingHorizontal: 5,
                  color: theme.colors.brand.highlight,
                }}>
                in
              </Text>
            </View>
          )}
        </DropdowSelectionItemWrapper>
      </DropdownSelectionWrapper>
      {isOpen && (
        <Spacer position="top" size="xsmall">
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: 350 }}>
            <DropdowSelectionLists>
              {data.map((datum, idx) => (
                <DropdowSelectionItemWrapper
                  key={idx}
                  isBorderBottom={true}
                  onPress={() => {
                    setOpen(false);
                    setFunction(datum);
                  }}>
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <DropdowSelectionItem>
                      {isForHeightComponent
                        ? formatHeightText(datum).feet
                        : datum}
                    </DropdowSelectionItem>
                    {isForHeightComponent && (
                      <Text style={{ paddingHorizontal: 5 }}>ft</Text>
                    )}
                  </View>
                  {isForHeightComponent && formatHeightText(datum).inch && (
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}>
                      <DropdowSelectionItem>
                        {formatHeightText(datum).inch}
                      </DropdowSelectionItem>
                      <Text style={{ paddingHorizontal: 5 }}>in</Text>
                    </View>
                  )}
                </DropdowSelectionItemWrapper>
              ))}
            </DropdowSelectionLists>
          </ScrollView>
        </Spacer>
      )}
    </DropdownSelectionContainer>
  );
}
