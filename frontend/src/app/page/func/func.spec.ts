import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func } from './func';

describe('Func', () => {
  let component: Func;
  let fixture: ComponentFixture<Func>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Func]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Func);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
