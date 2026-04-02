import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-solicitation-form-client',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './solicitation-form-client.html',
  styleUrl: './solicitation-form-client.css',
})
export class SolicitationFormClient {
  form! : FormGroup;  
  cats = signal<Categoria[]>([]);
  private catService = inject(CategoriaService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descEquip:  ['', [Validators.required, Validators.maxLength(125)]], //metade de um tweet deve ser o suficiente pra dizer modelo do rolê
      catID:  ['', Validators.required],
      descDefeito:  ['', [Validators.required, Validators.maxLength(255)]]
    });
    this.catService.listarTodos().subscribe(
      data => this.cats.set(data)
    )
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }
    // em algum momento isso daqui vai ir pro back, confia !!!!
      console.log(this.form); 
  }

}
