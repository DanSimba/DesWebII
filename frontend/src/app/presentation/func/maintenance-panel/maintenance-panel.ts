import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';

@Component({
  selector: 'app-maintenance-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-panel.html',
  styleUrl: './maintenance-panel.css'
})
export class MaintenancePanel {
  public filtroAtual: 'HOJE' | 'PERIODO' | 'TODAS' = 'TODAS';
  public dataInicio: string = '';
  public dataFim: string = '';

  public requests: MaintenanceRequest[] = [
    { id: 1, dateTime: new Date(), clientName: 'Pessoa 1', description: 'Notebook com Tela Azul', status: 'ABERTA' },
    { id: 2, dateTime: new Date(), clientName: 'Pessoa Dois', description: 'Impressora  queimada', status: 'ORÇADA' },
    { id: 3, dateTime: new Date(), clientName: 'Pessoa Pessoa', description: 'Desktop para formatação', status: 'REJEITADA' },
    { id: 4, dateTime: new Date(), clientName: 'Pessoa da Cruz', description: 'Monitor sem video', status: 'APROVADA' },
    { id: 5, dateTime: new Date(), clientName: 'Humano Ferreira', description: 'Teclado travado', status: 'REDIRECIONADA' },
    { id: 6, dateTime: new Date(), clientName: 'Pianismo', description: 'Mouse com scroll defeituoso', status: 'ARRUMADA' }
  ];

  public getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      'ABERTA': '#9ca3af', 'ORÇADA': '#78350f', 'REJEITADA': '#ef4444',
      'APROVADA': '#eab308', 'REDIRECIONADA': '#a855f7', 'ARRUMADA': '#3b82f6',
      'PAGA': '#f97316', 'FINALIZADA': '#22c55e'
    };
    return statusColors[status] || '#ccc';
  }

  public setFiltro(tipo: 'HOJE' | 'PERIODO' | 'TODAS'): void {
    this.filtroAtual = tipo;
  }
}