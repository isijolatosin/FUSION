import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

const HomeSplash = () => {
	return (
		<SafeArea>
			<Spacer position="bottom" size="large">
				<Text variant="heading">HomeSplash!</Text>
			</Spacer>
		</SafeArea>
	);
};

export default HomeSplash;
