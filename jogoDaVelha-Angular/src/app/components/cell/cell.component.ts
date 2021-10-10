import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CellModel } from 'src/app/models/cell-model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input()
  public cell: CellModel = new CellModel();

  @Output()
  public checkCell = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public _checkCell(id: number) {
    this.checkCell.emit(id);
  }
}
