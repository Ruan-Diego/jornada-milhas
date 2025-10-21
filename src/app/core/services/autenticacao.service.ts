import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private _userService: UserService) {}

    autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
      return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, senha }, { observe: 'response' }).pipe(tap(response => {
        const authtoken = response.body?.access_token;
        if (authtoken) {
          console.log('Token recebido:', authtoken);
          this._userService.salvarToken(authtoken);
        }
      }));
    }

}
