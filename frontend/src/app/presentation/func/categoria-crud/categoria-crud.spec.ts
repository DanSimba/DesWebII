import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCrud } from './categoria-crud';

describe('CategoriaCrud', () => {
  let component: CategoriaCrud;
  let fixture: ComponentFixture<CategoriaCrud>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaCrud]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaCrud);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
