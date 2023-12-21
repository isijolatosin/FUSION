import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const IconComponentWrapeer = styled(TouchableOpacity)`
  margin: 0 ${(props) => props.horizontalSpace};
  ${(props) => props.centralize && `align-items: center`}
`;

export default function IconComponent({
  horizontalSpace,
  IconComponent,
  iconFunction,
  iconName,
  size,
  color,
  centralize,
}) {
  return (
    <IconComponentWrapeer
      horizontalSpace={horizontalSpace}
      centralize={centralize}>
      <IconComponent
        name={iconName}
        size={size}
        color={color}
        onPress={iconFunction}
      />
    </IconComponentWrapeer>
  );
}
