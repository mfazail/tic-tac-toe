import { FC } from "react";

const Board: FC<{ children: React.ReactNode }> = ({ children }) => {
	return <div className="board">{children}</div>;
};

export default Board;