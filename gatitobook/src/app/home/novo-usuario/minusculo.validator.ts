import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as string;
  if (!valor) {
    return { vazio: true };
  }
  if (valor.length < 4 ) {
    return { minLength: true };
  }
  if (valor !== valor.toLowerCase()) {
    return { minusculo: true };
  } else {
    return null;
  }
}
