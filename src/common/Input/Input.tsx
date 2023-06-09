import { CustomLabel, CustomInput } from './Input.styles';

import { FC, InputHTMLAttributes } from 'react';

export type InputProps = {
	labelText?: string;
	placeholderText?: string;
	borderColor?: string;
	isTextArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({
	labelText,
	placeholderText,
	borderColor = '#d4c600',
	isTextArea = false,
	...otherProps
}) => {
	return (
		<>
			{labelText && <CustomLabel>{labelText}</CustomLabel>}
			<CustomInput
				as={isTextArea ? 'textarea' : 'input'}
				borderColor={borderColor}
				placeholder={placeholderText}
				{...otherProps}
			/>
		</>
	);
};

export default Input;
