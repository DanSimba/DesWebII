import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFunc } from './crud-func';

describe('CrudFunc', () => {
  let component: CrudFunc;
  let fixture: ComponentFixture<CrudFunc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudFunc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudFunc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
