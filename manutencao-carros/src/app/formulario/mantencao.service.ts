import { Injectable } from '@angular/core';
import { Manutencao } from '../model/manutencao';
import { WebStorageUtil } from '../util/web-storage-util';

@Injectable({
  providedIn : 'root'
})
export class ManutencaoService{

  manutencoes!: Manutencao[];
  constructor() {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');
  }

  save(manutencao: Manutencao) {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');
    this.manutencoes.push(manutencao);
    WebStorageUtil.set('MANUTENCOES_KEY', this.manutencoes);
  }

  update(manutencao: Manutencao) {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');
    this.delete(manutencao.titulo);
    this.save(manutencao);
  }

  delete(titulo: string): boolean {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');

    this.manutencoes = this.manutencoes.filter((u) => {
      return u.titulo?.valueOf() != titulo?.valueOf();
    });

    WebStorageUtil.set('MANUTENCOES_KEY', this.manutencoes);
    return true;
  }

  isExist(value: string): boolean {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');

    for (let u of this.manutencoes) {
      if (u.titulo?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getManutencoes(): Manutencao[] {
    this.manutencoes = WebStorageUtil.get('MANUTENCOES_KEY');
    return this.manutencoes;
  }

}

