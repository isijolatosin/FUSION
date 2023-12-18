import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { SpaceArea } from "../../../components/utility/space-area.component";

const Home = () => {
	return (
		<SafeArea>
			<SpaceArea>
				<Spacer position="bottom" size="large">
					<Text variant="heading">Home!</Text>
				</Spacer>
				<Text variant="body">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
					unde, laudantium impedit quis molestias, voluptate sequi debitis
					quidem optio architecto doloremque minus voluptatibus reiciendis
					obcaecati recusandae? Provident accusamus iure deserunt?
				</Text>
			</SpaceArea>
		</SafeArea>
	);
};

export default Home;
