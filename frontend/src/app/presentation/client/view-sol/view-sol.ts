import { Component, inject, signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';
import { ClientSolicitationService } from '../../../services/client-solicitation-service.service';
import { Solicitation } from '../../../models/solicitation-interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-view-sol',
  imports: [],
  templateUrl: './view-sol.html',
  styleUrl: './view-sol.css',
})

export class ViewSol{

  private solCard = inject(ClientSolicitationService);
  solData = signal<Solicitation|null>(null);
  ans = '';
  motivo = signal('');

  ngOnInit(){
    //console.log("\nestado: "+ this.est)
    this.solCard.getSol().subscribe({
      next: (data) =>{
        this.solData.set(data);
      }
      ,error: (err)=>{console.error('Erro ao pegar a sol:', err)}
    })
    
    console.log("sol: ", this.solData())
  }

  updtEstado(est: string){
    const currentSol = this.solData(); //passa pra outra const pra evitar que seja null

    if (currentSol) {
      this.solCard.updtEst(est, currentSol.id).subscribe({
        next: (response) => {
          console.log('novo est: ', response);

          //só pra mudar na tela imediatamente
          this.solData.set({
              ...currentSol,
              est: est,
            });
        },
        error: (err) => {console.error('Erro ao atualizar o estado:', err);}
      });
    }
  }

  //ÁREA DO POPUP
  dialog = inject(Dialog); //cria obj 'dialog' (popup)

  protected async openPopup(text: string, type: string): Promise<boolean|string>{ 
    const dialogRef = this.dialog.open<boolean|string>(Popup, {
      data: {
        text: text,
        typePopUp: type
      }
    });

    const result = await firstValueFrom(dialogRef.closed);
    if(typeof result ==='string'){
      this.ans = result;
      console.log("msg (retorna false tbm): ",result);

      //se tem msg ent é rejeição
      const currentSol = this.solData();
      if(currentSol){
        this.solCard.setMotivoRej(result, currentSol.id).subscribe({
                next:(result) => {
                    console.log("msg de rej do back: ", result.motivoRej);
                    this.solData.set(result);
                    this.motivo.set(result.motivoRej);
                }, error: (err) =>{console.error('Erro ao atualizar o estado:', err);}
        })  
      }

      return false;
    }
    if(result){
      console.log("sim!sim!sim! ",result);
      return true;
    } else{
      console.log("não ou ok: ",result);
      return false;
    }
  }
}
