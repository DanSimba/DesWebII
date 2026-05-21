import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceRequest } from '../../../models/maintenance-request.model';
import { MaintenanceCard } from '../maintenance-card/maintenance-card';
import { MaintenanceFilterComponent } from '../maintenance-filter/maintenance-filter.component';
import { Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { SolicitationService } from '../../../services/solicitation.service';
import { AuthService } from '../../../services/auth-service';
import { jwtDecode } from 'jwt-decode';

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
  private solicitationService = inject(SolicitationService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  private funcLoggado: string = '';
  private IdFuncLoggado: number | null = null;
  private filtroAtual = { type: 'ABERTAS', start: '', end: '' };

  public filteredRequests: MaintenanceRequest[] = [];
  public baseVisibleRequests: MaintenanceRequest[] = [];
  public allRequests: MaintenanceRequest[] = []; //eu vou puxar o pé de quem misturou inglês e português no mesmo código, vou churrascar depois

  ngOnInit(): void {
    // const token = this.authService.getToken();
    // if(token){
    //   const decoded: any = jwtDecode(token);
    //   this.funcLoggado = decoded.sub ?? '';
    // } a princiṕioo resolvi no login-form isso aqui 

    this.carregarSolicitacoes();
  }
  
  public applyFilter(event: { type: string, start: string, end: string }) {
    this.filtroAtual = event; // salva o filtro atual
    this.aplicarFiltro();
  }
  
  private aplicarFiltro(){
    const event = this.filtroAtual;
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
      this.router.navigate(['/func/budget', id]);
    }
    else if (requestClicked.status === 'APROVADA' || requestClicked.status === 'REDIRECIONADA') {
      this.router.navigate(['/func/task', id]);
    }
    else if (requestClicked.status === 'PAGA') {
      const dialogRef = this.dialog.open(Popup, {
        data: { text: 'Deseja finalizar a solicitação?', typePopUp: 'opt' }
      });

      dialogRef.closed.subscribe(result => {
        if (result === true) {
          this.solicitationService.finalizarManutencao(id).subscribe({
            next: () => {
              this.carregarSolicitacoes();
              this.dialog.open(Popup, {data: {text: 'Solicitação Finalizada!', typePopUp: 'ok'}});
            },
            error: (err) => console.error('Finalizou não filhão', err)

          });
          // requestClicked.status = 'FINALIZADA';
          // this.filteredRequests = [...this.filteredRequests];
          // this.dialog.open(Popup, { data: { text: 'Solicitação finalizada', typePopUp: 'ok' } });
        }
      });
    }
  }

  // Mapeia estado do backend (sem acento) para o model do frontend
  private mapearEstado(estado: string): MaintenanceRequest['status'] {
    const mapa: Record<string, MaintenanceRequest['status']> = {
      'ABERTA': 'ABERTA',
      'ORCADA': 'ORÇADA',
      'APROVADA': 'APROVADA',
      'REJEITADA': 'REJEITADA',
      'REDIRECIONADA': 'REDIRECIONADA',
      'ARRUMADA': 'ARRUMADA',
      'PAGA': 'PAGA',
      'FINALIZADA': 'FINALIZADA',
    };
    return mapa[estado] ?? 'ABERTA';
  }

  carregarSolicitacoes() : void{
    this.solicitationService.listarTodos().subscribe({
      next: (dados) => {
        this.allRequests = dados.map( s => ({
          id: s.id,
          dateTime: new Date(s.data),
          clientName: s.nomeCliente ?? 'Cliente',
          description: s.equip,
          status: this.mapearEstado(s.est),
          receivingEmployee: undefined,
        }));
        this.baseVisibleRequests = [ ...this.allRequests].sort(
          (a,b) => a.dateTime.getTime() - b.dateTime.getTime()
        );
        this.aplicarFiltro();
        this.cdr.detectChanges();
      },
      error: (err) =>  {
        console.error('Erro no carregar', err);
      }
    });
  }
}