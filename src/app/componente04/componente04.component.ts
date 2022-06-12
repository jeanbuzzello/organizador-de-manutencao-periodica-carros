import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente04',
  templateUrl: './componente04.component.html',
  styleUrls: ['./componente04.component.css']
})
export class Componente04Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  retornoShowEvent(event: string){

    console.log(event);

  }

}
