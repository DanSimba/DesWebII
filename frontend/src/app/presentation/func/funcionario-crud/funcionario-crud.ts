import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionario-crud',
  imports: [CommonModule],
  templateUrl: './funcionario-crud.html',
  styleUrl: './funcionario-crud.css',
})
export class FuncionarioCrud {
  funcionarios = [
    {
      id: 1,
      nome: 'Razer'
    },
    {
      id: 2,
      nome: 'Alex'
    },
    {
      id: 3,
      nome: 'Savio'
    },
    {
      id: 4,
      nome: 'Glenda'
    },
    {
      id: 5,
      nome: 'Ana Beatriz'
    },
    {
      id: 6,
      nome: 'Silvana'
    }
  ];

  novoFunc(){
    console.log('insertar novo funcionário\n')
  }

  filtrarFunc(){
    console.log('filtrar funcionário\n')
  }

  editarFunc() {
    console.log('editar funcionário\n') 
  }

  removerFunc() {
    console.log('remover funcionário\n')
  }
}
