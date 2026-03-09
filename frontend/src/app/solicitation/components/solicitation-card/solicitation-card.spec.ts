import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationCard } from './solicitation-card';

describe('SolicitationCard', () => {
  let component: SolicitationCard;
  let fixture: ComponentFixture<SolicitationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitationCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
