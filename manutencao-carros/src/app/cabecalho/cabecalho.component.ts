import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  imageURL: string  = '/assets/logo.png';

  constructor() { }

  getBackgroundImageStyle(){

    return {
      'height':
        '35px',
        'width' : 'auto'
    };

  }

  ngOnInit(): void {
  }

}
