import React, { Fragment, useState } from "react";
import { Dimensions, Pressable, ScrollView, Switch, View } from "react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "react-native-range-slider-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckBox } from "react-native-elements";

import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import { RangeCompoentSection } from "../main.style";
import IconComponent from "../../../../components/icon-components/IconComponent";
import { HorizontalPaddingSpace } from "../../../../components/utility/space-area.component";
import { updateUserValueField } from "../../../../utilities/updateFirestoreDatabaseField";
import AnimatedModal from "../../../../components/general-component/AnimatedModal";
import UpdateModal from "../../../Profile/components/UpdateModal";
import ReligionUpdateModal from "../../../Profile/components/ReligionUpdateModal";
import HeightUpdateModal from "../../../Profile/components/HeightUpdateModal";
import HeaderComponent from "../../../../components/general-component/HeaderComponent";

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
  setIndex,
  storeData,
}) {
  const [displayValue, setDisplayValue] = useState(
    selectedValue ? selectedValue : 0
  );
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    setDisplayValue(newValue);
  };

  return (
    <View
      style={{
        borderBottomColor: theme.colors.brand.linesLighter,
        borderBottomWidth: 0.3,
        paddingBottom: theme.spaceNumber[5],
        marginBottom: theme.spaceNumber[0],
        paddingHorizontal: theme.spaceNumber[4],
      }}>
      <RangeCompoentSection>
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratBold"
            fontSize="button">
            {text}
          </Text>
        </View>
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratLight"
            fontSize="button">
            {displayValue} km
          </Text>
        </View>
      </RangeCompoentSection>
      <View
        style={{
          paddingRight: theme.spaceNumberBy10[4] + theme.spaceNumber[1],
        }}>
        <RangeCompoentSection>
          <Slider
            style={{ width: "100%", margin: 0 }}
            minimumValue={initialValue}
            maximumValue={200}
            step={1}
            value={selectedValue}
            minimumTrackTintColor={theme.colors.brand.base6}
            maximumTrackTintColor={theme.colors.brand.black}
            thumbTintColor={theme.colors.brand.base1}
            onValueChange={handleValueChange}
            onSlidingStart={() => setSuggest(false)}
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
      </View>
      <RangeCompoentSection>
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratLight"
            fontSize="caption">
            {description}
          </Text>
        </View>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.linesLighter,
          }}
          thumbColor={
            suggest ? theme.colors.brand.base1 : theme.colors.brand.lines
          }
          onValueChange={(val) => {
            setSuggest(val);
            storeData("swipe-index", 0);
            setIndex(0);

            triggerDistanceFilter(val);
            setIsRetrigger(true);
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
  currentUser,
  storeData,
  setIndex,
}) {
  const displayValue = `${
    fromAgeValue ?? currentUser?.agePreference?.fromAgeValue
  } - ${toAgeValue ?? currentUser?.agePreference?.toAgeValue}`;

  return (
    <View
      style={{
        borderBottomColor: theme.colors.brand.linesLighter,
        borderBottomWidth: 0.3,
        paddingVertical: theme.spaceNumber[5],
        marginBottom: theme.spaceNumber[0],
        paddingHorizontal: theme.spaceNumber[4],
      }}>
      <RangeCompoentSection>
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratBold"
            fontSize="button">
            {text}
          </Text>
        </View>
        <View>
          <Text
            variant="loading"
            colorType="base1"
            fontType="montserratLight"
            fontSize="button">
            {displayValue}
          </Text>
        </View>
      </RangeCompoentSection>
      <View
        style={{
          paddingRight: theme.spaceNumberBy10[4] + theme.spaceNumber[1],
        }}>
        <RangeCompoentSection>
          <RangeSlider
            min={18}
            max={70}
            step={1}
            styleSize="small"
            barHeight={4}
            fromKnobColor={theme.colors.brand.base1}
            toKnobColor={theme.colors.brand.base1}
            inRangeBarColor={theme.colors.brand.base6}
            outOfRangeBarColor={theme.colors.brand.black}
            showRangeLabels={false}
            showValueLabels={false}
            fromValueOnChange={(value) => {
              setSuggest(false);
              setFromAgeValue(value);
            }}
            toValueOnChange={(value) => {
              setSuggest(false);
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
      </View>
      <RangeCompoentSection>
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratLight"
            fontSize="caption">
            {description}
          </Text>
        </View>
        <Switch
          trackColor={{
            false: theme.colors.brand.linesLight,
            true: theme.colors.brand.linesLighter,
          }}
          thumbColor={
            suggest ? theme.colors.brand.base1 : theme.colors.brand.lines
          }
          onValueChange={(val) => {
            setSuggest(val);
            setIndex(0);
            storeData("swipe-index", 0);
            triggerAgeFilter(val);
            setIsRetrigger(true);
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
    <HorizontalPaddingSpace
      style={{
        borderBottomColor: theme.colors.brand.linesLight,
        borderBottomWidth: 0.3,
        paddingBottom: 25,
        marginBottom: theme.spaceNumberBy10[0],
        paddingHorizontal: theme.spaceNumberBy10[2],
      }}
      space={theme.space[2]}>
      <Spacer position="top" size="xsmall">
        <View>
          <Text
            variant="custom"
            colorType="base1"
            fontType="montserratBold"
            fontSize="button">
            Gym partner interested
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
              colorType="base1"
              fontType="montserratLight"
              fontSize="button">
              {interest.value}
            </Text>
          </View>
          <CheckBox
            checked={selectedInterest === interest.key || clickedIndex === idx}
            onPress={() => handleInterestToggle(idx, interest.key)}
            checkedColor={theme.colors.brand.base6}
            uncheckedColor={theme.colors.brand.base6}
            size={25}
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

function SubscriberPreferencesComponent({
  theme,
  currentUser,
  setOpenUpdateModal,
}) {
  const subscriberPreference = [
    { title: "height", value: currentUser?.interestedheight },
    {
      title: "religious beliefs",
      value: currentUser?.interestedreligiousbeliefs,
    },
  ];
  return (
    <Fragment>
      {subscriberPreference?.map((preference, idx) => (
        <HorizontalPaddingSpace space={theme.space[2]} key={idx}>
          <Pressable
            onPress={() =>
              setOpenUpdateModal({
                type: preference?.title,
                isOpen: true,
              })
            }
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: theme.colors.brand.linesLighter,
              paddingVertical: theme.spaceNumberBy10[0],
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            }}>
            <View>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratBold"
                fontSize="button"
                transform="capitalize">
                {preference?.title}
              </Text>
              <Text
                variant="custom"
                colorType="base7"
                fontType="montserratRegular"
                fontSize="caption"
                transform="capitalize">
                {preference?.value}
              </Text>
            </View>
            <View
              style={{
                marginRight: theme.spaceNumber[2],
              }}>
              <IconComponent
                iconFunction={() => {}}
                iconName="keyboard-arrow-right"
                IconComponent={MaterialIcons}
                size={20}
                color={theme.colors.brand.base6}
              />
            </View>
          </Pressable>
        </HorizontalPaddingSpace>
      ))}
    </Fragment>
  );
}

export default function FilterComponent({
  currentUser,
  isVisible,
  onClose,
  setIsRetrigger,
  theme,
  storeData,
  setIndex,
}) {
  const { width, height } = Dimensions.get("window");
  const [distanceValue, setDistanceValue] = useState(0);
  const [fromAgeValue, setFromAgeValue] = useState(18);
  const [toAgeValue, setToAgeValue] = useState(30);
  const [suggestAgeWithRange, setSuggestAgeWithRange] = useState(
    currentUser?.agePreference?.suggest
  );
  const [suggestDistanceWithRange, setSuggestDistanceWithRange] = useState(
    currentUser?.distancePreference?.suggest
  );
  const [openUpdateModal, setOpenUpdateModal] = useState({
    type: "",
    isOpen: false,
  });

  async function triggerAgeFilter(booleanOption) {
    setSuggestAgeWithRange(booleanOption);

    const value = {
      fromAgeValue: fromAgeValue,
      toAgeValue: toAgeValue,
      suggest: booleanOption ?? suggestAgeWithRange,
    };

    // age
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "agePreference",
      value,
      setIsRetrigger
    );
  }

  async function triggerDistanceFilter(booleanOption) {
    const value = {
      value: distanceValue,
      suggest:
        distanceValue === 0 ? false : booleanOption ?? suggestDistanceWithRange,
    };
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "distancePreference",
      value,
      setIsRetrigger
    );
  }

  function sortRender() {
    switch (openUpdateModal.type) {
      case "religious beliefs":
        return (
          <ReligionUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setIsRetrigger(true);
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
            interestedreligiousbeliefs="interestedreligiousbeliefs"
          />
        );
      case "height":
        return (
          <HeightUpdateModal
            theme={theme}
            height={height}
            currentUser={currentUser}
            onClose={() => {
              setIsRetrigger(true);
              setOpenUpdateModal({
                type: "",
                isOpen: false,
              });
            }}
            interestedheight="interestedheight"
          />
        );
      default:
        break;
    }
  }

  return (
    <AnimatedModal
      isAlignItems={true}
      paddingBottom={theme.spaceNumberBy10[5]}
      isPaddingTop={false}
      isVisible={isVisible}
      onClose={() => {
        onClose();
      }}
      theme={theme}
      width={width}>
      <View
        style={{
          marginTop: theme.spaceNumberBy50[0],
          backgroundColor: theme.colors.brand.base,
        }}>
        <HeaderComponent
          title="Preference Settings"
          textWidth="90%"
          theme={theme}
          LeftComp={() => (
            <IconComponent
              iconFunction={() => {
                onClose();
              }}
              iconName="keyboard-arrow-left"
              IconComponent={MaterialIcons}
              size={35}
              color={theme.colors.brand.base1}
            />
          )}
          RightComp={() => {}}
          isBorder={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 0, width: "100%" }}>
          <View>
            <View
              style={{
                backgroundColor: theme.colors.brand.black,
                paddingVertical: theme.spaceNumber[3],
                marginBottom: theme.spaceNumber[5],
              }}>
              <HorizontalPaddingSpace space={theme.space[2]}>
                <View>
                  <Text
                    variant="custom"
                    colorType="lines"
                    fontType="montserratSemibold"
                    fontSize="button">
                    Member Preferences
                  </Text>
                </View>
              </HorizontalPaddingSpace>
            </View>
            <RangeCompoent
              theme={theme}
              text="Maximum Distance"
              description="Only suggest people within this range"
              type="distance"
              selectedValue={
                distanceValue
                  ? distanceValue
                  : currentUser?.distancePreference?.value
              }
              setSelectedValue={setDistanceValue}
              initialValue={0}
              suggest={suggestDistanceWithRange}
              setSuggest={setSuggestDistanceWithRange}
              triggerDistanceFilter={triggerDistanceFilter}
              setIsRetrigger={setIsRetrigger}
              storeData={storeData}
              setIndex={setIndex}
            />
            <DoubleRangeCompoent
              theme={theme}
              text="Age Range"
              description="Only suggest people within this age"
              setFromAgeValue={setFromAgeValue}
              setToAgeValue={setToAgeValue}
              fromAgeValue={fromAgeValue}
              toAgeValue={toAgeValue}
              suggest={suggestAgeWithRange}
              setSuggest={setSuggestAgeWithRange}
              triggerAgeFilter={triggerAgeFilter}
              setIsRetrigger={setIsRetrigger}
              currentUser={currentUser}
              storeData={storeData}
              setIndex={setIndex}
            />
            <Spacer position="top" size="small">
              <InterestFilterComponent
                theme={theme}
                currentUser={currentUser}
                setIsRetrigger={setIsRetrigger}
              />
            </Spacer>
            <Spacer position="top" size="xxxlarge">
              <Spacer
                position="top"
                size="xsmall"
                style={{
                  backgroundColor: theme.colors.brand.black,
                  paddingVertical: theme.spaceNumber[3],
                  marginBottom: theme.spaceNumber[5],
                }}>
                <HorizontalPaddingSpace space={theme.space[2]}>
                  <View>
                    <Text
                      variant="custom"
                      colorType="lines"
                      fontType="montserratSemibold"
                      fontSize="button">
                      Subscriber Preferences
                    </Text>
                  </View>
                </HorizontalPaddingSpace>
              </Spacer>
              <SubscriberPreferencesComponent
                theme={theme}
                currentUser={currentUser}
                setOpenUpdateModal={setOpenUpdateModal}
              />
            </Spacer>
          </View>
        </ScrollView>
        <AnimatedModal
          isVisible={openUpdateModal.isOpen}
          onClose={() => {
            setOpenUpdateModal({ type: "", isOpen: false });
          }}
          theme={theme}
          width={width}>
          <UpdateModal height={height} theme={theme}>
            {sortRender()}
          </UpdateModal>
        </AnimatedModal>
      </View>
    </AnimatedModal>
  );
}
