import React, { useState, useEffect, Fragment } from "react";
import { Dimensions, ScrollView, TouchableOpacity, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import IconComponent from "../../../components/icon-components/IconComponent";
import { Spacer } from "../../../components/spacer/spacer.component";
import { getAllData } from "../../../utilities/updateFirestoreDatabaseField";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Image } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { sortByTimestamp } from "../../../utilities/sortByKey";
import truncateSentence from "../../../utilities/truncateSentence";
import { noeventmessage } from "../../../constants";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import EventForm from "./EventForm";
import { getNumberofWords } from "../../../utilities/getNumberofWords";

const Events = ({ theme, currentUser, scrollViewCommunityRef }) => {
  const { width } = Dimensions.get("window");
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readMore, setReadMore] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);

  const asyncGetEvents = React.useCallback(async () => {
    setIsLoading(true);

    const dbEventData = await getAllData("events");
    if (dbEventData.length > 0) setEventData(dbEventData);

    const loadingID = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingID);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      asyncGetEvents();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    asyncGetEvents();
    const eventSubscriptionId = setTimeout(() => {
      setReload(false);
    }, 1000);

    return () => clearTimeout(eventSubscriptionId);
  }, [reload]);

  if (isLoading) {
    return (
      <Spacer position="top" size="xxxxlarge">
        <Text
          style={{ textAlign: "center" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="caption">
          Loading Events...
        </Text>
      </Spacer>
    );
  }

  if (eventData?.length === 0 && !isLoading) {
    return (
      <HorizontalPaddingSpace space={theme.space[7]}>
        <Spacer
          position="top"
          size="xxxxlarge"
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="lines"
            fontType="montserratSemibold"
            fontSize="button">
            {noeventmessage}
          </Text>
        </Spacer>
      </HorizontalPaddingSpace>
    );
  }

  return (
    <View>
      <View
        ref={scrollViewCommunityRef}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spaceNumberBy10[1],
          borderBottomWidth: 0.5,
          borderColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[3],
        }}>
        <TouchableOpacity
          onPress={() => setShowEventForm(true)}
          style={{
            borderColor: theme.colors.brand.linesLighter,
            borderRightWidth: 1.5,
            alignItems: "center",
            justifyContent: "center",
            width: theme.spaceNumberBy10[6],
            height: theme.spaceNumberBy10[3],
          }}>
          <IconComponent
            iconFunction={() => setShowEventForm(true)}
            iconName="plus"
            IconComponent={AntDesign}
            size={theme.spaceNumberBy10[2]}
            color={theme.colors.brand.lines}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: theme.spaceNumberBy10[13] }}>
        {sortByTimestamp(eventData).map((_event, idx) => (
          <View
            key={_event?.id}
            style={{
              shadowColor: theme.colors.brand.brandFade,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              marginBottom: theme.spaceNumberBy10[2],
              backgroundColor: theme.colors.brand.basewhite,
            }}>
            {_event?.image ? (
              <Image
                source={{
                  uri: `${_event?.image}`,
                }}
                style={{
                  width: "100%",
                  height: theme.spaceNumberBy50[2],
                }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: theme.spaceNumberBy50[2],
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: theme.colors.brand.highlight,
                  opacity: 0.3,
                }}>
                <IconComponent
                  iconFunction={() => {}}
                  iconName="camera"
                  IconComponent={Entypo}
                  size={theme.spaceNumberBy10[4]}
                  color={theme.colors.brand.brandFadeLighter}
                />
              </View>
            )}
            <HorizontalPaddingSpace space={theme.space[5]} style={{}}>
              <Spacer position="bottom" size="xlarge">
                {_event?.title && (
                  <Spacer position="top" size="small">
                    <Text
                      variant="custom"
                      colorType="black"
                      fontType="montserratBold"
                      fontSize="title"
                      transform="capitalize">
                      {_event?.title}
                    </Text>
                  </Spacer>
                )}
                {_event?.time && (
                  <Spacer position="top" size="small">
                    <Text
                      variant="custom"
                      colorType="black"
                      fontType="montserratRegular"
                      fontSize="button">
                      <Text
                        variant="custom"
                        colorType="base"
                        fontType="montserratBold"
                        fontSize="button">
                        Time{" - "}
                      </Text>
                      {_event?.time}
                    </Text>
                  </Spacer>
                )}
                {_event?.date && (
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratBold"
                      fontSize="button">
                      Date{" - "}
                    </Text>
                    {_event?.date}
                  </Text>
                )}
                {_event?.location && (
                  <Text
                    variant="custom"
                    colorType="black"
                    fontType="montserratRegular"
                    fontSize="button">
                    <Text
                      variant="custom"
                      colorType="base"
                      fontType="montserratBold"
                      fontSize="button">
                      Location{" - "}
                    </Text>
                    {_event?.location}
                  </Text>
                )}
                {_event?.description && (
                  <Fragment>
                    {readMore !== idx && (
                      <Spacer position="top" size="small">
                        <Text
                          variant="custom"
                          colorType="black"
                          fontType="montserratRegular"
                          fontSize="caption">
                          <Text
                            variant="custom"
                            colorType="base"
                            fontType="montserratBold"
                            fontSize="caption">
                            Description{" - "}
                          </Text>
                          {truncateSentence(_event?.description, 25)}{" "}
                        </Text>
                      </Spacer>
                    )}
                    {readMore === idx && (
                      <Spacer position="top" size="small">
                        <Text
                          variant="custom"
                          colorType="black"
                          fontType="montserratRegular"
                          fontSize="caption">
                          <Text
                            variant="custom"
                            colorType="base"
                            fontType="montserratBold"
                            fontSize="caption">
                            Description{" - "}
                          </Text>
                          {_event?.description}
                        </Text>
                      </Spacer>
                    )}
                    {getNumberofWords(_event?.description) >= 25 && (
                      <TouchableOpacity
                        onPress={() => {
                          if (readMore === idx) {
                            setReadMore(null);
                          } else {
                            setReadMore(idx);
                          }
                        }}
                        style={{ marginTop: theme.spaceNumber[2] }}>
                        <Text
                          variant="custom"
                          colorType="base"
                          fontType="montserratSemibold"
                          fontSize="caption">
                          {readMore === idx ? "Read Less" : "Read More"}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </Fragment>
                )}
              </Spacer>
            </HorizontalPaddingSpace>
          </View>
        ))}
      </ScrollView>
      <AnimatedModal
        isVisible={showEventForm}
        onClose={() => setShowEventForm(false)}
        theme={theme}
        width={width}
        paddingBottom={theme.spaceNumberBy50[2]}
        isTransparent={true}>
        <EventForm
          currentUser={currentUser}
          setReload={setReload}
          theme={theme}
          setShowEventForm={setShowEventForm}
        />
      </AnimatedModal>
    </View>
  );
};

export default Events;
