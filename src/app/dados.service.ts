import { Injectable } from '@angular/core';
import { Dados } from './dados';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, mergeMap, forkJoin } from 'rxjs';

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

  addDados(dado: Dados): Observable<any> {
    return this.http.get(`http://localhost:3000/alunocarro/carro/${dado.matricula}`).pipe(
      switchMap((resultado: any) => {
        const idcarro = resultado.id;
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
        let addAluno = this.http.post('http://localhost:3000/alunocarro/aluno', reqAluno);
        let addCarro = this.http.post('http://localhost:3000/alunocarro/carro', reqCarro);
        return forkJoin(addAluno, addCarro);
      })
    );
  }

  editarDados(dado: Dados): Observable<any> {
    return this.http.get(`http://localhost:3000/alunocarro/carro/${dado.matricula}`).pipe(
      switchMap((resultado: any) => {
        const idcarro = resultado.id;
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
        let putAluno = this.http.put('http://localhost:3000/alunocarro/aluno', reqAluno);
        let putCarro = this.http.put('http://localhost:3000/alunocarro/carro', reqCarro)
        return forkJoin(putAluno, putCarro)
    }))
  }

  deletarDados(matricula: number): Observable<any> {
    return this.http.get(`http://localhost:3000/alunocarro/carro/${matricula}`).pipe(
      switchMap((resultado: any) => {
        let idcarro = resultado.id;
        let deleteCarro = this.http.delete(`http://localhost:3000/alunocarro/carro/${idcarro}`);
        let deleteAluno = this.http.delete(`http://localhost:3000/alunocarro/aluno/${matricula}`);
        return forkJoin(deleteCarro, deleteAluno);
      })
    );
  }
}
