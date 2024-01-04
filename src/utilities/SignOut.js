import "firebase/auth";

const handleSignOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error.message);
    Alert.alert("Error", "Failed to sign out. Please try again.");
  }
};

export { handleSignOut };
