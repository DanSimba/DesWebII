import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFuncionarioComponent } from './edit-funcionario.component';

describe('EditFuncionarioComponent', () => {
  let component: EditFuncionarioComponent;
  let fixture: ComponentFixture<EditFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFuncionarioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
