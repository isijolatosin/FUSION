import React, { useEffect, useState } from "react";
import { ScrollView, Switch, View } from "react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "react-native-range-slider-expo";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import * as Location from "expo-location";

import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RangeCompoentSection } from "../main.style";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";
import OnboardingErrorComponent from "../../../Onboarding/components/OnboardingErrorComponent";
import { getUserLocation } from "../../../../utilities/getUserLocation";

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
        marginBottom: 20,
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

function InterestFilterComponent({ theme, setSelectedInterest }) {
  const [clickedIndex, setIndex] = useState(null);

  const handleInterestToggle = (id, value) => {
    setIndex(id);
    setSelectedInterest(value);
  };

  const interestArray = ["men", "women", "both"];

  return (
    <HorizontalPaddingSpace style={{ marginBottom: 50 }} space={theme.space[5]}>
      <Spacer position="top" size="large">
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
            onPress={() => handleInterestToggle(idx, interest)}
            style={{ textTransform: "capitalize" }}
            variant="loading"
            colorType="black"
            fontType="montserratLight"
            fontSize="body">
            {interest}
          </Text>
          <CheckBox
            checked={clickedIndex === idx}
            onPress={() => handleInterestToggle(idx, interest)}
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
  theme,
  isVisible,
  onClose,
  allUsers,
  setUserFilteredData,
}) {
  const [distanceValue, setDistanceValue] = useState(0);
  const [fromAgeValue, setFromAgeValue] = useState(18);
  const [toAgeValue, setToAgeValue] = useState(30);
  const [selectedInterest, setSelectedInterest] = useState("");
  const [suggestAgeWithRange, setSuggestAgeWithRange] = useState(false);
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] =
    useState(false);
  const [location, setLocation] = useState(null);
  const [locationsInRange, setLocationsInRange] = useState([]);

  //   const fetchPlacesByDistance = async (distanceValue, location) => {
  //     // Fetch nearby places using the Google Places API
  //     const apiKey = "AIzaSyAJXYHwxitlyckO82-E9jY7oinAk9crFGs";
  //     const radius = distanceValue * 1000;
  //     const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=${radius}&key=${apiKey}`;
  //
  //     try {
  //       const response = await axios.get(apiUrl);
  //       setLocationsInRange(response.data.results);
  //     } catch (error) {
  //       console.error("Error fetching nearby places:", error);
  //     }
  //   };

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
            style={{ textAlign: "center", marginTop: 50 }}
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
          <InterestFilterComponent
            theme={theme}
            setSelectedInterest={setSelectedInterest}
          />
        </Spacer>
      </ScrollView>
    </Modal>
  );
}
