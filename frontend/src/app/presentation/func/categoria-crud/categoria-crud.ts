import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-categoria-crud',
  imports: [CommonModule, RouterLink],
  templateUrl: './categoria-crud.html',
  styleUrl: './categoria-crud.css',
})
export class CategoriaCrud {
  constructor(public router: Router){};
  categorias = [
    {
      id: 1,
      nome: 'Notebook'
    },
    {
      id: 2,
      nome: 'Monitor'
    },
    {
      id: 3,
      nome: 'Impressora'
    },
    {
      id: 4,
      nome: 'Teclado'
    },
    {
      id: 5,
      nome: 'Desktop'
    },
    {
      id: 6,
      nome: 'Mouse'
    }
  ];

  novaCat(){
    console.log('insertar nova categoria\n')
  }

  filtrarCat(){
    console.log('filtrar categoria\n')
  }

  editarCat() {
    this.router.navigate(['/func/edit']);
  }

  removerCat() {
    console.log('remover categoria\n')
  }
}
