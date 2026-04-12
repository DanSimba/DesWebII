import { Component } from '@angular/core';
import { SolicitationClient } from '../../presentation/client/solicitation-client/solicitation-card';
import { NavBar } from '../../shared/components/nav-bar/nav-bar';
import { MainContentComponent } from '../../shared/components/main-content/main-content.component';
import { FooterContentComponent } from "../../shared/components/footer-content/footer-content.component";
@Component({
  selector: 'app-home-view',
  imports: [NavBar, MainContentComponent, FooterContentComponent],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {

}
