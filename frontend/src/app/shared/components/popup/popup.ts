import { Component, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.css',
})
export class Popup {
  readonly text = input.required<string>();
  readonly typePopUp = input.required<'option' | 'ok'>(); //botões sim e não ou somente ok
}
