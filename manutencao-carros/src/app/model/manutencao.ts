export class Manutencao {

  titulo: string;
  descricao: string;
  valor: number;
  dt_manutencao: Date;

  constructor(
    titulo: string, password: string
  ){


    this.titulo = titulo;
    this.descricao = '';
    this.valor = 0;
    this.dt_manutencao = new Date();

  }

  static clone(manutencao: Manutencao){

    return Object.assign({}, manutencao);

  }

}
