import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';
import { Solicitation } from '../../../models/solicitation-interface';
import { ActivatedRoute } from '@angular/router';
import { SolicitationService } from '../../../services/solicitation.service';

@Component({
  selector: 'app-maintenance-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-budget.component.html',
  styleUrl: './maintenance-budget.component.css'
})
export class MaintenanceBudgetComponent implements OnInit {
  public solicitacao : Solicitation | null = null;
  
  public precoPeca: number | null = null;
  public maoDeObra: number | null = null; 

  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private solicitationService = inject(SolicitationService);

  constructor(private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.solicitationService.buscarPorId(id).subscribe({
        next: (dados) => {
          this.solicitacao = dados;
        },
        error: (err) => {
          console.error('Veio solicitação nenhuma campeão', err);
        }

      });
    }
  }

  get valorTotal(): number {
    return (this.precoPeca || 0) + (this.maoDeObra || 0);
  }

  private abrirPopup(texto: string, tipo: string) {
    return this.dialog.open(Popup, {
      data: { text: texto, typePopUp: tipo }
    });
  }

  public submitBudget(): void {
    if(!this.solicitacao)return; 

    //campos de validação dessa bomba
    if ((this.precoPeca !== null && this.precoPeca < 0) || (this.maoDeObra !== null && this.maoDeObra < 0)) {
      this.abrirPopup('O valor não pode ser negativo', 'ok');
      return;
    }

    if (this.valorTotal <= 0) {
      this.abrirPopup('O valor total deve ser maior que zero', 'ok');
      return;
    }
    if (this.valorTotal > 99999) {
      this.abrirPopup('Valor inválido!', 'ok');
      return;
    }


    const payloadOrcamento = { valorOrcamento: this.valorTotal, est: 'ORCADA'};
    this.solicitationService.registrarOrcamento(this.solicitacao.id, payloadOrcamento).subscribe({
      next: () => {
        const dialogRef = this.abrirPopup('Orçamento enviado', 'ok');
        dialogRef.closed.subscribe(() => this.location.back());

      },
      error: (err) => {
        console.error('Foi não amor', err);
        this.abrirPopup('Erro ao enviar o orçamento', 'ok');
      }
    });
  }

  public cancel(): void {
    this.location.back();
  }
}