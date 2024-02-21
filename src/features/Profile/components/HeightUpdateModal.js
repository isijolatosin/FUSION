import { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { HorizontalPaddingSpace } from "../../../components/utility/space-area.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { updateUserValueField } from "../../../utilities/updateFirestoreDatabaseField";
import IconComponent from "../../../components/icon-components/IconComponent";
import DropdownSelection from "../../Onboarding/components/sub-component/DropdownSelection";
import { heightList } from "../../../constants";

export default function HeightUpdateModal({
  theme,
  height,
  currentUser,
  onClose,
  interestedheight,
}) {
  const [_height, setHeight] = useState(
    interestedheight ? currentUser?.interestedheight : currentUser?.height
  );
  const [isOpen, setOpen] = useState(false);

  async function updateHeight(value) {
    if (!value) return;
    setHeight(value);

    if (interestedheight) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "interestedheight",
        value ?? _height,
        () => {}
      );
    } else
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "height",
        value ?? _height,
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
          iconFunction={onClose}
          iconName="keyboard-arrow-left"
          IconComponent={MaterialIcons}
          size={theme.spaceNumberBy10[2]}
          color={theme.colors.brand.brandFade}
          horizontalLeftSpace={`-${theme.spaceNumberBy10[0]}px`}
        />
        <Text
          style={{ textAlign: "center", width: "90%" }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          Height
        </Text>
      </View>
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <DropdownSelection
            data={heightList}
            isOpen={isOpen}
            setOpen={setOpen}
            value={_height}
            setFunction={updateHeight}
            theme={theme}
            isForHeightComponent={true}
          />
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
