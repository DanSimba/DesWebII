import { Component, inject, signal } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'; 

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  private data = inject(DIALOG_DATA);
  readonly text = signal(this.data.text);
  readonly typePopUp = signal(this.data.typePopUp); //botões sim e não ou somente ok

  ans = signal('');

  public dialogRef = inject(DialogRef);
  close(value: boolean|string) { //o SIM e o OK retornam true, o NÃO retorna false
    console.log("ans:",this.ans())
    if(this.ans()) value = this.ans();
    this.dialogRef.close(value);
  }
}
