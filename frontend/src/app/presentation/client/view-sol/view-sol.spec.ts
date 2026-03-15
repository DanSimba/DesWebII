import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSol } from './view-sol';

describe('ViewSol', () => {
  let component: ViewSol;
  let fixture: ComponentFixture<ViewSol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
