import { Text } from "react-native";
import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { useAppContext } from "../../../context/ThemeContext";

export default function BioPage() {
  const {
    state: { theme },
  } = useAppContext();

  return (
    <SafeArea>
      <SpaceArea space={theme.space[5]}>
        <Text>BioPage</Text>
      </SpaceArea>
    </SafeArea>
  );
}
