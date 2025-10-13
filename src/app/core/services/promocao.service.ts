import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocao } from '../types/types';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  private apiUrl = environment.apiUrl;

  constructor(private _httpClient: HttpClient) { }

  listarPromocoes() : Observable<Promocao[]> {
    return this._httpClient.get<Promocao[]>(`${this.apiUrl}/promocoes`);
  }
}
