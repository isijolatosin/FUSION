import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import Button from "../../../components/utility/button.component";
import DropdownSelection from "../../Onboarding/components/sub-component/DropdownSelection";
import { sexualOrientationList } from "../../../constants";

export default function SexualOrientationUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
}) {
  const [sexualOrientation, setSexualOrientation] = useState(
    currentUser?.sexualOrientation
  );
  const [isOpen, setOpen] = useState(false);

  async function updateSexualOrientation() {
    await updateUserValueField(
      "all-users",
      currentUser?.id,
      "sexualOrientation",
      sexualOrientation ?? "",
      () => {}
    );
  }

  return (
    <View style={{ height: height }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.brand.linesLighter,
          paddingBottom: theme.spaceNumber[5],
        }}>
        <IconComponent
          iconFunction={() => {
            updateSexualOrientation();
            onClose();
          }}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.base1}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="base1"
          fontType="montserratBold"
          fontSize="title">
          Sexual Orientation
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <DropdownSelection
            data={sexualOrientationList}
            isOpen={isOpen}
            setOpen={setOpen}
            value={sexualOrientation}
            setFunction={setSexualOrientation}
            theme={theme}
            isForHeightComponent={false}
          />
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
