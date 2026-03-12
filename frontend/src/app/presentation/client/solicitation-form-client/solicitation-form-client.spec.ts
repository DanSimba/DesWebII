import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationFormClient } from './solicitation-form-client';

describe('SolicitationFormClient', () => {
  let component: SolicitationFormClient;
  let fixture: ComponentFixture<SolicitationFormClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitationFormClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationFormClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
