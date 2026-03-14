import { Component } from '@angular/core';
import { SolicitationClient } from '../solicitation-client/solicitation-card';

@Component({
  selector: 'app-solicitation-panel',
  imports: [SolicitationClient],
  templateUrl: './solicitation-panel.html',
  styleUrl: './solicitation-panel.css',
})
export class SolicitationPanel {

}
