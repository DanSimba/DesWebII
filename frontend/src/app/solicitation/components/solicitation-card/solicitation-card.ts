import { Component, inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Solicitation } from '../../models/solicitation-interface';

@Component({
  selector: 'app-solicitation-card',
  imports: [],
  templateUrl: './solicitation-card.html',
  styleUrl: './solicitation-card.css',
})
export class SolicitationCard {
  router = inject(Router);
  solId = '01'; //trocar para o campo id da interface dps

  //entrar na sol
  viewSol(){
    this.router.navigate(['solicitation/', this.solId]);
  }
}
