import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Funcionario } from '../../../models/funcionario.model';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-funcionario-crud',
  imports: [CommonModule],
  templateUrl: './funcionario-crud.html',
  styleUrl: './funcionario-crud.css',
})
export class FuncionarioCrud implements OnInit {
  funcs = signal<Funcionario[]>([]);
  private router = inject(Router);
  private funcService = inject(FuncionarioService);


  ngOnInit(): void {
    this.funcService.listarTodos().subscribe(data => {
      this.funcs.set(data);
    });
  }


  novoFunc() : void{
    this.router.navigate(['/func/crud-func/new']);
  }

  // filtrarFunc(){
  //   console.log('filtrar funcionário\n')
  // }
  // pica pra próxima fase 

  editarFunc(id: number) : void {
    this.router.navigate(['/func/crud-func/edit', id]);
  }

  removerFunc(id : number) : void {
    this.funcService.remover(id);
    this.funcService.listarTodos().subscribe(
      dados => this.funcs.set(dados)
    )
  }
}
