import { Router } from '@angular/router';
import { UsuarioExistenteService } from './usuario-existente.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { passwordValidator } from './password.validator';
import { usuarioSenhaIguaisValidator } from './usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExistenteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255),]],
      password: ['', [Validators.required, Validators.minLength(6), passwordValidator]],
    },
    {
      validators: [usuarioSenhaIguaisValidator],
    });
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: () => {
          console.error;
        },
      });
    }

  }



}
