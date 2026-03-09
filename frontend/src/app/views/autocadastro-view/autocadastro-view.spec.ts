import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocadastroView } from './autocadastro-view';

describe('AutocadastroView', () => {
  let component: AutocadastroView;
  let fixture: ComponentFixture<AutocadastroView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocadastroView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocadastroView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
