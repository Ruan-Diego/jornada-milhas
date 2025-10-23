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

  buscar () {
    const formBuscaValue = this._formBuscaService.formBusca.value
    this.realizarBusca.emit(formBuscaValue);
  }
}
