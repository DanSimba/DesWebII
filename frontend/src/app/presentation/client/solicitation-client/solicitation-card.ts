import { Component, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitation } from '../../../models/solicitation-interface';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-solicitation-card',
  imports: [],
  templateUrl: './solicitation-card.html',
  styleUrl: './solicitation-card.css',
})
export class SolicitationClient {
  router = inject(Router);
  readonly nome = input<string>();
  readonly data = input.required<string>();
  readonly estado = input.required<string>();
  readonly desc = input.required<string>();
  readonly solId = input.required<string>();




  
  openSol(){
    console.log('abriu a sol\n')
    this.router.navigate(['client/view-solicitation/',this.solId()]); 
  }
}
