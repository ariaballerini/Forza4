const board = document.getElementById("board") as HTMLDivElement;
let button = document.querySelector("button") as HTMLButtonElement;
let turn: boolean = true;

createBoard();

function createBoard() {
  for (let i = 6; i > 0; i--) {
    createRow(i);
    for (let j = 1; j < 8; j++) {
      createCell(j, i);
      createButton(j, i);
    }
  }
}

function createRow(index: number) {
  const row = document.createElement("div") as HTMLDivElement;
  row.id = `row-${index}`;
  row.classList.add("riga");
  if (board != undefined) {
    board.appendChild(row);
  }
}

function createCell(cellIndex: number, rowIndex: number) {
  const row = document.getElementById("row-" + rowIndex) as HTMLDivElement;
  if (row != undefined) {
    const cell = document.createElement("div") as HTMLDivElement;
    cell.id = `cell-${cellIndex}-row-${rowIndex}`;
    cell.classList.add("cella");
    row.appendChild(cell);
  }
}

function createButton(cellIndex: number, rowIndex: number) {
  const cell = document.getElementById(`cell-${cellIndex}-row-${rowIndex}`);
  if (cell != null) {
    const button = document.createElement("button") as HTMLButtonElement;
    button.id = `${cellIndex}-${rowIndex}`;
    button.classList.add("gettone");
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

function clickHandler(event: PointerEvent) {

  const button = event.target as HTMLButtonElement;

  let id = button.id.split("-");
  let cell: number = Number(id[0]);
  let row: number = Number(id[1]);

  if (button != undefined) {
    if (turn) {
      button.classList.add("yellow");
      turn = false;
    } else {
      button.classList.add("red");
      turn = true;
    }

    buttonDisabler(cell, row);
    buttonEnabler(cell, row+1);

    checkVictory(button, cell, row);
  }
}

function buttonEnabler(cell: number, row: number) {
  const button = document.getElementById(`${cell}-${row}`) as HTMLButtonElement;
  button.classList.add("enabled");
  button.disabled = false;
}

function buttonDisabler(cell: number, row: number) {
  const button = document.getElementById(`${cell}-${row}`) as HTMLButtonElement;
  button.classList.remove("enabled");
  button.disabled = true;
}

function checkVictory(button: HTMLButtonElement, cell: number, row: number) {
  let color = button.classList.contains("yellow") ? "yellow" : "red";
  let directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

  // le direzioni corrispondono rispettivamente a movimento orizzontale (sx-dx), verticale(su-giù), diagonale (dx, giù), diagonale (sx-giù)
  // n° della cella + i (di quanto deve spostarsi) * in che direzione deve andare, seleziona il bottone in quella posizione e - se esiste - ed ha lo stesso colore, count++
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
          console.log("You won!");
          return;
        }
      } else {
        count = 0;
      }
    }
  }
}