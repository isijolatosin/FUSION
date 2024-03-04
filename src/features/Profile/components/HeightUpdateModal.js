import { useState } from "react";
import { Pressable, View } from "react-native";
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

  async function updateHeight() {
    if (interestedheight) {
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "interestedheight",
        _height,
        () => {}
      );
    } else
      await updateUserValueField(
        "all-users",
        currentUser?.id,
        "height",
        _height,
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
            updateHeight();
            onClose();
          }}
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
          {interestedheight ? "Height Preference" : "Height"}
        </Text>
      </View>
      {interestedheight && currentUser?.interestedheight && (
        <Pressable
          onPress={async () => {
            await updateUserValueField(
              "all-users",
              currentUser?.id,
              "interestedheight",
              "",
              () => {}
            );
            setHeight("");
          }}>
          <Text
            style={{ textAlign: "center", marginTop: theme.spaceNumber[0] }}
            variant="custom"
            colorType="base"
            fontType="montserratRegular"
            fontSize="button">
            Clear
          </Text>
        </Pressable>
      )}
      <HorizontalPaddingSpace space={theme.space[3]}>
        <Spacer position="top" size="xxxlarge">
          <DropdownSelection
            data={heightList}
            isOpen={isOpen}
            setOpen={setOpen}
            value={_height ?? "Choose an option"}
            setFunction={setHeight}
            theme={theme}
            isForHeightComponent={true}
          />
        </Spacer>
      </HorizontalPaddingSpace>
    </View>
  );
}
