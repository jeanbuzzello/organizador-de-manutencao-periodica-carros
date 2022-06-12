
import { Manutencao } from "../model/manutencao";

export class Shared {

  constructor(){}

  public  static initializeWebStorage():void {

    let user = new Manutencao('MANUTENCAO_KEY', 'qwerty');
    localStorage.setItem('MANUTENCAO_KEY', JSON.stringify(user));
    localStorage.setItem('MANUTENCOES_KEY', JSON.stringify([]));
    localStorage.setItem('VALOR_KEY', JSON.stringify(0));


  }


}
