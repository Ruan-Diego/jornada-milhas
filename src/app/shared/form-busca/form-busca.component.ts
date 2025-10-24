import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Output() realizarBusca = new EventEmitter();
  constructor(
    public _formBuscaService : FormBuscaService) {}

  buscar() {
    if (this._formBuscaService.formEstaValido) {
      const formBuscavalue = this._formBuscaService.obterDadosBusca();
      this.realizarBusca.emit(formBuscavalue);
    } else {
      alert('O formulário precisa ser preenchido')
    }
  }
}
