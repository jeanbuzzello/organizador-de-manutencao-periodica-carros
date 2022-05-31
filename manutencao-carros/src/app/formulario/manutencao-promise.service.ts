import { Manutencao } from './../model/manutencao';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class ManutencaoPromiseService {
  URL = 'http://localhost:3000/manutencoes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}




  save(manutencao: Manutencao): Promise<Manutencao | undefined> {
    return this.httpClient
      .post<Manutencao>(this.URL, JSON.stringify(manutencao), this.httpOptions)
      .toPromise();
  }

  getAll():Promise<Manutencao[]  | undefined>{
    return this.httpClient.get<Manutencao[]>(`${this.URL}`).toPromise();
 }

}
