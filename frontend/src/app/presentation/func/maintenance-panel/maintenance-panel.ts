import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';

@Component({
  selector: 'app-maintenance-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-8 border-2 border-(--parrot-pink) rounded-xl bg-white text-center">
      <h2 class="text-xl font-bold text-(--french-puce) uppercase">
        Painel de Manutenção
      </h2>
      <p class="text-sm text-gray-400">Aguardando implementação da lista geral.</p>
    </div>
  `
})
export class MaintenancePanel {
  public requests: MaintenanceRequest[] = [];
  public currentFilter: string = 'TODAS';

  constructor() {}

  public getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      'ABERTA': '#9ca3af', 'ORÇADA': '#78350f', 'REJEITADA': '#ef4444',
      'APROVADA': '#eab308', 'REDIRECIONADA': '#a855f7', 'ARRUMADA': '#3b82f6',
      'PAGA': '#f97316', 'FINALIZADA': '#22c55e'
    };
    return statusColors[status] || '#ccc';
  }
}