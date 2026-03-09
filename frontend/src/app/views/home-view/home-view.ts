import { Component } from '@angular/core';
import { SolicitationCard } from '../../solicitation/components/solicitation-card/solicitation-card';

@Component({
  selector: 'app-home-view',
  imports: [SolicitationCard],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {

}
