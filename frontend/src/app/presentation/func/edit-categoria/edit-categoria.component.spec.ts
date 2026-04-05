import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoriaComponent } from './edit-categoria.component';

describe('EditCategoriaComponent', () => {
  let component: EditCategoriaComponent;
  let fixture: ComponentFixture<EditCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCategoriaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
