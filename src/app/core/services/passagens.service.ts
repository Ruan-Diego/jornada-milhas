import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DadosBusca, Resultado } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class PassagensService {
  private apiUrl: string = environment.apiUrl;
  precoMin: number = 0;
  precoMax: number = 5000;
  constructor(private http: HttpClient) {}

  getPassagens(search: any): Observable<Resultado> {
    const params = this.converterParametroString(search);
    const obs =  this.http.get<Resultado>(this.apiUrl + '/passagem/search?' + params);
    obs.pipe(take(1)).subscribe(res =>
      {
        this.precoMin = res.precoMin
        this.precoMax = res.precoMax
      }
    )
    return obs;
  }

  converterParametroString(busca: DadosBusca) {
    const query = Object.entries(busca)
      .map(([key, value]) => {
        if (!value) {
          return '';
        }
        return `${key}=${value}&`;
      }).join('');

    return query;
  }
}
