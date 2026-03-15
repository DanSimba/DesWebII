import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCat } from './crud-cat';

describe('CrudCat', () => {
  let component: CrudCat;
  let fixture: ComponentFixture<CrudCat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudCat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudCat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
