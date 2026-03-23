import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';

@Component({
  selector: 'app-maintenance-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maintenance-card.html',
  styleUrl: './maintenance-card.css'
})
export class MaintenanceCard {
  readonly req = input.required<MaintenanceRequest>();

  public getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      'ABERTA': '#9ca3af', 'ORÇADA': '#78350f', 'REJEITADA': '#ef4444',
      'APROVADA': '#eab308', 'REDIRECIONADA': '#a855f7', 'ARRUMADA': '#3b82f6',
      'PAGA': '#f97316', 'FINALIZADA': '#22c55e'
    };
    return statusColors[status] || '#ccc';
  }
}