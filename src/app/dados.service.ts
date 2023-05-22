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
    return this.dados;
  }
}
