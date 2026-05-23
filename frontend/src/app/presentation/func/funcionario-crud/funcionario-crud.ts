import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Funcionario } from '../../../models/funcionario.model';
import { Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatIcon } from '@angular/material/icon';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';

@Component({
  selector: 'app-funcionario-crud',
  imports: [CommonModule, MatIcon],
  templateUrl: './funcionario-crud.html',
  styleUrl: './funcionario-crud.css',
})
export class FuncionarioCrud implements OnInit {
  funcs = signal<Funcionario[]>([]);
  private router = inject(Router);
  private funcService = inject(FuncionarioService);
  private dialog = inject(Dialog);


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
    const ref = this.dialog.open( Popup, {
      data : {
        text: 'Deseja remover este funcionário?',
        typePopUp: 'opt'
      }
    });

    ref.closed.subscribe(check => {
      if(!check) return; 

      this.funcService.remover(id).subscribe({
        next: () => {this.funcService.listarTodos().subscribe(
          data => this.funcs.set(data)
        )},
        error: (err) => console.log("não rolou", err)
      })
    }

    )
    
  
  }
}
