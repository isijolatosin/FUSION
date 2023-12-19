import React, { useState } from "react";

import { useAppContext } from "../../context/ThemeContext";
import { CodeInput, CodeInputWrapper } from "./input.styles";

export default function CodeComponent({
	includeIcon,
	keyboardType,
	setValue,
	value,
	width,
}) {
	const [code, setCode] = useState("");
	const {
		state: { theme },
		dispatch,
	} = useAppContext();

	const handleCodeChange = (text) => {
		// Allow only numeric input
		const numericRegex = /^[0-9]*$/;
		if (numericRegex.test(text) && text.length <= 6) {
			setCode(text);
		}
	};

	return (
		<CodeInputWrapper>
			{Array.from({ length: 6 }).map((_, idx) => (
				<CodeInput
					key={idx}
					onChangeText={(text) => handleCodeChange(text)}
					value={code}
					keyboardType={keyboardType}
					maxLength={1}
					theme={theme}
					includeIcon={includeIcon}
				/>
			))}
		</CodeInputWrapper>
	);
}
