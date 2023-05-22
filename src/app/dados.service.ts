import { Injectable } from '@angular/core';
import { Dados } from './dados';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private dados: Dados[] = [];

  constructor() { }

  addDados(dado: Dados) {
    this.dados.push(dado);
  }

  getDados(): Dados[] {
    console.log(this.dados);
    return this.dados;
  }

  editarDados(dado: Dados): void {
    const index = this.dados.findIndex(item => item === dado)
    if (index !== -1) {
      this.dados[index] = dado;
    }
  }

  deletarDados(dado: Dados): void {
    this.dados = this.dados.filter(item => item !== dado);
  }
}
