import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/types';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
    titulo = 'Olá ';
    textoBotao = 'ATUALIZAR'
    perfilComponent = true;
    form: FormGroup | null = null;

    token = '';
    nome = '';
    cadastro!: PessoaUsuaria;

    constructor(private _tokenSerivce: TokenService,
                private _cadastroService: CadastroService,
                private _fomrularioService: FormularioService,
                private router: Router,
                private _userService: UserService) {}

    ngOnInit(): void {
      this.token = this._tokenSerivce.retornaToken() || '';
      this._cadastroService.buscarCadastro().subscribe((cadastro) => {
        console.log(cadastro);
        this.cadastro = cadastro;
        this.nome = cadastro.nome;
        this.carregarFormulario()
      });
    }

    carregarFormulario(){
      this.form = this._fomrularioService.getCadastro();
      console.log(this.form, this.cadastro)
      this.form?.patchValue({
        nome: this.cadastro.nome,
        email: this.cadastro.email,
        cpf: this.cadastro.cpf,
        telefone: this.cadastro.telefone,
        nascimento: this.cadastro.nascimento,
        genero: this.cadastro.genero,
        cidade: this.cadastro.cidade,
        estado: this.cadastro.estado
      });
    }

    deslogar() {
      this._userService.logout();
      this.router.navigate(['/login']);
    }

    atualizar() {
      const dadosAtualizados = this._fomrularioService.getCadastro()?.value;

      const dadosFiltrados = {
        nome: dadosAtualizados?.nome,
        nascimento: dadosAtualizados?.nascimento,
        cpf: dadosAtualizados?.cpf,
        telefone: dadosAtualizados?.telefone,
        email: dadosAtualizados?.email,
        senha: dadosAtualizados?.senha,
        cidade: dadosAtualizados?.cidade,
        estado: dadosAtualizados?.estado,
        genero: dadosAtualizados?.genero
      };
      console.log(this.token)
      console.log(dadosFiltrados)
      this._cadastroService.editarCadastro(dadosFiltrados).subscribe({
        next: (res) => {
          console.log('Cadastro atualizado com sucesso', res);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('Erro ao atualizar cadastro', err);
        }
      });
    }
}
