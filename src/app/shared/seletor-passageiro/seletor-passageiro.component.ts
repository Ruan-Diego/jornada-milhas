import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SeletorPassageiroComponent),
    multi: true
  }]
})
export class SeletorPassageiroComponent implements ControlValueAccessor {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  value: number = 0;
  onChange = (val: number) => {};
  onTouched = () => {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  onChangeQtd(operacao: 'incrementar' | 'decrementar') {
    if (operacao === 'incrementar') {
      this.value++;
    } else if (operacao === 'decrementar' && this.value > 0) {
      this.value--;
    }
    this.onChange(this.value);
    this.onTouched();
  }

}
