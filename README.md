<!-- TODO BEFORE DEPLOYMENT -->

- change the version number before deployment
- change icon logo inside of app.json file - line 7
- change splash logo inside of app.json file - line 10
- Ensure to fill the Privacy representative in Firebase and recreate a new DB - https://console.firebase.google.com/u/3/project/your-fusion/settings/privacy

- Librarys to consider

1. react-native-onboarding-swiper

-APP VERSION MANAGEMENT: Setting versionCode(android) or buildNumber(iOS), you can automate inside of eas.json by setting the appVersionSource to remote in "cli" and remove the versionCode(android) and buildNumber(ios) from app.json since it will no longer be needed. And if you prefer manual update, set the appVersionSource in eas.json to local and add the versionCode(android) and buildNumber(iOS) to app.json. After, run eas build --profile production --platform ios( or android)

To change your version code any time, run eas build:version:set and follow through

## OVER THE AIR UPDATE

- expo publish: To update live app with cosmetic changes, new functionalities, bug fixes.

## REBUILD THE BINARIES

For major changes like new package installation, change of app name, changes in ios / android folder, splash screen, icon, owner, scheme. More in expo documentation. Also update the version, buildNumber(ios)/versionCode(android) before running the below command.

- eas build --platform ios/android
  after
- eas submit --platform ios/android

## COMMANDS

- npx expo-doctor: To run diagnosis on app
- eas update: To create update to expo dashboard
- eas update:configure: To configure eas.json file in app
- eas build: To create build to expo dashboard
- eas submit -p ios/android --latest: To submit latest app build to app store and play store
