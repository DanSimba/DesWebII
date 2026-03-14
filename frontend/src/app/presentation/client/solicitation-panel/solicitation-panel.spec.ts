import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationPanel } from './solicitation-panel';

describe('SolicitationPanel', () => {
  let component: SolicitationPanel;
  let fixture: ComponentFixture<SolicitationPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitationPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
