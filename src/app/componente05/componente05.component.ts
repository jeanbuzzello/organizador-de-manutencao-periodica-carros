import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-componente05',
  templateUrl: './componente05.component.html',
  styleUrls: ['./componente05.component.css']
})
export class Componente05Component implements OnInit {

  @Input() stringPassada: string = "";
  @Output()  showEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.showEvent.emit(this.stringPassada);
  }

}
