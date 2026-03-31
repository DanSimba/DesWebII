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
  public activeFilter: 'HOJE' | 'TODAS' | 'PERIODO' = 'TODAS'; 

  filterChanged = output<{ type: string, start: string, end: string }>();

  public setToday(): void {
    const today = new Date().toISOString().split('T')[0];
    this.startDate = today;
    this.endDate = today;
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
    this.emitFilter();
  }

  private emitFilter(): void {
    this.filterChanged.emit({
      type: this.activeFilter,
      start: this.startDate,
      end: this.endDate
    });
  }
}