import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModel } from 'src/app/models/button-model';
import { CellService } from 'src/app/services/cell.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  @Input()
  public button = new ButtonModel();

  constructor(public svc: CellService) {}

  ngOnInit(): void {
    this.button.value = 'START';
  }

  public clickButton(button: ButtonModel) {
    this.svc.checkButton(button);
  }
}
