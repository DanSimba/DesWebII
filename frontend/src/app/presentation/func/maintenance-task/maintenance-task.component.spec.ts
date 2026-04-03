import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTaskComponent } from './maintenance-task.component';

describe('MaintenanceTaskComponent', () => {
  let component: MaintenanceTaskComponent;
  let fixture: ComponentFixture<MaintenanceTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceTaskComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
