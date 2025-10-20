import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidation {

  static equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control.parent;
      if (formGroup) {
        const otherControl = formGroup.get(otherField);
        if (otherControl && control.value !== otherControl.value) {
          return { equalTo: true };
        }
      }
      return null;
    };
  }
}
