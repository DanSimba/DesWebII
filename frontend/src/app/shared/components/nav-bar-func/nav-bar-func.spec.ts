import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarFunc } from './nav-bar-func';

describe('NavBarFunc', () => {
  let component: NavBarFunc;
  let fixture: ComponentFixture<NavBarFunc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarFunc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarFunc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
