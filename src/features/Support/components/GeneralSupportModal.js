import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import IconComponent from "../../../components/icon-components/IconComponent";
import { database } from "../../../../config";
import { getDate, getTime } from "../../../utilities/formatTimestamp";

export default function GeneralSupportModal({
  theme,
  height,
  data,
  onClose,
  setIsRetrigger,
}) {
  async function handleResponse() {
    try {
      const isAvailable = await MailComposer.isAvailableAsync();

      if (isAvailable) {
        await MailComposer.composeAsync({
          recipients: [`${data?.email}`],
          subject: "Hello from Wiingr!",
          body: "",
        }).then(async (res) => {
          if (res?.status === "cancelled") return;

          // update message with reponse status
          const docRef = database.collection("general-support").doc(data?.id);
          await docRef
            .update({
              responded: true,
            })
            .then(() => {
              setIsRetrigger(true);
              console.log("Responded field successfully updated!");
            })
            .catch((error) => {
              console.error("Error updating document:", error);
            });
        });
      } else {
        console.log("Email is not available on this device.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
          style={{
            textAlign: "center",
            width: "90%",
            textTransform: "capitalize",
          }}
          variant="custom"
          colorType="black"
          fontType="montserratBold"
          fontSize="title">
          {data?.topic}
        </Text>
      </View>
      <Spacer
        position="top"
        size="xlarge"
        style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="body">
            Name:{" "}
          </Text>
        </View>
        <Text
          variant="custom"
          colorType="lines"
          fontType="montserratRegular"
          fontSize="body">
          {data?.lastname}, {data?.firstname}
        </Text>
      </Spacer>
      <Spacer
        position="top"
        size="xsmall"
        style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="body">
            Email:{" "}
          </Text>
        </View>
        <Text
          variant="custom"
          colorType="lines"
          fontType="montserratRegular"
          fontSize="body">
          {data?.email}
        </Text>
      </Spacer>
      <Spacer
        position="top"
        size="xsmall"
        style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="body">
            Sent:{" "}
          </Text>
        </View>
        <Text
          variant="custom"
          colorType="lines"
          fontType="montserratLight"
          fontSize="body"
          width="100%">
          {getDate(data?.timestamp)} - {getTime(data?.timestamp)}
        </Text>
      </Spacer>
      <Spacer position="top" size="xxxlarge">
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.brand.linesLighter,
            paddingBottom: theme.spaceNumber[3],
            marginBottom: theme.spaceNumber[3],
          }}>
          <Text
            variant="custom"
            colorType="black"
            fontType="montserratBold"
            fontSize="body">
            Message
          </Text>
        </View>
        <Text
          variant="custom"
          colorType="black"
          fontType="montserratRegular"
          fontSize="body">
          {data?.message}
        </Text>
      </Spacer>
      <Spacer position="top" size="xxxxlarge">
        <Pressable
          onPress={handleResponse}
          style={{
            backgroundColor: theme.colors.brand.base,
            width: "35%",
            paddingVertical: theme.spaceNumber[3],
            borderRadius: theme.spaceNumber[1],
          }}>
          <Text
            style={{ textAlign: "center" }}
            variant="custom"
            colorType="basewhite"
            fontType="montserratRegular"
            fontSize="body">
            Respond
          </Text>
        </Pressable>
      </Spacer>
    </View>
  );
}
