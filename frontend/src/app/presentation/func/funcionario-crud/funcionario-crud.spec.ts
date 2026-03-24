import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioCrud } from './funcionario-crud';

describe('FuncionarioCrud', () => {
  let component: FuncionarioCrud;
  let fixture: ComponentFixture<FuncionarioCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
