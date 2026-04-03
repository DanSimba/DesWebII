import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { Popup } from '../../../shared/components/popup/popup'; 

@Component({
  selector: 'app-maintenance-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-task.component.html',
  styleUrl: './maintenance-task.component.css'
})
export class MaintenanceTaskComponent implements OnInit {
  public clientName: string = 'Lucas Coelho';
  public clientCpf: string = '444.333.222-11';
  public clientEmail: string = 'lucas2005coelho@hotmail.com';
  public clientPhone: string = '(41) 88522-7291';
  public clientAddress: string = 'Rua Desembargador Floriano, 275 - Curitiba/PR';
  public equipmentCategory: string = 'Impressora';
  public equipmentDesc: string = 'HP 4020';
  public maintenanceDesc: string = 'Falha na impressão';
  public actionReport: string = '';
  public clientGuidelines: string = '';
  public receivingEmployee: string = '';
  public loggedEmployee: string = 'Mário'; 
  private allEmployees: string[] = ['Maria', 'Mário', 'Glenda', 'Alex']; 
  public availableEmployees: string[] = [];

  private dialog = inject(Dialog);

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.availableEmployees = this.allEmployees.filter(emp => emp !== this.loggedEmployee);
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
    if (!this.actionReport) {
      this.abrirPopup('Preencha a descrição da manutenção', 'ok');
      return;
    }
    
    const dialogRef = this.abrirPopup('A manutenção foi registrada', 'ok');
    
    dialogRef.closed.subscribe(() => {
      this.location.back();
    });
  }

  public redirectMaintenance(): void {
    if (!this.receivingEmployee) {
      this.abrirPopup('Informe o nome do funcionário recebedor', 'ok');
      return;
    }

    const dialogRef = this.abrirPopup('A solicitação foi redirecionada', 'ok');
    
    dialogRef.closed.subscribe(() => {
      this.location.back();
    });
  }

  public cancel(): void {
    this.location.back();
  }
}