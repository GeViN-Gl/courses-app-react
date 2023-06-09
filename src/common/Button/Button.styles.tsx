import styled from 'styled-components';

type CustomBaseButtonProps = {
	narrow?: boolean;
};

export const BaseButton = styled.button<CustomBaseButtonProps>`
	/* min-width: 165px; */
	width: auto;
	height: 50px;
	letter-spacing: 0.5px;
	line-height: 50px;
	${({ narrow }) =>
		narrow ? 'padding: 0 15px 0 15px' : 'padding: 0 35px 0 35px'};
	font-size: 18px;
	background-color: #ffffff;
	color: #000000;
	font-family: inherit;
	font-weight: bolder;
	border: 1px solid #ea00ff;
	cursor: pointer;
	display: flex;
	justify-content: center;

	&:hover {
		border: 1px solid black;
	}
`;

export const InvertedButton = styled(BaseButton)`
	background-color: white;
	color: black;
	border: 1px solid black;

	&:hover {
		background-color: black;
		color: white;
		border: none;
	}
`;
