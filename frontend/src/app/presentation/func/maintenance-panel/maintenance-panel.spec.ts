import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaintenancePanel } from './maintenance-panel';

describe('MaintenancePanel', () => {
  let component: MaintenancePanel;
  let fixture: ComponentFixture<MaintenancePanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenancePanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenancePanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});