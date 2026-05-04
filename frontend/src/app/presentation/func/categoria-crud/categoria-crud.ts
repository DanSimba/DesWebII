import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';

@Component({
  selector: 'app-categoria-crud',
  imports: [CommonModule],
  templateUrl: './categoria-crud.html',
  styleUrl: './categoria-crud.css',
})

export class CategoriaCrud implements OnInit {
  private router = inject(Router);
  private catService = inject(CategoriaService);
  cats = signal<Categoria[]>([]);
  private dialog = inject(Dialog);


  ngOnInit(): void {
    this.catService.listarTodos().subscribe(
      data => this.cats.set(data)
    )
  }


  novaCat(){
    this.router.navigate(['/func/crud-cat/new']);
  }

  editarCat(id : number) : void{
    console.log('editarCat chamado com id:', id);
    this.router.navigate(['/func/crud-cat/edit', id]);
  }

  removerCat(id : number) : void{   
    const ref = this.dialog.open( Popup, {
      data : {
        text: 'Deseja remover esta categoria?',
        typePopUp: 'opt'
      }
    });
    
    ref.closed.subscribe(check => {
      if(!check) return;

      this.catService.remover(id).subscribe({
        next: () => {this.catService.listarTodos().subscribe(
          data => this.cats.set(data)
        )},
        error: (err) => console.log("não foi", err)      
      })
    })
    
    
  }
}
