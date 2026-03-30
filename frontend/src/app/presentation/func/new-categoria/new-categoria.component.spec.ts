import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoriaComponent } from './new-categoria.component';

describe('NewCategoriaComponent', () => {
  let component: NewCategoriaComponent;
  let fixture: ComponentFixture<NewCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCategoriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
