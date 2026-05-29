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
import { Solicitation } from '../../../models/solicitation-interface';

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

  public filteredRequests: Solicitation[] = [];
  public baseVisibleRequests: Solicitation[] = [];
  public allRequests: Solicitation[] = []; //eu vou puxar o pé de quem misturou inglês e português no mesmo código, vou churrascar depois

  ngOnInit(): void {
    const token = this.authService.getToken();
    if(token){
      const decoded: any = jwtDecode(token);
      this.funcLoggado = decoded.sub ?? '';}
    //  a princiṕioo resolvi no login-form isso aqui 

    this.carregarSolicitacoes();
  }
  
  public applyFilter(event: { type: string, start: string, end: string }) {
    this.filtroAtual = event; // salva o filtro atual
    this.aplicarFiltro();
  }
  
  private aplicarFiltro(){
    const event = this.filtroAtual;
    if (event.type === 'ABERTAS') {
      this.filteredRequests = this.baseVisibleRequests.filter(req => req.est === 'ABERTA');
    }
    else if (event.type === 'TODAS') {
      this.filteredRequests = [...this.baseVisibleRequests];
    }
    else if (event.type === 'HOJE' || event.type === 'PERIODO') {
      const startDate = event.start ? new Date(event.start + 'T00:00:00') : new Date(0);
      const endDate = event.end ? new Date(event.end + 'T23:59:59') : new Date('9999-12-31');

      this.filteredRequests = this.baseVisibleRequests.filter(req => {
        const reqDate = new Date(req.data);
        return reqDate >= startDate && reqDate <= endDate;
      });
    }

  }

  public handleAction(id: number): void {
    const requestClicked = this.allRequests.find(req => req.id === id);
    if (!requestClicked) return;

    if (requestClicked.est === 'ABERTA') {
      this.router.navigate(['/func/budget', id]);
    }
    else if (requestClicked.est === 'APROVADA' || requestClicked.est === 'REDIRECIONADA') {
      this.router.navigate(['/func/task', id]);
    }
    else if (requestClicked.est === 'PAGA') {
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


  carregarSolicitacoes() : void{
    this.solicitationService.listarTodos().subscribe({
      next: (dados) => {
        this.allRequests = dados;
        this.baseVisibleRequests = [ ...this.allRequests].sort(
          (a,b) => new Date(a.data).getTime() - new Date(b.data).getTime())
          .filter( req => {
            if(req.est === 'REDIRECIONADA'){
              return req.idFuncDestino === this.IdFuncLoggado;
            }
            return true;
          });
        this.aplicarFiltro();
        this.cdr.detectChanges();
      },
      error: (err) =>  {
        console.error('Erro no carregar', err);
      }
    });
  }
}