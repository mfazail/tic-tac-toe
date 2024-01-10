import { useBoard } from "./hooks/useBoard";
import Board from "./components/Board";
import BoardRow from "./components/BoardRow";
import Square from "./components/Square";

function App() {
	const { turn,boxes, status, canUndo, canRedo, onMove, onStart, onUndo, onRedo } =
		useBoard();
	return (
		<main className="game"
			style={{
				background: turn === "X" ? "X" : "O",
			}}
		>
			<div className="status">{status.message}</div>

			<div className="status"></div>
			<Board>
				{Array(3)
					.fill(null)
					.map((_, i) => {
						return (
							<BoardRow key={i}>
								{Array(3)
									.fill(null)
									.map((_, j) => {
										return (
											<Square
												key={j}
												value={boxes[i * 3 + j]}
												handleClick={() =>
													onMove(i * 3 + j)
												}
												disabled={
													status.state !== "playing"
												}
											/>
										);
									})}
							</BoardRow>
						);
					})}
			</Board>
			<div className="actions">
				<button
					onClick={onUndo}
					disabled={!canUndo}>
					Undo
				</button>
				<button onClick={onStart}>
					{status.state == "idle" ? "Start" : "Restart"}
				</button>
				<button
					onClick={onRedo}
					disabled={!canRedo}>
					Redo
				</button>
			</div>
		</main>
	);
}

export default App;
