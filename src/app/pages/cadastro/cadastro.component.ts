import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/types';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  constructor(private formularioService: FormularioService,
              private _cadastroService: CadastroService,
              private router: Router) {}

  cadastrar() {
      const formCadastro = this.formularioService.getCadastro();
      if(formCadastro?.valid){
        const novoCadastro = formCadastro.getRawValue() as PessoaUsuaria;
        this._cadastroService.cadastrar(novoCadastro).subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
          },
          error: (err) => { console.log('Erro ao realizar cadastro',err) }
        })
      }
      console.log('Cadastro realizado com sucesso', formCadastro)
  }
}
