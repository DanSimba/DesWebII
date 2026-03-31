import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFuncionarioComponent } from './new-funcionario.component';

describe('NewFuncionarioComponent', () => {
  let component: NewFuncionarioComponent;
  let fixture: ComponentFixture<NewFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFuncionarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
