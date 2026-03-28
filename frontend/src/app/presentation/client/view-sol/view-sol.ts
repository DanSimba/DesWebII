import { Component, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';

@Component({
  selector: 'app-view-sol',
  imports: [],
  templateUrl: './view-sol.html',
  styleUrl: './view-sol.css',
})

export class ViewSol {

  est="redirecionada";

  dialog = inject(Dialog); //cria obj 'dialog' (popup)
  protected openPopup(text: string, type: string){ 
    const dialogRef = this.dialog.open(Popup, {
      data: {
        text: text,
        typePopUp: type
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result === true) {
        console.log('SIM ou OK');
        this.est = "aprovada";
      } else {
        console.log('NAOR');
      }
    });
  }
}
