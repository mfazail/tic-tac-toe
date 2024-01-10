import { useEffect, useState } from "react";

interface Status {
	state: "idle" | "playing" | "end";
	message: string;
}

export const useBoard = () => {
	const [boxes, setBoxes] = useState<(null | string)[]>(Array(9).fill(null));
	const [history, setHistory] = useState<(string | null)[][]>([boxes]);
	const [moved, setMoved] = useState(0);
	const [turn, setTurn] = useState("X");

	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);

	const [status, setStatus] = useState<Status>({
		state: "idle",
		message: "Click Start to begin",
	});

	useEffect(() => {
		if (status.state == "playing") {
			// have dobut here
			setStatus({ state: "playing", message: "Next player: " + turn });
		}
	}, [boxes]);

	useEffect(() => {
		if (boxes.find((box) => box === null) === undefined) {
			setStatus({ state: "end", message: "Game ended \nDraw" });
		}
		if (calculateWinner(boxes)) {
			const t = turn == "X" ? "O" : "X";
			setStatus({
				state: "end",
				message: "Game ended \nWinner: " + t,
			});
		}
		if (moved == history.length - 1 || status.state != 'playing') {
			setCanRedo(false);
		} else {
			setCanRedo(true);
		}

		if (moved == 0 || status.state != 'playing') {
			setCanUndo(false);
		} else {
			setCanUndo(true);
		}
	}, [turn]);

	const onMove = (index: number) => {
		if (boxes[index] !== null) return;
		if (status.state === "end") return;
		if (!canUndo) setCanUndo(true);
		const s = boxes.slice();
		s[index] = turn;
		setBoxes(s);
		setTurn((currentTurn) => {
			return currentTurn === "X" ? "O" : "X";
		});
		setHistory([...history, s]);
		setMoved(history.length);
	};

	const onStart = () => {
		setStatus({ state: "playing", message: "Next player: X" });
		resetGame();
	};

	const onUndo = () => {
		if (status.state != "playing" || moved < 1) {
			return;
		}
		setMoved(moved - 1);
		setBoxes(history[moved - 1]);
		setTurn((currentTurn) => {
			return currentTurn === "X" ? "O" : "X";
		});
	};

	const onRedo = () => {
		if (status.state != "playing" || moved >= history.length - 1) {
			return;
		}
		setMoved(moved + 1);
		setBoxes(history[moved + 1]);
		setTurn((currentTurn) => {
			return currentTurn === "X" ? "O" : "X";
		});
	};

	const resetGame = () => {
		setMoved(0);
		setTurn("X");
		setCanRedo(false);
		setCanUndo(false);
		setBoxes(Array(9).fill(null));
		setHistory([Array(9).fill(null)]);
	};

	return { turn, boxes, status, canUndo, canRedo, onStart, onMove, onUndo, onRedo };
};

const calculateWinner = (arr: (string | null)[]) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
			return arr[a];
		}
	}
};
