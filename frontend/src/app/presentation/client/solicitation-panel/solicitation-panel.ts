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
export class SolicitationPanel {

  //VERSÃO QUE VAI RECEBER RESPOSTA DO BACK USANDO O SERVICE

  private clientService = inject(ClientService);
  client = signal<ClientInterface|null>(null);
  sols: Solicitation[] = []; //lista de objs do tipo Solicitation q vai retornar

  ngOnInit(): void {
      
      this.clientService.getClient("c12345").subscribe(
        data => {          //O NOME DO CLIENTE PQ A GNT AS INFOS DELE ACESSA DIRETAMENTE PELO OBJ CLIENTE
          this.client.set(data);
          this.sols = data.sols; //FAZ UM REQUEST A MENOS
        });

        //OU 
        /*
        this.clientService.getSols("c12345") //PEGA SÓ A LISTA DE SOLS,    
          .subscribe(sols => {          // MAS AÍ AS SOLS DEVEM CONTER INFO DO CLIENTE
            this.sols = sols;
        });
        */
  }


  //VERSÃO BÁSICA SÓ PRA APARECER NA TELA
  /*
  date = new Date(2025, 5, 24, 10, 30)

  sols: Solicitation[]= [
    {
        id: "1",
        nomeCli: "RAZER",
        equipamento: "compiuter",
        dataHora: `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`,
        estado: "Pendente",
        desc: "moiado"
    },
    {
        id: "2",
        nomeCli: "RAFINHA",
        equipamento: "cerula",
        dataHora: `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`,
        estado: "Concluída",
        desc: "deu pau"
    },
    {
        id: "3",
        nomeCli: "PEDRINHO",
        equipamento: "tablet",
        dataHora: `${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`,
        estado: "Concluída",
        desc: "quebrado"
    },
    
  ]
   */ 
}
