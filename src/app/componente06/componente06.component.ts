import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-componente06',
  templateUrl: './componente06.component.html',
  styleUrls: ['./componente06.component.css']
})
export class Componente06Component implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {

      console.log('parametro query recebido: ' + params['exemplo']);

    });

      console.log('parametros url recebido: ' + this.route.snapshot.paramMap.get('id'));

  }

}
