import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import Avatar from "../../../components/general-component/Avatar";
import { Text } from "../../../components/typography/text.component";
import { getDate, getTime } from "../../../utilities/formatTimestamp";
import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { shortenText } from "../../../utilities/detectTextType";
import AnimatedModal from "../../../components/general-component/AnimatedModal";
import UpdateModal from "../../Profile/components/UpdateModal";
import GeneralSupportModal from "./GeneralSupportModal";

export default function SupportComponent({
  data,
  theme,
  width,
  height,
  setIsRetrigger,
}) {
  const [showGeneralMessage, setShowGeneralMessage] = useState({
    type: "",
    isOpen: false,
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          setShowGeneralMessage({ type: data?.topic, isOpen: true })
        }>
        <HorizontalPaddingSpace
          space={theme.space[4]}
          style={{
            flexDirection: "row",
            width: width,
            paddingBottom: theme.spaceNumberBy10[0],
          }}>
          <Avatar
            dimensionIndex={theme.spaceNumber[1]}
            data={data?.photo}
            theme={theme}
          />
          <View
            style={{
              marginLeft: theme.spaceNumber[5],
              width: "100%",
              position: "relative",
            }}>
            <Text
              variant="custom"
              colorType="base"
              fontType="montserratSemibold"
              fontSize="body"
              width="100%">
              {data?.firstname}
            </Text>
            <View style={{ width: "85%" }}>
              <Text
                variant="custom"
                colorType="black"
                fontType="montserratLight"
                fontSize="caption"
                width="100%">
                {shortenText(data?.message, 80)}
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: theme.spaceNumberBy10[5],
              }}>
              <Text
                variant="custom"
                colorType="lines"
                fontType="montserratLight"
                fontSize="xcaption"
                width="100%">
                {getDate(data?.timestamp)} - {getTime(data?.timestamp)}
              </Text>
            </View>
          </View>
        </HorizontalPaddingSpace>
        {data?.responded && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 10,
              height: theme.spaceNumberBy10[6],
              backgroundColor: theme.colors.brand.basewhitelighter,
            }}
          />
        )}
      </TouchableOpacity>

      <AnimatedModal
        isVisible={showGeneralMessage?.isOpen}
        onClose={() =>
          setShowGeneralMessage({
            type: "",
            isOpen: false,
          })
        }
        theme={theme}
        width={width}>
        <UpdateModal height={height} theme={theme}>
          <GeneralSupportModal
            theme={theme}
            height={height}
            data={data}
            onClose={() => {
              {
                setShowGeneralMessage({
                  type: "",
                  isOpen: false,
                });
              }
            }}
            setIsRetrigger={setIsRetrigger}
          />
        </UpdateModal>
      </AnimatedModal>
    </View>
  );
}
