import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeView } from './home-view';

describe('HomeView', () => {
  let component: HomeView;
  let fixture: ComponentFixture<HomeView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
