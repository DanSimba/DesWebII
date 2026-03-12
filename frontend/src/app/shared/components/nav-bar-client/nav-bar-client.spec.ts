import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarClient } from './nav-bar-client';

describe('NavBarClient', () => {
  let component: NavBarClient;
  let fixture: ComponentFixture<NavBarClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
