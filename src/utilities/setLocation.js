export const openLocationSettings = (Linking, Platform, navigation) => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:")
      .then((_data) => {
        navigation.navigate("you-are-special-screen");
      })
      .catch(() => {
        console.error("Error opening settings");
      });
  } else {
    // For Android, open the app details settings
    Linking.openSettings()
      .then((_data) => {
        navigation.navigate("you-are-special-screen");
      })
      .catch(() => {
        console.error("Error opening settings");
      });
  }
};
