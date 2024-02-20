enum Turn {
	YELLOW,
	RED,
}

const board = document.getElementById("board") as HTMLDivElement;
const endGame = document.getElementById("end-game") as HTMLDivElement;
const yellowScoreLabel = document.getElementById("yellow-score");
const redScoreLabel = document.getElementById("red-score");

let button = document.querySelector("button") as HTMLButtonElement;
let yellowVictoryCounter: number = 0;
let redVictoryCounter: number = 0;
let currentTurn: Turn;
let gameType: string;

createBoard();
setScoreLabel();

/**
 * function to select the game type
 */
function selectGameType(type: string) {
	gameType = type;
	document.getElementById("game-modal").style.display = "none";
	document.getElementById("color-modal").style.display = "flex";
}

/**
 * function to select the color of the first player
 */
function selectColor(turn: Turn) {
	turn == Turn.YELLOW
		? (currentTurn = Turn.YELLOW)
		: (currentTurn = Turn.RED);
	document.getElementById("color-modal").style.display = "none";
	newGame();
}

/**
 * function to set default values and start a new game
 */
function newGame() {
	console.log(currentTurn);

	endGame.classList.remove("visible");
	endGame.classList.add("hidden");

	cleanBoard();
	createBoard();
	turnManager();
}

/**
 * resets board
 */
function cleanBoard() {
	let lastRow = board.lastElementChild;
	while (lastRow) {
		board.removeChild(lastRow);
		lastRow = board.lastElementChild;
	}
}

/**
 * creates board
 */
function createBoard() {
	for (let i = 6; i > 0; i--) {
		createRow(i);
		for (let j = 1; j < 8; j++) {
			createCell(j, i);
			createButton(j, i);
		}
	}
}

/**
 * adds new row to board
 * @param index represents the index of a single row
 */
function createRow(index: number) {
	const row = document.createElement("div") as HTMLDivElement;
	row.id = `row-${index}`;
	row.classList.add("row");
	if (board != undefined) {
		board.appendChild(row);
	}
}

/**
 * adds new cell to single row
 * @param cellIndex represents the index of a single cell
 * @param rowIndex represents the index of a single row
 */
function createCell(cellIndex: number, rowIndex: number) {
	const row = document.getElementById("row-" + rowIndex) as HTMLDivElement;
	if (row != undefined) {
		const cell = document.createElement("div") as HTMLDivElement;
		cell.id = `cell-${cellIndex}-row-${rowIndex}`;
		cell.classList.add("cell");
		row.appendChild(cell);
	}
}

/**
 * creates a new button that equals a single coin
 * @param cellIndex
 * @param rowIndex
 * both params give the exact position of the button to be generated
 */
function createButton(cellIndex: number, rowIndex: number) {
	const cell = document.getElementById(`cell-${cellIndex}-row-${rowIndex}`);
	if (cell != null) {
		const button = document.createElement("button") as HTMLButtonElement;
		button.id = `${cellIndex}-${rowIndex}`;
		button.classList.add("coin");
		button.addEventListener("click", (event) => {
			clickHandler(event as PointerEvent);
		});
		if (rowIndex > 1) {
			button.disabled = true;
		} else {
			button.classList.add("enabled");
		}
		cell.appendChild(button);
	}
}

/**
 * sets some cells as enabled (=can be clicked) and manages turns
 * @param event mouse click
 */
function clickHandler(event: PointerEvent) {
	const button = event.target as HTMLButtonElement;

	let id = button.id.split("-");
	let cell: number = Number(id[0]);
	let row: number = Number(id[1]);

	if (button != undefined) {
		turnManager(button);
		buttonManager(cell, row);

		if (row < 6) {
			buttonManager(cell, row + 1);
		}

		checkVictory(button, cell, row);
	}
}

/**
 * sets the coins color depending on the turn
 * @param button = coin (not required)
 */
function turnManager(button?: HTMLButtonElement) {
	if (currentTurn == Turn.RED) {
		if (button != undefined) button.classList.add("red");
		redScoreLabel.classList.remove("red-turn");
		yellowScoreLabel.classList.add("yellow-turn");
		currentTurn = Turn.YELLOW;
	} else {
		if (button != undefined) button.classList.add("yellow");
		yellowScoreLabel.classList.remove("yellow-turn");
		redScoreLabel.classList.add("red-turn");
		currentTurn = Turn.RED;
	}
}

/**
 * disables/enables clickable buttons
 * @param cell
 * @param row
 * both params are needed to locate the button position
 */
function buttonManager(cell: number, row: number) {
	const button = document.getElementById(
		`${cell}-${row}`
	) as HTMLButtonElement;
	if (button.disabled) {
		button.classList.add("enabled");
		button.disabled = false;
	} else {
		button.classList.remove("enabled");
		button.disabled = true;
	}
}

/**
 * implements the logic to check one's victory
 * @param button takes the last button clicked
 * @param cell takes its cell
 * @param row takes its row
 */
function checkVictory(button: HTMLButtonElement, cell: number, row: number) {
	let color = button.classList.contains("yellow") ? "yellow" : "red";
	let directions = [
		[0, 1],
		[1, 0],
		[1, 1],
		[1, -1],
	];

	// Controllo se il gioco è bestOfThreeGame
	if (gameType === "bestOfThreeGame") {
	}
	// le direzioni (directions) corrispondono rispettivamente a movimento orizzontale (sx-dx), verticale(su-giù), diagonale (dx, giù), diagonale (sx-giù)
	// n° della cella (cell) + di quanto deve spostarsi (i) * in che direzione deve andare (direction[]),
	// seleziona il bottone in quella posizione e - se esiste - ed ha lo stesso colore, count++
	// direction[0] corrisponde al primo numero della singola direzione es. [0,1] = 0 es. [1,0] = 1
	// direction[1] corrisponde al secondo numero della singola direzione es. [0,1] = 1 es. [1,0] = 0

	for (let direction of directions) {
		let count = 0;
		for (let i = -3; i <= 3; i++) {
			let nextCell = cell + i * direction[0];
			let nextRow = row + i * direction[1];
			let checkButton = document.getElementById(`${nextCell}-${nextRow}`);
			if (checkButton && checkButton.classList.contains(color)) {
				count++;
				if (count === 4) {
					showEndGame(color);
					return;
				}
			} else {
				count = 0;
			}
		}
	}
}

/**
 * switches the victory popup as visible
 */
function showEndGame(winner: string) {
	endGame.classList.add("visible");
	endGame.classList.remove("hidden");
	winner == "red" ? redVictoryCounter++ : yellowVictoryCounter++;
	setScoreLabel();
}

/**
 * updates scoreboards with the new victory
 */
function setScoreLabel() {
	yellowScoreLabel.innerText = "Score: " + yellowVictoryCounter;
	redScoreLabel.innerText = "Score: " + redVictoryCounter;
}

/**
 * resets the board
 */
function resetBoard() {
	cleanBoard();
	createBoard();
}

/**
 * resets the score
 */
function resetScore() {
	yellowVictoryCounter = 0;
	redVictoryCounter = 0;
	setScoreLabel();
}
