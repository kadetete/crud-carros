import { Component, Inject, OnInit } from '@angular/core';
import { Dados } from '../dados';
import { DadosService } from '../dados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{
  dadosFormulario: Dados[] = [];
  carregando = true;

  constructor(private dadosService: DadosService, private router: Router) {

  }
  

  ngOnInit(): void {
    this.onListar();
  }

  onListar(): void {
    this.dadosFormulario = this.dadosService.getDados()
  }

  editarDados(dado: Dados): void {
    this.dadosService.editarDados(dado);
  }

  deletarDados(dado: Dados): void {
    this.dadosService.deletarDados(dado);
  }

  cadastrar(): void {
    this.router.navigate(['/forms']);
  }
}
