import { Component, inject, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';
import { HistoricoItem, Solicitation } from '../../../models/solicitation-interface';
import { SolicitationService } from '../../../services/solicitation.service';

@Component({
  selector: 'app-maintenance-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './maintenance-card.html',
  styleUrl: './maintenance-card.css'
})
export class MaintenanceCard {
  readonly req = input.required<Solicitation>();

  actionClick = output<number>();


  public mostrarHistorico = false;
  public carregandoHistorico = false;
  public historico: HistoricoItem[] = [];
 
  private solicitationService = inject(SolicitationService);
 
  public toggleHistorico(): void {
    this.mostrarHistorico = !this.mostrarHistorico;
 
    // só carrega da API na primeira vez que abre
    if (this.mostrarHistorico && this.historico.length === 0) {
      this.carregandoHistorico = true;
      this.solicitationService.buscarHistorico(this.req().id).subscribe({
        next: (dados) => {
          this.historico = dados;
          this.carregandoHistorico = false;
        },
        error: (err) => {
          console.error('Erro ao carregar histórico', err);
          this.carregandoHistorico = false;
        }
      });
    }
  }

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