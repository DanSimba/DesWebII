import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioComponent } from './relatorio/relatorio.component';

describe('RelatorioComponent', () => {
  let component: RelatorioComponent;
  let fixture: ComponentFixture<RelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
