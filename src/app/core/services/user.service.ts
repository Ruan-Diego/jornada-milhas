import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/types';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import * as jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);
  user$ = this.userSubject.asObservable();

  get user(): PessoaUsuaria | null {
    return this.userSubject.value;
  }

  set user(user: PessoaUsuaria | null) {
    this.userSubject.next(user);
  }

  constructor(private _tokenService: TokenService) {
    if(this._tokenService.possuiToken()) {
        this.decodificarToken();
    }
  }

  decodificarToken() {
    const token = this._tokenService.retornaToken();
    if(token){
      const user = jwt.jwtDecode(token) as PessoaUsuaria
      this.userSubject.next(user);
    }
  }

  retornarUser() {
    console.log('Retornando usuário:', this.userSubject.value);
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this._tokenService.salvaToken(token);
    this.decodificarToken();
  }

  logout() {
    this._tokenService.removeToken();
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this._tokenService.possuiToken();
  }

}
