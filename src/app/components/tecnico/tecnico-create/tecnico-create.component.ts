import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../models/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrl: './tecnico-create.component.css'
})
export class TecnicoCreateComponent {

tecnico: Tecnico = {
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
    private service: TecnicoService,
    private toastr: ToastrService,
    private router: Router) { }

    
    create(): void {
      this.service.create(this.tecnico).subscribe(() => {
        this.toastr.success('Técnico cadastrado com sucesso', 'Cadastro');
        this.router.navigate(['tecnicos']);
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
      if(this.tecnico.perfis.includes(perfil)) {
        this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
      } else {
        this.tecnico.perfis.push(perfil);
      }
    }

    validaCampos(): boolean {
      return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
    }
  }
  