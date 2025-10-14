import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

   loginForm!: FormGroup;

   constructor(private formBuilder: FormBuilder, private authService: AutenticacaoService, private router: Router) {}

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email: [null, [Validators.required, Validators.email]],
        senha: [null, Validators.required]
      })
  }

    login() {
      const email = this.loginForm.value.email;
      const senha = this.loginForm.value.senha;

      this.authService.autenticar(email, senha).subscribe({
          next: (value) => {
              console.log('Login realizado com sucesso', value)
              this.router.navigateByUrl('/')
              this.loginForm.reset();
          },
          error: (err) => {
              console.log('Erro no login', err)
          }
      })
    }
}
