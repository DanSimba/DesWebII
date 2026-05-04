import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-categoria',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.css',
})
export class EditCategoriaComponent implements OnInit {
  private router = inject(Router);
  private f = inject(FormBuilder);
  private catService = inject(CategoriaService);
  private r = inject(ActivatedRoute);
  
  //var de controle pra saber se eu to editanto ou colocando uma nova 
  editando = false; 
  idEditado : number | null = null;

  //famoso forms
  form : FormGroup = this.f.group({
    nome : ['',[Validators.required, Validators.minLength(3)]]
  })  

  ngOnInit(): void {
    const id = this.r.snapshot.paramMap.get('id'); //pra saber se tá editando ou não

    if (id){
      this.editando = true; 
      this.idEditado = Number(id); 

      this.catService.buscarPorId(this.idEditado).subscribe(
        cat => this.form.patchValue({nome : cat?.nome})
      )
    }
    
  }

  onSubmit() : void{
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload : Categoria = {nome : this.form.value.nome};
    //famoso playload pra mandar essa joça pro backend 


    if (this.editando && this.idEditado) {
      this.catService.atualizar(payload, this.idEditado!).subscribe({
        next: () => this.router.navigate(['/func/crud-cat']),
        error: (err) => console.error('erro na atualização', err)
      });

    } else {
      this.catService.inserir(payload).subscribe({
        next: () => this.router.navigate(['/func/crud-cat']),
        error:(err) => console.error("não foi", err)

      })
    }

  }

  cancelar(){
    this.router.navigate(['/func/crud-cat']);

  }
}
