import { Injectable } from '@angular/core';

const KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvaToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  retornaToken(): string | null {
    return localStorage.getItem(KEY);
  }

  removeToken(): void {
    localStorage.removeItem(KEY);
  }

  possuiToken(): boolean {
    return !!this.retornaToken();
  }
}
