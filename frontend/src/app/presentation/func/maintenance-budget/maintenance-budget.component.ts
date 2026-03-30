import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-maintenance-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-budget.component.html',
  styleUrl: './maintenance-budget.component.css'
})
export class MaintenanceBudgetComponent implements OnInit {
  //Temporário! vai puxar do back dps
  public clientName: string = 'Keromi Kawaii 2007';
  public equipmentDesc: string = 'Placa-mãe';
  public maintenanceDesc: string = 'Trocar a bateria';

  public partsValue: number | null = null;
  public laborValue: number | null = null;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  get totalValue(): number {
    return (this.partsValue || 0) + (this.laborValue || 0);
  }

  public submitBudget(): void {
    alert('Status alterado para "orçada".');
    this.location.back();
  }

  public cancel(): void {
    this.location.back();
  }
}