import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

const IconComponentWraper = styled(Pressable)`
  margin: 0 ${(props) => props.horizontalSpace};
  ${(props) => props.centralize && `align-items: center`};
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
    <IconComponentWraper
      horizontalSpace={horizontalSpace}
      centralize={centralize}>
      <IconComponent
        name={iconName}
        size={size}
        color={color}
        onPress={iconFunction}
      />
    </IconComponentWraper>
  );
}
