import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Popup } from './popup';

describe('Popup', () => {
  let component: Popup;
  let fixture: ComponentFixture<Popup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Popup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
