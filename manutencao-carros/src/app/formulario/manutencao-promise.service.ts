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
}
