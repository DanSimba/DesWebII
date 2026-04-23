import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';
import { MaintenanceCard } from '../maintenance-card/maintenance-card';
import { MaintenanceFilterComponent } from '../maintenance-filter/maintenance-filter.component';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-maintenance-panel',
  standalone: true,
  imports: [CommonModule, MaintenanceCard, MaintenanceFilterComponent, EmptyStateComponent],
  templateUrl: './maintenance-panel.html',
  styleUrl: './maintenance-panel.css'
})
export class MaintenancePanel implements OnInit {
  private router = inject(Router);
  private dialog = inject(Dialog);

  public loggedEmployee: string = 'Mário';

  public allRequests: MaintenanceRequest[] = [
    { id: 101, dateTime: new Date('2026-03-20T08:30:00'), clientName: 'Lucas Almeida', description: 'Watercooler vazando', status: 'ABERTA' },
    { id: 102, dateTime: new Date('2026-03-21T09:15:00'), clientName: 'Mariana Costa', description: 'Aircooler falhando', status: 'ABERTA' },
    { id: 103, dateTime: new Date('2026-03-21T11:45:00'), clientName: 'Rafael Oliveira', description: 'Monitor com dead pixel', status: 'ORÇADA' },
    { id: 104, dateTime: new Date('2026-03-22T14:20:00'), clientName: 'Beatriz Santos', description: 'GPU com a fan estragada', status: 'APROVADA' },
    { id: 105, dateTime: new Date('2026-03-22T16:00:00'), clientName: 'Gustavo Pereira', description: 'Notebook não reconhece SSD', status: 'REJEITADA' },
    { id: 106, dateTime: new Date('2026-03-23T08:10:00'), clientName: 'Fernanda Rodrigues', description: 'HDD com problema de leitura', status: 'PAGA' },
    { id: 107, dateTime: new Date('2026-03-23T10:30:00'), clientName: 'Henrique Carvalho', description: 'Xbox com ruídos', status: 'FINALIZADA' },
    { id: 108, dateTime: new Date('2026-03-24T09:00:00'), clientName: 'Camila Ferreira', description: 'Placa-mãe sem bateria', status: 'REDIRECIONADA', receivingEmployee: 'Mário' },
    { id: 109, dateTime: new Date('2026-03-24T13:45:00'), clientName: 'Eduardo Gomes', description: 'Teclado falhando', status: 'REDIRECIONADA', receivingEmployee: 'Alex' },
    { id: 110, dateTime: new Date('2026-03-25T11:20:00'), clientName: 'Juliana Martins', description: 'Microfone de mesa com problema no volume', status: 'ARRUMADA' },
    { id: 111, dateTime: new Date('2026-03-25T14:00:00'), clientName: 'Vinícius Barbosa', description: 'Headset com um lado defeituoso', status: 'ABERTA' },
    { id: 112, dateTime: new Date('2026-03-26T10:15:00'), clientName: 'Larissa Rocha', description: 'Placa de vídeo superaquecendo', status: 'ORÇADA' },
    { id: 113, dateTime: new Date('2026-03-26T16:40:00'), clientName: 'Felipe Ribeiro', description: 'Computador reiniciando sozinho', status: 'APROVADA' },
    { id: 114, dateTime: new Date('2026-03-27T08:05:00'), clientName: 'Isabela Alves', description: 'Roteador Wi-Fi sem sinal', status: 'ARRUMADA' },
    { id: 115, dateTime: new Date(), clientName: 'Julia Ferreira', description: 'Notebook com BIOS desconfigurada', status: 'ABERTA' },
    { id: 116, dateTime: new Date('2026-03-28T09:50:00'), clientName: 'Patrícia Teixeira', description: 'PS5 não liga', status: 'FINALIZADA' },
    { id: 117, dateTime: new Date('2026-03-28T14:10:00'), clientName: 'Diego Nascimento', description: 'Impressora impressão falhando', status: 'ABERTA' },
    { id: 118, dateTime: new Date('2026-03-29T10:00:00'), clientName: 'Renata Cardoso', description: 'Monitor com ghosting', status: 'REDIRECIONADA', receivingEmployee: 'Mário' },
    { id: 119, dateTime: new Date('2026-03-29T15:20:00'), clientName: 'Thiago Lopes', description: 'Notebook para necessita de formatação', status: 'REDIRECIONADA', receivingEmployee: 'Glenda' },
    { id: 120, dateTime: new Date(), clientName: 'Ana Pinheiro', description: 'Mouse com scroll estragado', status: 'PAGA' }
  ];

  public filteredRequests: MaintenanceRequest[] = [];
  public baseVisibleRequests: MaintenanceRequest[] = [];

  ngOnInit(): void {
    this.baseVisibleRequests = this.allRequests.filter(req => {
      if (req.status === 'REDIRECIONADA' && req.receivingEmployee !== this.loggedEmployee) {
        return false;
      }
      return true;
    });

    this.baseVisibleRequests.sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

    this.applyFilter({ type: 'ABERTAS', start: '', end: '' });
  }

  public applyFilter(event: { type: string, start: string, end: string }) {
    if (event.type === 'ABERTAS') {
      this.filteredRequests = this.baseVisibleRequests.filter(req => req.status === 'ABERTA');
    }
    else if (event.type === 'TODAS') {
      this.filteredRequests = [...this.baseVisibleRequests];
    }
    else if (event.type === 'HOJE' || event.type === 'PERIODO') {
      const startDate = event.start ? new Date(event.start + 'T00:00:00') : new Date(0);
      const endDate = event.end ? new Date(event.end + 'T23:59:59') : new Date('9999-12-31');

      this.filteredRequests = this.baseVisibleRequests.filter(req => {
        const reqDate = new Date(req.dateTime);
        return reqDate >= startDate && reqDate <= endDate;
      });
    }
  }

  public handleAction(id: number): void {
    const requestClicked = this.allRequests.find(req => req.id === id);
    if (!requestClicked) return;

    if (requestClicked.status === 'ABERTA') {
      this.router.navigate(['/func/budget']);
    }
    else if (requestClicked.status === 'APROVADA' || requestClicked.status === 'REDIRECIONADA') {
      this.router.navigate(['/func/task']);
    }
    else if (requestClicked.status === 'PAGA') {
      const dialogRef = this.dialog.open(Popup, {
        data: { text: 'Deseja finalizar a solicitação?', typePopUp: 'option' }
      });

      dialogRef.closed.subscribe(result => {
        if (result === true) {
          requestClicked.status = 'FINALIZADA';
          this.filteredRequests = [...this.filteredRequests];
          this.dialog.open(Popup, { data: { text: 'Solicitação finalizada', typePopUp: 'ok' } });
        }
      });
    }
  }
}