import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Credenciais } from '../../models/credenciais';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toastr: ToastrService) { }

  logar() {
    this.toastr.error('Usuário e/ou senha inválidos', 'Login');
    this.creds.senha = '';
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid;
  }
}
