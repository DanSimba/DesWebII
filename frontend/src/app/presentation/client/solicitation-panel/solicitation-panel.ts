import { Component } from '@angular/core';
import { SolicitationClient } from '../solicitation-client/solicitation-card';
import { Solicitation } from '../../../models/solicitation-interface';

@Component({
  selector: 'app-solicitation-panel',
  imports: [SolicitationClient],
  templateUrl: './solicitation-panel.html',
  styleUrl: './solicitation-panel.css',
})
export class SolicitationPanel {
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
}
