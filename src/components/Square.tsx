import { FC, MouseEventHandler } from "react";

const Square: FC<{
	value: null | string;
	handleClick: MouseEventHandler;
	disabled: boolean;
}> = ({ value, handleClick, disabled }) => {
	return (
		<button
			className="square"
			onClick={handleClick}
			disabled={disabled}>
			{value}
		</button>
	);
};
export default Square;
