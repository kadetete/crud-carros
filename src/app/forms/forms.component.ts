import { Component, OnInit} from '@angular/core';
import { Dados } from '../dados';
import { Router } from '@angular/router';
import { DadosService } from '../dados.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit{
  dado: Dados = {modelo: '', marca: '', ano: '', nome: '', matricula: '', codigo: '', cnh: ''};
  matriculas: any[] = [];

  constructor(private dadosService: DadosService, private router: Router) {

  }

  ngOnInit(): void {
    this.dadosService.getMatriculas().subscribe({
      next: (resultado: any) => (this.matriculas = resultado),
      error: (erro: any) => console.log(erro)
    });
  }

  addDados() {
    let num = 0
    while (num <= this.matriculas.length) {
      if (this.dado.matricula === this.matriculas[num]) {
        this.dadosService.editarDados(this.dado).subscribe({});
        return 'Editado';
      }
      num++
    }
    this.dadosService.addDados(this.dado).subscribe({});
    this.dado = {modelo: '', marca: '', ano: '', nome: '', matricula: '', codigo: '', cnh: ''};
    this.router.navigate(['/lista']);
    return 'Adicionado';
  }

}

