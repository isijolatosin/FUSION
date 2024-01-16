import { Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

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
  const { width } = Dimensions.get("window");
  const {
    state: { theme },
  } = useAppContext();
  const [supportList, setSupportList] = useState([]);

  useEffect(() => {
    async function supportList() {
      const generalList = await getAllData("general-support");
      setSupportList(generalList);
    }

    supportList();
  }, []);

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
            variant="subHeading"
            colorType="black"
            fontType="playfairbold"
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
            <SupportComponent key={idx} data={support} theme={theme} />
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </SafeArea>
  );
}
