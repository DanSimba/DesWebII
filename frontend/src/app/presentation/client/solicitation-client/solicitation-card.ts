import { Component, inject, input, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitation } from '../../../models/solicitation-interface';
import { of, Observable } from 'rxjs';
import { ClientSolicitationService } from '../../../services/client-solicitation-service.service';

@Component({
  selector: 'app-solicitation-card',
  imports: [],
  templateUrl: './solicitation-card.html',
  styleUrl: './solicitation-card.css',
})
export class SolicitationClient {
  router = inject(Router);
  clientSolService = inject(ClientSolicitationService);
  readonly nome = input<string>();
  readonly data = input.required<string>();
  readonly estado = input.required<string>();
  readonly desc = input.required<string>();
  readonly solId = input.required<number>();
  readonly eqp = input.required<string>();

  private sol =  computed<Solicitation>(() => ({
    id: this.solId(),
    equip: this.eqp(),
    data: this.data(),
    est: this.estado(),
    desc: this.desc() 
  }));

  openSol(){
    console.log('abriu a sol\n');
    this.clientSolService.setSol(this.sol());
    this.router.navigate(['client/view-solicitation/',this.solId()]); 
  }
}
