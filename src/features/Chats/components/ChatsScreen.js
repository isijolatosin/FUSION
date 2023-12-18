import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SpaceArea } from "../../../components/utility/space-area.component";

const ChatsScreen = () => {
	return (
		<SafeArea>
			<SpaceArea>
				<Spacer position="bottom" size="large">
					<Text variant="heading">Chats Screen!</Text>
				</Spacer>
			</SpaceArea>
		</SafeArea>
	);
};

export default ChatsScreen;
