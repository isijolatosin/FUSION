import React, { useEffect, useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "react-native-range-slider-expo";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RangeCompoentSection } from "../main.style";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";
import filterUsersWithinDistanceRange from "../../../../utilities/filterUsersWithinDistanceRange";
import calculateAge from "../../../../utilities/calculateAge";
import Button from "../../../../components/utility/button.component";
import { updateUserValueField } from "../../../../utilities/updateFirestoreDatabaseField";

function RangeCompoent({
  theme,
  text,
  description,
  selectedValue,
  setSelectedValue,
  initialValue,
  suggest,
  setSuggest,
}) {
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
  };

  let displayValue = `${selectedValue}km`;

  return (
    <View
      style={{
        borderBottomColor: theme.colors.brand.lines,
        borderBottomWidth: 0.3,
        paddingBottom: 25,
        marginBottom: 30,
        paddingHorizontal: 30,
      }}>
      <RangeCompoentSection>
        <Text variant="bodyBoldBold">{text}</Text>
        <Text variant="loading" colorType="black" fontType="montserratLight">
          {displayValue}
        </Text>
      </RangeCompoentSection>
      <RangeCompoentSection>
        {/* {Platform.OS === "ios" ? ( */}
        <Slider
          style={{ width: "100%", margin: 0 }}
          minimumValue={initialValue}
          maximumValue={100}
          step={1}
          value={selectedValue}
          minimumTrackTintColor={theme.colors.brand.base}
          maximumTrackTintColor={theme.colors.brand.highlight}
          thumbTintColor={theme.colors.brand.base}
          onValueChange={handleValueChange}
        />
        {/* ) : (
          <ExpoSlider
            min={0}
            max={100}
            step={1}
            styleSize="small"
            barHeight={4}
            knobColor={theme.colors.brand.base}
            inRangeBarColor={theme.colors.brand.highlight}
            outOfRangeBarColor={theme.colors.brand.base}
            showRangeLabels={false}
            showValueLabels={false}
            valueOnChange={handleValueChange}
            initialValue={initialValue}
            containerStyle={{
              padding: 0,
              height: 40,
              width: "98%",
              marginLeft: 12,
            }}
          />
        )} */}
      </RangeCompoentSection>
      <RangeCompoentSection>
        <Text variant="captionBig">{description}</Text>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.base,
          }}
          thumbColor={
            suggest ? theme.colors.brand.highlight : theme.colors.brand.lines
          }
          onValueChange={setSuggest}
          value={suggest}
        />
      </RangeCompoentSection>
    </View>
  );
}

function DoubleRangeCompoent({
  theme,
  text,
  description,
  fromAgeValue,
  toAgeValue,
  suggest,
  setSuggest,
  setFromAgeValue,
  setToAgeValue,
}) {
  let displayValue = `${fromAgeValue} - ${toAgeValue}`;

  return (
    <View
      style={{
        borderBottomColor: theme.colors.brand.lines,
        borderBottomWidth: 0.3,
        paddingBottom: 25,
        marginBottom: 10,
        paddingHorizontal: 30,
      }}>
      <RangeCompoentSection>
        <Text variant="bodyBoldBold">{text}</Text>
        <Text variant="loading" colorType="black" fontType="montserratLight">
          {displayValue}
        </Text>
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
          fromValueOnChange={(value) => setFromAgeValue(value)}
          toValueOnChange={(value) => setToAgeValue(value)}
          initialFromValue={18}
          initialToValue={30}
          containerStyle={{
            padding: 0,
            height: 40,
            width: "97%",
            marginLeft: 8,
          }}
        />
      </RangeCompoentSection>
      <RangeCompoentSection>
        <Text variant="captionBig">{description}</Text>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.base,
          }}
          thumbColor={
            suggest ? theme.colors.brand.highlight : theme.colors.brand.lines
          }
          onValueChange={setSuggest}
          value={suggest}
        />
      </RangeCompoentSection>
    </View>
  );
}

function InterestFilterComponent({ theme, currentUser, setIsRetrigger }) {
  const [selectedInterest, setSelectedInterest] = useState(
    currentUser?.interest
  );
  const [clickedIndex, setIndex] = useState(null);

  const handleInterestToggle = (id, value) => {
    setIndex(id);
    setSelectedInterest(value);
  };

  const triggerInterestUpdate = async () => {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "interest",
      selectedInterest,
      setIsRetrigger
    );
  };

  const interestArray = [
    {
      key: "man",
      value: "men",
    },
    {
      key: "woman",
      value: "women",
    },
    {
      key: "both",
      value: "both",
    },
  ];

  return (
    <HorizontalPaddingSpace style={{ marginBottom: 50 }} space={theme.space[5]}>
      <Spacer position="top" size="xsmall">
        <Text variant="bodyBoldBold">Who am I interested in?</Text>
      </Spacer>
      {interestArray.map((interest, idx) => (
        <Spacer
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          position="top"
          size="large">
          <Text
            onPress={() => handleInterestToggle(idx, interest.key)}
            style={{ textTransform: "capitalize" }}
            variant="loading"
            colorType="black"
            fontType="montserratLight"
            fontSize="body">
            {interest.value}
          </Text>
          <CheckBox
            checked={selectedInterest === interest.key || clickedIndex === idx}
            onPress={() => handleInterestToggle(idx, interest.key)}
            checkedColor={theme.colors.brand.base}
            uncheckedColor={theme.colors.brand.linesLight}
            size={35}
            containerStyle={{
              padding: 0,
              margin: 0,
            }}
            wrapperStyle={{
              marginBottom: -10,
              marginRight: -10,
            }}
          />
        </Spacer>
      ))}
      <HorizontalPaddingSpace
        style={{ marginBottom: 20 }}
        space={theme.space[9]}>
        <Button
          backgroundColor="transparent"
          isBorder={false}
          borderColor={theme.colors.brand.brandFade}
          buttonFunction={triggerInterestUpdate}
          text="Apply Interest"
          textColor={theme.colors.brand.brandFade}
        />
      </HorizontalPaddingSpace>
    </HorizontalPaddingSpace>
  );
}

export default function FilterComponent({
  theme,
  isVisible,
  onClose,
  allUsers,
  currentUser,
  setUserFilteredData,
  setIsRetrigger,
}) {
  const [distanceValue, setDistanceValue] = useState(0);
  const [fromAgeValue, setFromAgeValue] = useState(18);
  const [toAgeValue, setToAgeValue] = useState(30);
  const [suggestAgeWithRange, setSuggestAgeWithRange] = useState(false);
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] =
    useState(false);

  const currentUserLocation = {
    longitude: currentUser?.longitude,
    latitude: currentUser?.latitude,
  };

  function triggerFilter() {
    const filteredResult = [];
    const filteredResult2 = [];

    // distance
    if (distanceValue && suggestDistanceWithRange) {
      filteredResult.push(
        ...filterUsersWithinDistanceRange(
          currentUserLocation,
          allUsers,
          distanceValue
        )
      );
    } else {
      filteredResult.push(...allUsers);
    }

    // age
    if (filteredResult.length && suggestAgeWithRange) {
      const filterWithAgeRange = filteredResult.filter((data) => {
        const age = calculateAge(data?.dob?.year);

        if (fromAgeValue < age && age <= toAgeValue) {
          return data;
        }
      });

      filteredResult2.push(...filterWithAgeRange);
    } else {
      filteredResult2.push(...filteredResult);
    }

    setUserFilteredData(filteredResult2);
    setSuggestAgeWithRange(false);
    setSuggestDistanceWithRange(false);
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      style={{
        backgroundColor: theme.colors.brand.white,
        margin: 0,
        paddingTop: Platform.OS === "ios" ? 150 : 100,
        position: "relative",
        alignItems: "flex-end",
        paddingBottom: 10,
      }}>
      <ScrollView style={{ paddingTop: 0 }}>
        <View style={{ position: "absolute", right: 30, top: 0 }}>
          <IconComponent
            iconFunction={onClose}
            iconName="close"
            IconComponent={AntDesign}
            size={25}
            color={theme.colors.brand.black}
          />
        </View>
        <Spacer position="top" size="large">
          <Text
            style={{ textAlign: "center", marginTop: 30 }}
            variant="heading">
            Preference Settings
          </Text>
        </Spacer>
        <Spacer position="top" size="xxlarge">
          <RangeCompoent
            theme={theme}
            text="Distance"
            description="Only suggest people within this range"
            type="distance"
            selectedValue={distanceValue}
            setSelectedValue={setDistanceValue}
            initialValue={0}
            suggest={suggestDistanceWithRange}
            setSuggest={setSuggestDistanceWithRange}
          />
          <DoubleRangeCompoent
            theme={theme}
            text="Age"
            description="Only suggest people within this age"
            setFromAgeValue={setFromAgeValue}
            setToAgeValue={setToAgeValue}
            fromAgeValue={fromAgeValue}
            toAgeValue={toAgeValue}
            suggest={suggestAgeWithRange}
            setSuggest={setSuggestAgeWithRange}
          />
          <HorizontalPaddingSpace
            style={{ marginBottom: 20 }}
            space={theme.space[9]}>
            <Button
              backgroundColor="transparent"
              isBorder={false}
              borderColor={theme.colors.brand.brandFade}
              buttonFunction={triggerFilter}
              text="Apply Preference"
              textColor={theme.colors.brand.brandFade}
            />
          </HorizontalPaddingSpace>
          <InterestFilterComponent
            theme={theme}
            currentUser={currentUser}
            setIsRetrigger={setIsRetrigger}
          />
        </Spacer>
      </ScrollView>
    </Modal>
  );
}
