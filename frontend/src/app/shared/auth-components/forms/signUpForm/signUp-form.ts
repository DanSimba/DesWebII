import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'signUp-form',
  imports: [MatIconModule, NgxMaskDirective, NgxMaskPipe],
  standalone: true,
  templateUrl: './signUp-form.html'
})
export class SignUpForm {

}
