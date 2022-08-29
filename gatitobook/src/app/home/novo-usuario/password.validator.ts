import { AbstractControl } from '@angular/forms';
export function passwordValidator(control: AbstractControl) {
  const senha = control.value as string;

  if(!senha) {
    return { vazio: true };
  }

  if(senha.length < 6) {
    return { minLength: true };
  }

  const temMaiusculo = /[A-Z]+/.test(senha);
  const temMinusculo = /[a-z]+/.test(senha);
  const temNumeral = /[0-9]+/.test(senha);

  const senhaValida = temMaiusculo && temMinusculo && temNumeral;

  return !senhaValida ? { senhaForte: true } : null;
};
