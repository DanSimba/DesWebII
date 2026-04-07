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

  ngOnInit(){
    //console.log("\nestado: "+ this.est)
    this.solCard.getSol().subscribe(
      data => {
        this.solData.set(data);
      }
    )
    console.log("sol: ", this.solData())
  }

  updtEstado(est: string){
    this.solData.update(data => {
          if (!data) return null;
          return {
            ...data,   //OUTROS CAMPOS
            estado: est
          };
    });
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
