import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';
import { MaintenanceCard } from '../maintenance-card/maintenance-card';
import { MaintenanceFilterComponent } from '../maintenance-filter/maintenance-filter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-panel',
  standalone: true,
  imports: [CommonModule, MaintenanceCard, MaintenanceFilterComponent],
  templateUrl: './maintenance-panel.html',
  styleUrl: './maintenance-panel.css'
})
export class MaintenancePanel implements OnInit {

  constructor(private router: Router) { }

  public handleAction(id: number): void {
    const requestClicked = this.allRequests.find(req => req.id === id);

    if (!requestClicked) return;

    if (requestClicked.status === 'ABERTA') {
      this.router.navigate(['/func/budget']);
    }
    else if (requestClicked.status === 'APROVADA' || requestClicked.status === 'REDIRECIONADA') {
      alert('Tela "manutenção"');
    }
    else if (requestClicked.status === 'PAGA') {
      const confirmar = confirm('Finalizar a solicitação?');
      if (confirmar) {
        requestClicked.status = 'FINALIZADA';
        alert('Solicitação finalizada');
      }
    }
  }

  public allRequests: MaintenanceRequest[] = [
    { id: 1, dateTime: new Date(), clientName: 'Pessoa 1', description: 'Notebook com Tela Azul', status: 'ABERTA' },
    { id: 2, dateTime: new Date(), clientName: 'Pessoa Dois', description: 'Impressora queimada', status: 'ORÇADA' },
    { id: 3, dateTime: new Date(), clientName: 'Pessoa Pessoa', description: 'Desktop para formatação', status: 'REJEITADA' },
    { id: 4, dateTime: new Date(), clientName: 'Pessoa da Cruz', description: 'Monitor sem video', status: 'APROVADA' },
    { id: 5, dateTime: new Date(), clientName: 'Humano Ferreira', description: 'Teclado travado', status: 'REDIRECIONADA' },
    { id: 6, dateTime: new Date(), clientName: 'Pianismo', description: 'Mouse com scroll defeituoso', status: 'ARRUMADA' },
    { id: 7, dateTime: new Date(), clientName: 'Florentina', description: 'Falta de pasta térmica', status: 'PAGA' }
  ];

  public filteredRequests: MaintenanceRequest[] = [];

  ngOnInit(): void {
    this.filteredRequests = [...this.allRequests];
  }

  public applyFilter(event: { type: string, start: string, end: string }) {
    console.log('Filter applied:', event);

    if (event.type === 'TODAS') {
      this.filteredRequests = [...this.allRequests];
    }
    else if (event.type === 'HOJE' || event.type === 'PERIODO') {
      const startDate = event.start ? new Date(event.start + 'T00:00:00') : new Date(0);
      const endDate = event.end ? new Date(event.end + 'T23:59:59') : new Date('9999-12-31');

      this.filteredRequests = this.allRequests.filter(req => {
        const reqDate = new Date(req.dateTime);
        return reqDate >= startDate && reqDate <= endDate;
      });
    }
  }
}