import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingAccessComponent } from './parking-access.component';

describe('ParkingAccessComponent', () => {
  let component: ParkingAccessComponent;
  let fixture: ComponentFixture<ParkingAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
