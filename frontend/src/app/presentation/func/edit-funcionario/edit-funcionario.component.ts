import { Component, inject, OnInit, signal } from '@angular/core';
import { Funcionario } from '../../../models/funcionario.model';
import { Observable, of, map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-funcionario',
  imports: [CommonModule, ReactiveFormsModule,MatIcon],
  templateUrl: './edit-funcionario.component.html',
  styleUrl: './edit-funcionario.component.css',
})
export class EditFuncionarioComponent implements OnInit{
  private funcService = inject(FuncionarioService);
  private f = inject(FormBuilder);

  //para rotas 
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //vars de controle para edição e novo funcionário 
  editando = false; 
  idEditado : number | null = null;

  form : FormGroup = this.f.group ({
    nome : ['', [Validators.required, Validators.minLength(3)]],
    cargo : ['', [Validators.required, Validators.minLength(3)]],
    dataNascimento : ['', [Validators.required, Validators.minLength(3)]]
  })


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if(id){
      this.editando = true;
      this.idEditado = Number(id);

      this.funcService.buscarPorId(this.idEditado).subscribe(
        fun => this.form.patchValue({
          nome : fun?.nome,
          cargo : fun?.cargoFuncionario,
          dataNascimento : fun?.dataNascimento
        })
      )
    }  
   } 


  onSubmit() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return; 
    }
    
    if (this.editando && this.idEditado) {
      const playload : Funcionario = {id: this.idEditado, ...this.form.value}; //quase um playload q tem no edit-cat vamo ve se roda
      this.funcService.atualizar(this.idEditado!, playload);
    } else {
      console.log(this.form.value); 
      this.funcService.inserir(this.form.value);
    }
    
    this.router.navigate(['/func/crud-func']);
  }


  cancelar() {
    this.router.navigate(['/func/crud-func'])  
  }


}
