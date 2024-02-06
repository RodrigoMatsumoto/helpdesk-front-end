import { Component, OnInit } from '@angular/core';
import { ChamadoService } from '../../../services/chamado.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from '../../../models/chamado';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})
export class ChamadoReadComponent  implements OnInit{

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: ''
  }
  
  constructor(
    private chamadoService: ChamadoService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastrService.error(ex.error.error);
    });
  }

  retornaStatus(status: any): string {
    if (status == '1') {
      return 'ABERTO';
    } else if (status == '2') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(status: any): string {
    if (status == '1') {
      return 'BAIXA';
    } else if (status == '2') {
      return 'MÉDIA'
    } else {
      return 'ALTA';
    }
  }
}
