import React from "react";
import { IconComponentWraper } from "../../features/Main/screen/main.style";

export default function IconComponent({
  horizontalRightSpace,
  horizontalLeftSpace,
  IconComponent,
  iconFunction,
  iconName,
  size,
  color,
  centralize,
}) {
  return (
    <IconComponentWraper
      horizontalRightSpace={horizontalRightSpace}
      horizontalLeftSpace={horizontalLeftSpace}
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
