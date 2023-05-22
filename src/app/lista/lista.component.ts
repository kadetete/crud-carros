import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dados } from '../dados';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  dadosFormulario: Dados[] = [];

  constructor(private dadosService: DadosService, private router: Router) {

  }

  ngOnInit(): void {
    this.dadosFormulario = this.dadosService.getDados();
  }

}
