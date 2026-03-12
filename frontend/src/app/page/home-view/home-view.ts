import { Component } from '@angular/core';
import { SolicitationClient } from '../../presentation/client/solicitation-client/solicitation-card';

@Component({
  selector: 'app-home-view',
  imports: [SolicitationClient],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {

}
