import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { Solicitation } from '../../../models/solicitation-interface';
import { Popup } from '../../../shared/components/popup/popup';
import { firstValueFrom } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { ClientService } from '../../../services/client-service';

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
  private clientService = inject(ClientService);
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
      let idString = new Date();
      let dateString = `${idString.getDate()+1}/${idString.getMonth()+1}/${idString.getFullYear()}`
      const sol: Solicitation={
        id: idString.toString(),
        equipamento: this.form.value.value,
        dataHora: dateString,
        estado: 'aberta',
        desc: this.form.value.descDefeito,
      }

      this.clientService.addSol(sol);
      this.form.reset();
  }

   //ÁREA DO POPUP
  dialog = inject(Dialog); //cria obj 'dialog' (popup)

  protected async openPopup(text: string, type: string): Promise<boolean>{ 
    const dialogRef = this.dialog.open<boolean>(Popup, {
      data: {
        text: text,
        typePopUp: type
      }
    });

    const result = await firstValueFrom(dialogRef.closed);
    if(result){
      console.log("sim!sim!sim!");
      return true;
    } else{
      console.log("não ou ok");
      return false;
    }
  }

}
