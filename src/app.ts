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
  if (button != undefined) {
    if (turn) {
      button.classList.add("yellow");
      turn = false;
    } else {
      button.classList.add("red");
      turn = true;
    }
    button.classList.remove("enabled");
    button.disabled = true;
    let id = button.id.split("-");
    //if (Number(id[1]) >= 1) {
      buttonEnabler(Number(id[1]));
    //}

    //checkVictory(Number(id[0]), Number(id[1]));
  }
}

function buttonEnabler(id: number) {
  for (let i = 6; i >= id; i--) {
    return i - 1;
  }
}

/*
function buttonDisabler(button: HTMLButtonElement){
    button.classList.remove('enabled');
    button.disabled = true;
}*/


/* function checkVictory (cell: number, row: number) {

    for (let i = 0, i < 4, i++> ) {
        if ({cell}.classList.contains("yellow") &&
            {cell+1}.classList.contains("yellow") &&
            {cell+2}.classList.contains("yellow") &&
            {cell+3}.classList.contains("yellow")){
            console.log("You won!")
        } else {
            return;
        }
    }
} */