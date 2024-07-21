import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import GymCard from "./GymCard";
import { gymTypesByCountry } from "../../constants";
import { useAppContext } from "../../context/ThemeContext";
import { Text } from "../typography/text.component";
import { Spacer } from "../spacer/spacer.component";
import { HorizontalPaddingSpace } from "../utility/space-area.component";
import Placeholder from "./Placeholder";
import IconComponent from "../icon-components/IconComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputComponent from "../Input-Forms/InputComponent";
import { updateUserValueField } from "../../utilities/updateFirestoreDatabaseField";
import { getGymTypeByCountryData } from "../../utilities/getGymTypeByCountryData";

const GymtypesComponent = ({
  handleSelectedGym,
  handleClearGympreference,
  gymSelectedTypes,
  currentUser,
  setIsRetrigger,
}) => {
  const {
    state: { theme },
  } = useAppContext();
  const [address, setAddress] = useState(
    currentUser?.gymMembership?.address ?? ""
  );
  const [showChangeAddressinput, setShowChangeAddressinput] = useState(false);

  async function updateGymAddress() {
    const value = {
      address: address,
      name: currentUser?.gymMembership?.name,
    };
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "gymMembership",
      value,
      setIsRetrigger
    );
  }

  return (
    <>
      <Spacer
        position="bottom"
        size="xsmall"
        style={{
          backgroundColor: theme.colors.brand.black2,
          paddingTop: theme.spaceNumber[3],
          paddingBottom: theme.spaceNumber[8],
        }}>
        <View>
          <HorizontalPaddingSpace
            style={{ position: "relative" }}
            space={theme.space[2]}>
            <View
              style={{
                backgroundColor: theme.colors.brand.baseTint,
                padding: theme.spaceNumber[3],
                borderRadius: theme.spaceNumber[2],
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginTop: theme.spaceNumber[1],
                }}>
                <View style={{ width: "80%" }}>
                  <View>
                    <Text
                      variant="custom"
                      colorType="base6"
                      fontType="montserratBold"
                      fontSize="caption">
                      Fitness Club Address:{" "}
                    </Text>
                  </View>
                  <View>
                    <Text
                      variant="custom"
                      colorType="base6"
                      fontType="montserratRegular"
                      fontSize="caption">
                      {currentUser?.gymMembership?.address}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={{
                    width: "20%",
                  }}
                  onPress={() =>
                    setShowChangeAddressinput(!showChangeAddressinput)
                  }>
                  <Text
                    style={{ textAlign: "right" }}
                    variant="custom"
                    colorType="teal"
                    fontType="montserratRegular"
                    fontSize="caption">
                    Change
                  </Text>
                </Pressable>
              </View>
              {showChangeAddressinput ? (
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{
                    marginVertical: theme.spaceNumber[10],
                    position: "relative",
                  }}>
                  <InputComponent
                    includeIcon={false}
                    keyboardType="default"
                    setValue={setAddress}
                    value={address}
                    width="100%"
                    isCountryCode={false}
                    placeholder="Change fitness club address..."
                    fontSize={theme.fontSizes.caption}
                    placeholderFontSize={theme.fontSizes.caption}
                    fontType={theme.fonts.montserratLight}
                    fontColor={theme.colors.brand.base1}
                    backgroundColor="transparent"
                    isBackgroundColor={false}
                  />
                  <Pressable
                    style={{ position: "absolute", right: 0, top: "30%" }}>
                    <IconComponent
                      iconFunction={() => updateGymAddress()}
                      iconName="send-circle-outline"
                      IconComponent={MaterialCommunityIcons}
                      size={20}
                      color={theme.colors.brand.base7}
                    />
                  </Pressable>
                </KeyboardAvoidingView>
              ) : (
                <></>
              )}
            </View>
            <View
              style={{
                marginTop: theme.spaceNumber[3],
                borderTopWidth: 0.5,
                borderTopColor: theme.colors.brand.base,
                backgroundColor: theme.colors.brand.baseTint,
                padding: theme.spaceNumber[3],
                borderRadius: theme.spaceNumber[2],
              }}>
              <View>
                <Text
                  variant="custom"
                  colorType="base6"
                  fontType="montserratBold"
                  fontSize="caption">
                  Fitness Club preferences:{" "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: theme.spaceNumber[3],
                  marginTop: theme.spaceNumber[0],
                }}>
                {gymSelectedTypes?.length > 0 ? (
                  gymSelectedTypes?.map((type, index) => (
                    <View
                      key={index}
                      style={{
                        borderWidth: 0.5,
                        borderColor: theme.colors.brand.base8,
                        borderRadius: theme.spaceNumberBy10[1],
                        paddingVertical: theme.spaceNumber[0],
                        paddingHorizontal: theme.spaceNumber[3],
                      }}>
                      <Text
                        variant="custom"
                        colorType="base6"
                        fontType="montserratRegular"
                        fontSize="caption">
                        {type}
                      </Text>
                    </View>
                  ))
                ) : (
                  <View>
                    <Text
                      variant="custom"
                      colorType="base1"
                      fontType="montserratRegular"
                      fontSize="xcaption">
                      Select from the fitness club preference list below
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </HorizontalPaddingSpace>
        </View>
      </Spacer>
      <HorizontalPaddingSpace
        style={{
          position: "relative",
        }}
        space={theme.space[2]}>
        <View
          style={{
            backgroundColor: theme.colors.brand.black1,
            paddingHorizontal: theme.spaceNumber[3],
            borderRadius: theme.spaceNumber[2],
          }}>
          <View
            style={{
              paddingTop: theme.spaceNumber[3],
              borderBottomWidth: 0.3,
              borderBottomColor: theme.colors.brand.base8,
              paddingBottom: theme.spaceNumber[2],
              marginBottom: theme.spaceNumber[5],
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View>
              <Text
                variant="custom"
                colorType="base6"
                fontType="montserratBold"
                fontSize="caption">
                Select Fitness Club Preference
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleClearGympreference()}>
              <Text
                variant="custom"
                colorType="teal"
                fontType="montserratRegular"
                fontSize="caption">
                Clear
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: theme.spaceNumber[1],
              flexWrap: "wrap",
            }}>
            {[...getGymTypeByCountryData(currentUser?.country)]?.map(
              (gym, idx) => (
                <GymCard
                  key={idx}
                  gym={gym}
                  theme={theme}
                  gymSelectedTypes={gymSelectedTypes}
                  handleSelectedGym={handleSelectedGym}
                />
              )
            )}
          </View>
        </View>
      </HorizontalPaddingSpace>
    </>
  );
};

export default GymtypesComponent;
