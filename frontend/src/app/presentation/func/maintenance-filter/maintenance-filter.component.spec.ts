import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceFilterComponent } from './maintenance-filter.component';

describe('MaintenanceFilterComponent', () => {
  let component: MaintenanceFilterComponent;
  let fixture: ComponentFixture<MaintenanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
