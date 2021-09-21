import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HvacComponent } from './hvac.component';

describe('HvacComponent', () => {
  let component: HvacComponent;
  let fixture: ComponentFixture<HvacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HvacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HvacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
