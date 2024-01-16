import { ActivityIndicator } from "react-native";
import React from "react";

export default function Spinner({ size, color }) {
  return <ActivityIndicator size={size} color={color} />;
}
