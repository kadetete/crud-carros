import { Injectable } from '@angular/core';
import { Dados } from './dados';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DadosService {
  private dados: Dados[] = [];

  constructor(private http: HttpClient) { }

  getDados() {
    return this.http.get('localhost:3000/alunocarro');
  }

  addDados(dado: Dados) {
    let idcarro = this.http.get('localhost:3000/carrocount');
    if (dado.cnh === true) {
      dado.cnh = 1;
    } else {
      dado.cnh = 0;
    }
    let reqAluno = `{"noAluno": "${dado.nome}", "matriculaAluno": ${dado.matricula}}`;
    let reqCarro = `{
      "idCarro": ${idcarro},
      "marcaCarro": "${dado.marca}",
      "modeloCarro": "${dado.modelo}",
      "anoCarro": ${dado.ano},
      "codigoEtiqueta": "${dado.codigo}",
      "validaCnh": ${dado.cnh},
      "matriculaRel": ${dado.matricula}
  }`;
    this.http.post('localhost:3000/aluno', reqAluno);
    this.http.post('localhost:3000/carro', reqCarro);
  }

  editarDados(dado: Dados): void {
    let idcarro = this.http.get('localhost:3000/carrocount');
    if (dado.cnh === true) {
      dado.cnh = 1;
    } else {
      dado.cnh = 0;
    }
    let reqAluno = `{"noAluno": "${dado.nome}", "matriculaAluno": ${dado.matricula}}`
    let reqCarro = `{
      "idCarro": ${idcarro},
      "marcaCarro": "${dado.marca}",
      "modeloCarro": "${dado.modelo}",
      "anoCarro": ${dado.ano},
      "codigoEtiqueta": "${dado.codigo}",
      "validaCnh": ${dado.cnh},
      "matriculaRel": ${dado.matricula}
    }`
    this.http.put(`localhost:3000/aluno/${dado.matricula}`, reqAluno)
    this.http.put(`localhost:3000/carro/${idcarro}`, reqCarro)
  }

  deletarDados(dado: Dados): void {
    let idcarro = this.http.get('localhost:3000/carrocount');
    this.http.delete(`localhost:3000/alunos/${dado.matricula}`);
    this.http.delete(`localhost:3000/carro/${idcarro}`);
  }
}
