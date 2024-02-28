import { Dimensions, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { SafeArea } from "../../components/utility/safe-area.component";
import { useAppContext } from "../../context/ThemeContext";
import { HorizontalPaddingSpace } from "../../components/utility/space-area.component";
import { getAllData } from "../../utilities/updateFirestoreDatabaseField";
import SupportComponent from "./components/SupportComponent";
import { Text } from "../../components/typography/text.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { NavigationBar } from "../Onboarding/components/onboarding.styles";
import IconComponent from "../../components/icon-components/IconComponent";

export default function Index({ navigation }) {
  const { width, height } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();
  const [supportList, setSupportList] = useState([]);
  const [isRetrigger, setIsRetrigger] = useState(false);
  const [showGeneralMessage, setShowGeneralMessage] = useState({
    type: "",
    isOpen: false,
  });

  async function getSupportList() {
    const generalList = await getAllData("general-support");
    setSupportList(generalList);
  }
  useFocusEffect(
    React.useCallback(() => {
      getSupportList();
      return () => {
        // Cleanup function if needed
      };
    }, [])
  );

  useEffect(() => {
    getSupportList();
    const resetFilterTrigger = setTimeout(() => {
      setIsRetrigger(false);
    }, 2000);

    return () => clearTimeout(resetFilterTrigger);
  }, [isRetrigger]);

  return (
    <SafeArea style={{ backgroundColor: theme.colors.brand.basewhite }}>
      <HorizontalPaddingSpace space={theme.space[4]} style={{ width: width }}>
        <Spacer position="top" size="medium">
          <NavigationBar>
            <IconComponent
              iconFunction={() => navigation.goBack()}
              iconName="chevron-back"
              IconComponent={Ionicons}
              size={30}
              color={theme.colors.brand.base}
            />
          </NavigationBar>
        </Spacer>
        <Spacer position="top" size="">
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="black"
            fontType="arimaMadurai"
            fontSize="h4"
            width="100%">
            General Support
          </Text>
        </Spacer>
      </HorizontalPaddingSpace>
      {supportList?.length ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: theme.spaceNumberBy10[5],
            marginTop: theme.spaceNumberBy10[3],
          }}>
          {supportList?.map((support, idx) => (
            <View
              key={idx}
              style={{
                position: "relative",
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.brand.linesLighter,
                paddingVertical: theme.spaceNumberBy10[0],
                height: theme.spaceNumberBy10[6],
              }}>
              <SupportComponent
                data={support}
                theme={theme}
                width={width}
                height={height}
                setShowGeneralMessage={setShowGeneralMessage}
                showGeneralMessage={showGeneralMessage}
                setIsRetrigger={setIsRetrigger}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </SafeArea>
  );
}
