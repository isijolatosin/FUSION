export const openLocationSettings = (Linking, Platform, navigation) => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:")
      .then((data) => {
        navigation.navigate("you-are-special");
        console.log("Settings opened:", data);
      })
      .catch(() => {
        console.error("Error opening settings");
      });
  } else {
    // For Android, open the app details settings
    Linking.openSettings()
      .then((data) => {
        navigation.navigate("you-are-special");
        console.log("Settings opened:", data);
      })
      .catch(() => {
        console.error("Error opening settings");
      });
  }
};
