import { Injectable } from '@angular/core';
import { Dados } from './dados';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {


  constructor(private http: HttpClient) { }

  getDados(): Observable<any> {
    return this.http.get('http://localhost:3000/alunocarro');
  }

  getMatriculas(): Observable<any> {
    return this.http.get('http://localhost:3000/alunocarro/matricula')
  }

  addDados(dado: Dados) {
    let idcarro = this.http.get('http://localhost:3000/alunocarro/carrocount');
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
    this.http.post('http://localhost:3000/alunocarro/aluno', reqAluno);
    this.http.post('http://localhost:3000/alunocarro/carro', reqCarro);
  }

  editarDados(dado: Dados): void {
    let idcarro = this.http.get('http://localhost:3000/alunocarro/carrocount');
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
    this.http.put(`http://localhost:3000/alunocarro/aluno/${dado.matricula}`, reqAluno)
    this.http.put(`http://localhost:3000/alunocarro/carro/${idcarro}`, reqCarro)
  }

  deletarDados(matricula: number): Observable<any> {
    return this.http.get(`http://localhost:3000/alunocarro/carro/${matricula}`).pipe(
      switchMap((resultado: any) => {
        const idcarro = resultado;
        return this.http.delete(`http://localhost:3000/alunocarro/carro/${idcarro}`).pipe(
          switchMap(() => this.http.delete(`http://localhost:3000/alunocarro/aluno/${matricula}`))
        );
      })
    );
  }
}
