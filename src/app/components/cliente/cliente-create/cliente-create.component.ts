import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {

cliente: Cliente = {
  id:'',
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  perfis: [],
  dataCriacao: ''
}

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router) { }

    
    create(): void {
      this.service.create(this.cliente).subscribe(() => {
        this.toastr.success('Cliente cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['clientes']);
      }, ex => {
        if(ex.error.errors) {
          ex.error.errors.forEach((element: { message: string | undefined; }) => {
            this.toastr.error(element.message);
          })
        } else {
          this.toastr.error(ex.error.message);
        }
      });
    }

    addPerfil(perfil: any): void {
      if(this.cliente.perfis.includes(perfil)) {
        this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      } else {
        this.cliente.perfis.push(perfil);
      }
    }

    validaCampos(): boolean {
      return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
    }
  }
  