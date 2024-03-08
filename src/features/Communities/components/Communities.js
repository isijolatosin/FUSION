import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import IconComponent from "../../../components/icon-components/IconComponent";
import Avatar from "../../../components/general-component/Avatar";
import { Spacer } from "../../../components/spacer/spacer.component";

const Communities = ({
  requests,
  theme,
  currentUser,
  scrollViewCommunityRef,
}) => {
  return (
    <View>
      <View
        ref={scrollViewCommunityRef}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spaceNumberBy10[1],
          borderBottomWidth: 0.5,
          borderColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[3],
        }}>
        <TouchableOpacity
          style={{
            borderColor: theme.colors.brand.linesLighter,
            borderRightWidth: 1.5,
            alignItems: "center",
            justifyContent: "center",
            width: theme.spaceNumberBy10[6],
            height: theme.spaceNumberBy10[3],
          }}>
          <IconComponent
            iconFunction={() => {}}
            iconName="plus"
            IconComponent={AntDesign}
            size={theme.spaceNumberBy10[2]}
            color={theme.colors.brand.lines}
          />
        </TouchableOpacity>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ marginRight: theme.spaceNumber[5] }}>
          {requests.map((_dt, idx) => (
            <View key={idx} style={{ marginRight: theme.spaceNumber[5] }}>
              <Avatar
                ringBorder={false}
                dimensionIndex={3}
                data={currentUser?.mediaArray[0]}
                theme={theme}
                func={() => {}}
                isSmallIcon={true}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <Spacer position="top" size="large">
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </Spacer>
    </View>
  );
};

export default Communities;
