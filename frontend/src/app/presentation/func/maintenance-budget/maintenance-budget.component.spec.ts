import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceBudgetComponent } from './maintenance-budget.component';

describe('MaintenanceBudgetComponent', () => {
  let component: MaintenanceBudgetComponent;
  let fixture: ComponentFixture<MaintenanceBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceBudgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
