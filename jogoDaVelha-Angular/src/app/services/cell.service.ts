import { Injectable } from '@angular/core';
import { ButtonModel } from '../models/button-model';
import { CellModel } from '../models/cell-model';

@Injectable({
  providedIn: 'root',
})
export class CellService {
  public cellList: Array<CellModel> = new Array<CellModel>();
  public button: ButtonModel = new ButtonModel();

  public winnerCells = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  public xCells = new Array<number>();
  public oCells = new Array<number>();
  public checkListX = new Array<boolean>();
  public checkListO = new Array<boolean>();

  public aux = 0;

  constructor() {}

  public startGame() {
    this.button.value = 'RESTART';
    this.fillList();
  }

  public checkButton(button: ButtonModel) {
    this.button = button;

    if (button.value === 'START') {
      button.value = 'RESTART';
      this.startGame();
    } else {
      let alert = confirm('Você deseja reiniciar o jogo?');

      if (alert === false) return;
      this.resetAndStartGame();
    }
  }

  public fillList() {
    for (let i = 0; i < 9; i++) {
      let cell = new CellModel();

      cell.id = i;
      cell.value = '';
      cell.color = '';

      this.cellList.push(cell);
    }
  }

  public checkCell(cellid: number) {
    const cellFound = this.cellList.find((x) => x.id === cellid);

    if (!cellFound) return;

    if (this.hasValue(cellFound)) {
      alert('Campo já preenchido');
    } else {
      if (this.aux % 2 === 0) {
        this.checkX(cellFound, cellid);
        setTimeout(() => {
          this.checkWinner();
        }, 500);
      } else {
        this.checkO(cellFound, cellid);
        setTimeout(() => {
          this.checkWinner();
        }, 500);
      }
    }
  }

  public checkX(cell: CellModel, cellid: number) {
    cell.value = 'X';
    cell.color = 'red';
    this.xCells.push(cellid);
    this.xCells.sort();
    this.aux++;
  }

  public checkO(cell: CellModel, cellid: number) {
    cell.value = 'O';
    cell.color = 'blue';
    this.oCells.push(cellid);
    this.oCells.sort();
    this.aux++;
  }

  public hasValue(cell: CellModel) {
    return cell.value != '';
  }

  public checkWinner() {
    let checker = (arr: Array<number>, target: Array<number>) =>
      target.every((v) => arr.includes(v));

    if (
      this.aux > 8 &&
      this.checkListO.every((x) => x === false) &&
      this.checkListX.every((x) => x === false)
    ) {
      alert('Deu velha');
      this.askRestartGame();
    }

    for (let i = 0; i < this.winnerCells.length; i++) {
      let xCellsHasWinnerCells = checker(this.xCells, this.winnerCells[i]);
      let oCellsHasWinnerCells = checker(this.oCells, this.winnerCells[i]);

      if (xCellsHasWinnerCells) {
        alert('Jogador 1 Venceu');
        this.askRestartGame();
      } else if (oCellsHasWinnerCells) {
        alert('Jogador 2 Venceu');
        this.askRestartGame();
      }

      this.checkListX.push(xCellsHasWinnerCells);
      this.checkListO.push(oCellsHasWinnerCells);
    }
  }

  public resetGame() {
    this.xCells = [];
    this.oCells = [];
    this.checkListO = [];
    this.checkListX = [];
    this.aux = 0;
    this.cellList = [];
    this.button.value = 'START';
  }

  public resetAndStartGame() {
    this.resetGame();
    this.startGame();
  }

  public askRestartGame() {
    let alert = confirm('Você deseja jogar novamente?');

    if (alert === false) return this.resetGame();

    this.resetGame();
    this.startGame();
  }
}
