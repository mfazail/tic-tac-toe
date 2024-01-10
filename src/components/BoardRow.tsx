import { FC } from "react";

const BoardRow: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="board-row">{children}</div>;
};

export default BoardRow;