import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const UserProfile = () => {
	return (
		<SafeArea>
			<Spacer position="bottom" size="large">
				<Text variant="heading">UserProfile Profile!</Text>
			</Spacer>
		</SafeArea>
	);
};

export default UserProfile;
