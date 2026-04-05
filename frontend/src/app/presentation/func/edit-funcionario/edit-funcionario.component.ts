import { Component, inject, OnInit, signal } from '@angular/core';
import { Funcionario } from '../../../models/funcionario.model';
import { Observable, of, map } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-funcionario',
  imports: [CommonModule, ReactiveFormsModule],
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
    funcName : ['', [Validators.required, Validators.minLength(3)]],
    funcCargo : ['', [Validators.required, Validators.minLength(3)]]
  })


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if(id){
      this.editando = true;
      this.idEditado = Number(id);

      this.funcService.buscarPorId(this.idEditado).subscribe(
        fun => this.form.patchValue({
          funcName : fun?.funcName,
          funcCargo : fun?.funcCargo
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
      const atualizada : Funcionario = {id: this.idEditado, ...this.form.value};
      this.funcService.atualizar(atualizada);
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
