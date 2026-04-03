import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-maintenance-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maintenance-filter.component.html',
  styleUrl: './maintenance-filter.component.css'
})
export class MaintenanceFilterComponent {
  public startDate: string = '';
  public endDate: string = '';
  public activeFilter: 'ABERTAS' | 'HOJE' | 'TODAS' | 'PERIODO' = 'ABERTAS'; 

  filterChanged = output<{ type: string, start: string, end: string }>();

  public setOpen(): void {
    this.startDate = '';
    this.endDate = '';
    this.activeFilter = 'ABERTAS';
    this.emitFilter();
  }

  public setToday(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const todayLocal = `${year}-${month}-${day}`; 

    this.startDate = todayLocal;
    this.endDate = todayLocal;
    this.activeFilter = 'HOJE';
    this.emitFilter();
  }

  public setAll(): void {
    this.startDate = '';
    this.endDate = '';
    this.activeFilter = 'TODAS';
    this.emitFilter();
  }

  public onDateSelected(): void {
    this.activeFilter = 'PERIODO';
    if (this.startDate && this.endDate) {
      this.emitFilter();
    }
  }

  private emitFilter(): void {
    this.filterChanged.emit({
      type: this.activeFilter,
      start: this.startDate,
      end: this.endDate
    });
  }
}