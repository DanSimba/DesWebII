import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../models/maintenance-request.model';
import { MaintenanceCard } from '../../presentation/func/maintenance-card/maintenance-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-list-view',
  standalone: true,
  imports: [CommonModule, MaintenanceCard],
  templateUrl: './maintenance-list-view.html',
  styleUrl: './maintenance-list-view.css',
})
export class MaintenanceListView {
  
  public requests: MaintenanceRequest[] = [
    { id: 101, dateTime: new Date(), clientName: 'João Silva', description: 'Notebook tela quebrada', status: 'ABERTA' },
    { id: 102, dateTime: new Date(), clientName: 'Maria Souza', description: 'Impressora não liga e cheira queimado', status: 'ABERTA' },
    { id: 103, dateTime: new Date(), clientName: 'Mário TADS', description: 'Desktop dando Blue Screen ao iniciar', status: 'ABERTA' },
    { id: 104, dateTime: new Date(), clientName: 'Joana Oliveira', description: 'Teclado Mecânico com teclas falhando intermitente', status: 'ABERTA' },
  ];

  constructor(private router: Router) {}

  public startBudget(id: number): void {
    this.router.navigate(['/func/budget']);
  }
}