import { Component, OnInit, inject } from '@angular/core';
import { Dados } from '../dados';
import { Router } from '@angular/router';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent{
  dado: Dados = {modelo: '', ano: '', nome: '', matricula: '', codigo: '', cnh: ''};

  constructor(private dadosService: DadosService, private router: Router) {

  }

  addDados() {
    this.dadosService.addDados(this.dado);
    this.dado = {modelo: '', ano: '', nome: '', matricula: '', codigo: '', cnh: ''};
    this.router.navigate(['/lista']);
  }

}

