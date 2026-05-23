import { Component, inject, signal, OnInit } from '@angular/core';
import { SolicitationClient } from '../solicitation-client/solicitation-card';
import { ClientService } from '../../../services/client-service';
import { Solicitation } from '../../../models/solicitation-interface';
import { ClientInterface } from '../../../models/client-interface';

@Component({
  selector: 'app-solicitation-panel',
  imports: [SolicitationClient],
  templateUrl: './solicitation-panel.html',
  styleUrl: './solicitation-panel.css',
})
export class SolicitationPanel implements OnInit {

  private clientService = inject(ClientService);
  client = signal<ClientInterface|null>(null);
  sols= signal<Solicitation[]>([]); //lista de objs do tipo Solicitation q vai retornar
  createdSols= signal<Solicitation[]>([]);

  ngOnInit(): void {
      
      this.clientService.getMe().subscribe(
        data => {          //O NOME DO CLIENTE PQ A GNT PEGA AS INFOS DELE ACESSA DIRETAMENTE PELO OBJ CLIENTE
          console.log(data);
          this.client.set(data);
          this.sols.set(data.sols); 
        });
  }
}
