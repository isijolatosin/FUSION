import React, { useState } from "react";
import { Dimensions, ScrollView, Switch, View } from "react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "react-native-range-slider-expo";
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
import AnimatedModal from "../../../../components/general-component/AnimatedModal";
import { storeData } from "../../../../utilities/storeDataInPhoneMemory";

function RangeCompoent({
  theme,
  text,
  description,
  selectedValue,
  setSelectedValue,
  initialValue,
  suggest,
  setSuggest,
  triggerDistanceFilter,
  setIsRetrigger,
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
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="title">
            {text}
          </Text>
        </View>
        <View>
          <Text variant="loading" colorType="black" fontType="montserratLight">
            {displayValue}
          </Text>
        </View>
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
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratRegular"
            fontSize="button">
            {description}
          </Text>
        </View>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.base,
          }}
          thumbColor={
            suggest ? theme.colors.brand.highlight : theme.colors.brand.lines
          }
          onValueChange={(val) => {
            triggerDistanceFilter();
            setIsRetrigger(true);
            setSuggest(val);
          }}
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
  triggerAgeFilter,
  setIsRetrigger,
}) {
  let displayValue = `${fromAgeValue} - ${toAgeValue}`;

  return (
    <View
      style={{
        borderBottomColor: theme.colors.brand.lines,
        borderBottomWidth: 0.3,
        paddingBottom: 25,
        marginBottom: theme.spaceNumberBy10[0],
        paddingHorizontal: theme.spaceNumberBy10[2],
      }}>
      <RangeCompoentSection>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="title">
            {text}
          </Text>
        </View>
        <View>
          <Text variant="loading" colorType="black" fontType="montserratLight">
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
          fromValueOnChange={(value) => setFromAgeValue(value)}
          toValueOnChange={(value) => setToAgeValue(value)}
          initialFromValue={fromAgeValue}
          initialToValue={toAgeValue}
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
            {description}
          </Text>
        </View>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.base,
          }}
          thumbColor={
            suggest ? theme.colors.brand.highlight : theme.colors.brand.lines
          }
          onValueChange={(val) => {
            triggerAgeFilter();
            setIsRetrigger(true);
            setSuggest(val);
          }}
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

  const triggerInterestUpdate = async (value) => {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "interest",
      value,
      setIsRetrigger
    );
  };
  const handleInterestToggle = async (id, value) => {
    setIndex(id);
    setSelectedInterest(value);
    triggerInterestUpdate(value);
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
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="title">
            Who am I interested in?
          </Text>
        </View>
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
          <View>
            <Text
              onPress={() => handleInterestToggle(idx, interest.key)}
              style={{ textTransform: "capitalize" }}
              variant="loading"
              colorType="black"
              fontType="montserratLight"
              fontSize="body">
              {interest.value}
            </Text>
          </View>
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
    </HorizontalPaddingSpace>
  );
}

export default function FilterComponent({
  allUsers,
  currentUser,
  distanceValue,
  fromAgeValue,
  isVisible,
  onClose,
  setDistanceValue,
  setFromAgeValue,
  setIsRetrigger,
  setToAgeValue,
  setUserFilteredData,
  toAgeValue,
  theme,
  triggerAgeFilter,
}) {
  const { width } = Dimensions.get("window");
  const [suggestAgeWithRange, setSuggestAgeWithRange] = useState(false);
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] =
    useState(false);

  const currentUserLocation = {
    longitude: currentUser?.longitude,
    latitude: currentUser?.latitude,
  };

  function triggerAgeFilter() {
    if (fromAgeValue) storeData("fromAgeValue", fromAgeValue);
    if (toAgeValue) storeData("toAgeValue", toAgeValue);

    // age
    const filterWithAgeRange = allUsers.filter((data) => {
      const currentUserAge = calculateAge(
        data?.dob?.year,
        data?.dob?.month,
        data?.dob?.day
      );

      if (+fromAgeValue <= +currentUserAge && +currentUserAge <= +toAgeValue) {
        return data;
      }
    });

    setUserFilteredData(filterWithAgeRange);
  }

  function triggerDistanceFilter() {
    storeData("distanceValue", distanceValue);

    // distance
    setUserFilteredData(
      ...filterUsersWithinDistanceRange(
        currentUserLocation,
        allUsers,
        distanceValue
      )
    );
  }

  return (
    <AnimatedModal
      isAlignItems={true}
      isPaddingBottom={true}
      isPaddingTop={true}
      isVisible={isVisible}
      onClose={() => {
        setSuggestAgeWithRange(false);
        setSuggestDistanceWithRange(false);
        onClose();
      }}
      theme={theme}
      width={width}
      isTransparent={true}>
      <ScrollView style={{ paddingTop: 0, width: "100%" }}>
        <View style={{ position: "absolute", right: 30, top: 0 }}>
          <IconComponent
            iconFunction={() => {
              setSuggestAgeWithRange(false);
              setSuggestDistanceWithRange(false);
              onClose();
            }}
            iconName="close"
            IconComponent={AntDesign}
            size={25}
            color={theme.colors.brand.black}
          />
        </View>
        <Spacer position="top" size="large">
          <Text
            style={{ textAlign: "center", marginTop: 30 }}
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="h5">
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
            triggerDistanceFilter={triggerDistanceFilter}
            setIsRetrigger={setIsRetrigger}
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
            triggerAgeFilter={triggerAgeFilter}
            setIsRetrigger={setIsRetrigger}
          />
          <Spacer position="top" size="xxlarge">
            <InterestFilterComponent
              theme={theme}
              currentUser={currentUser}
              setIsRetrigger={setIsRetrigger}
            />
          </Spacer>
        </Spacer>
      </ScrollView>
    </AnimatedModal>
  );
}
