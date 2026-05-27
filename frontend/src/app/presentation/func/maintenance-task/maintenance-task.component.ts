import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup'; 
import { Solicitation } from '../../../models/solicitation-interface';
import { Funcionario } from '../../../models/funcionario.model';
import { ActivatedRoute } from '@angular/router';
import { SolicitationService } from '../../../services/solicitation.service';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-maintenance-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-task.component.html',
  styleUrl: './maintenance-task.component.css'
})
export class MaintenanceTaskComponent implements OnInit {
  public solicitacao : Solicitation | null = null;
  public actionReport : String = '';
  public clientGuidelines : String = '';
  public receivingEmployeeId : number | null = null; //eu vou churrascar quem escolheu esses nomes e me fadou a eterna sian de carregá-los por preguiça de mudar em 15 partes do projeto
  public availableEmployees : Funcionario[] = [];

  private solicitacaoId : number | null =  null; 
  private dialog = inject(Dialog);
  private route = inject(ActivatedRoute);
  private solicitationService = inject(SolicitationService);
  private funcService = inject(FuncionarioService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.solicitacaoId = id;
      this.carregarSolicitacao(id);
      this.carregarFuncionarios();
    }
  }



  private carregarSolicitacao(id: number) : void {
    this.solicitationService.buscarPorId(id).subscribe({
      next: (dados) =>{ this.solicitacao = dados; this.cdr.detectChanges(); },
      error: (err) => console.error('não carregou mozão', err)
    });
  }

  private carregarFuncionarios() {
    this.funcService.listarTodos().subscribe({
      next: (func) => this.availableEmployees = func,
      error: (err) => console.error('tem ngm nesse quiosque', err)  
    });
  }

  private abrirPopup(texto: string, tipo: string) {
    return this.dialog.open(Popup, {
      data: {
        text: texto,
        typePopUp: tipo
      }
    });
  }

  public performMaintenance(): void {
    if (!this.actionReport.trim()) {
      this.abrirPopup('Preencha a descrição da manutenção', 'ok');
      return;
    }
    if (!this.clientGuidelines.trim()) {
      this.abrirPopup('Preencha as orientações ao cliente', 'ok');
      return;
    }

    this.solicitationService.efetuarManutencao(this.solicitacaoId!,this.clientGuidelines)
      .subscribe({
        next: () => {
          const ref = this.abrirPopup('Manutenção registrada com sucesso!', 'ok');
          ref.closed.subscribe(()=> this.location.back());
        },
        error: (err) => console.error('erro no registro da manutenção', err)
    });
    
  }

  public redirectMaintenance(): void {
    if (!this.receivingEmployeeId) {
      this.abrirPopup('Informe o nome do funcionário recebedor', 'ok');
      return;
    }

    this.solicitationService.redirecionarManutencao(this.solicitacaoId!, this.receivingEmployeeId)
      .subscribe({
        next:() => {
          const ref = this.abrirPopup('Manutenção redirecionada', 'ok');
          ref.closed.subscribe(() => this.location.back());
        },
        error: (err) => console.error('Erro no redirecionar amor', err)
    });
  }

  public cancel(): void {
    this.location.back();
  }
}