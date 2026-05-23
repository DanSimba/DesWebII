import { Component, input, output } from '@angular/core';
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

  actionClick = output<number>();

  public getStatusColor(status: string): string {
    const statusColors: Record<string, string> = {
      'ABERTA': 'var(--ABERTA)', 
      'ORÇADA': 'var(--ORCADA)', 
      'REJEITADA': 'var(--REJEITADA)',
      'APROVADA': 'var(--APROVADA)', 
      'REDIRECIONADA': 'var(--REDIRECIONADA)', 
      'ARRUMADA': 'var(--ARRUMADA)',
      'PAGA': 'var(--PAGA)', 
      'FINALIZADA': 'var(--FINALIZADA)'
    };
    return statusColors[status] || 'var(--aberta)';
  }

  onActionClick() {
    this.actionClick.emit(this.req().id);
  }
}