import { Manutencao } from './../model/manutencao';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable, of } from 'rxjs';

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


  update(manutencao: Manutencao): Promise<Manutencao  | undefined>{
    return this.httpClient
    .put<Manutencao>(
      `${this.URL}/${manutencao.id}`,
      JSON.stringify(manutencao),
      this.httpOptions
    ).toPromise();
   }

  getAll(): Observable<Manutencao[] | undefined> {
    const apiData = ajax(this.URL).pipe(
      map((res: any) => {
        if (!res.response) {
          throw new Error('Nao tem response');
        }

        return res.response;
      }),
      catchError(() => of([]))
    );

    return apiData;
  }
  getOne(id: number): Promise<Manutencao | undefined> {
    return this.httpClient
      .get<Manutencao | undefined>(`${this.URL}/${id}`)
      .toPromise()
      .then(this.extractDataManutencao)
      .catch(this.handleError);
  }
  private extractDataManutencao(res: Manutencao | undefined ) {
    console.log(res);
    //let body = res.json();
    let body = res;
    return body || false;
  }

  delete(manutencao: Manutencao): Promise<number> {
    return this.httpClient
      .delete<number>(this.URL + '/' + manutencao.id, this.httpOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);

    console.log();
  }

  private extractData(res: number | undefined) {
    console.log(res);
    //let body = res.json();
    let body = res;
    return body || false;
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
