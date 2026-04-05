import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup';

@Component({
  selector: 'app-maintenance-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-budget.component.html',
  styleUrl: './maintenance-budget.component.css'
})
export class MaintenanceBudgetComponent implements OnInit {
  public clientName: string = 'Andriele Machado';
  public clientCpf: string = '111.222.333-44';
  public clientEmail: string = 'andriele_machado2006@gmail.com';
  public clientPhone: string = '(41) 99581-7977';
  public clientAddress: string = 'Rua Quitanda, 430 - Colombo/PR';

  public equipmentCategory: string = 'Notebook';
  public equipmentDesc: string = 'Lenovo 2026';
  public maintenanceDesc: string = 'Tela quebrada';

  public partsValue: number | null = null;
  public laborValue: number | null = null;
  public loggedEmployee: string = 'Mário';

  private dialog = inject(Dialog);

  constructor(private location: Location) {}

  ngOnInit(): void {}

  get totalValue(): number {
    return (this.partsValue || 0) + (this.laborValue || 0);
  }

  private abrirPopup(texto: string, tipo: string) {
    return this.dialog.open(Popup, {
      data: { text: texto, typePopUp: tipo }
    });
  }

  public submitBudget(): void {
    if ((this.partsValue !== null && this.partsValue < 0) || (this.laborValue !== null && this.laborValue < 0)) {
      this.abrirPopup('O valor não pode ser negativo', 'ok');
      return;
    }

    if (this.totalValue <= 0) {
      this.abrirPopup('O valor total deve ser maior que zero', 'ok');
      return;
    }
    if (this.totalValue > 99999) {
      this.abrirPopup('Valor inválido!', 'ok');
      return;
    }

    const payloadOrcamento = {
      funcionarioResponsavel: this.loggedEmployee,
      dataHoraRegistro: new Date().toLocaleString('pt-BR'),
      valorPecas: this.partsValue,
      valorMaoDeObra: this.laborValue,
      valorTotal: this.totalValue
    };

    console.log('Orçamento registrado', payloadOrcamento);

    const dialogRef = this.abrirPopup('Orçamento enviado', 'ok');
    dialogRef.closed.subscribe(() => {
      this.location.back();
    });
  }

  public cancel(): void {
    this.location.back();
  }
}