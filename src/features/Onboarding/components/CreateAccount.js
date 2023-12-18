import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { SpaceArea } from "../../../components/utility/space-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

export default function CreateAccount() {
	return (
		<SafeArea>
			<SpaceArea>
				<Spacer position="bottom" size="large">
					<Text variant="heading">Creat Account Screen!</Text>
				</Spacer>
			</SpaceArea>
		</SafeArea>
	);
}
