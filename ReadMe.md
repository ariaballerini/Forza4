Componenti:

HTML - Tabellone 7x6 ("div")
HTML - Singola cella ("div")
HTML - Gettone ("button")
CSS - gettone giallo
CSS - gettone rosso
CSS - classe bottone di base bianco
JS - aggiunta evento al clic
CSS - classe hover x bottoni cliccabili
CSS - classe disabled x bottoni non cliccabili

Logica:

- Gestione turno (switch colore del bottone)
- Ogni singola cella ha un bottone, inizialmente bianco
- Gestione dei bottoni cliccabili (hover grigino x bottoni abilitati, disabled x bottoni non cliccabili)
- Al clic del bottone di ogni giocatore, il bottone cambia colore in base all'id del giocatore
-

Extra

- Scelta del colore x giocatore
- Rigioca

VITTORIA ORIZZONTALE
Passato alla funzione il colore che ha attaccato per ultimo
Per ogni riga del tabellone, controlla:

- che il primo bottone nella riga (row 0), di quel colore, abbia il colore == a quello del secondo (row+1), e, == a quello del terzo (row+2), == a quello del quarto (row+3)

VITTORIA VERTICALE
Per ogni riga del tabellone, controlla:

- che il primo bottone nella riga(row 0), di quel colore, abbia il colore == a quello sotto(row 0 della riga sotto), e, == a quello sotto (row 0 della riga sotto), == a quello sotto (row 0 della riga sotto)

VITTORIA DIAGONALE
Per ogni riga del tabellone, controlla:

- che il primo bottone nella riga(row 0), di quel colore, abbia il colore == a quello sotto(row+1 della riga sotto), e, == a quello sotto (row+2 della riga sotto), == a quello sotto (row+3 della riga sotto)

VITTORIA DIAGONALE OPPOSTA
Per ogni riga del tabellone, controlla:

- che il primo bottone nella riga(row 0), di quel colore, abbia il colore == a quello sopra(row+1 della riga sopra), e, == a quello sopra (row+2 della riga sopra), == a quello sopra (row+3 della riga sopra)

row.id = `row-${index}`; es. row-1, row-2, row-3, row-4, row-5, row-6, row-7
cell.id = `cell-${cellIndex}-row-${rowIndex}`; es. cell-1-row-1, cell-2-row-1.. cell-1-row-2, cell-2-row-2.. cell-1-row-6, cell-2-row-6
button.id = `btn-cell-${cellIndex}-row-${rowIndex}`; es. btn-cell-1-row-1, btn-cell-2-row-1, btn-cell-3-row-1..
