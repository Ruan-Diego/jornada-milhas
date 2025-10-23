import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Resultado } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class PassagensService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getPassagens(search: any) : Observable<Resultado>{
    const params = search;
    return this.http.get<Resultado>(this.apiUrl + '/passagem/search', {params})
  }

}
