import { environment } from './../../../environments/environment';
import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarNovoUsuario(novoUsuario: NovoUsuario) {
    return this.http.post(`${API}/user/signup`, novoUsuario);
  }

  verificarUsuarioExistente(nomeUsuario: string) {
    return this.http.get(`${API}/user/exists/${nomeUsuario}`);
  }
}
