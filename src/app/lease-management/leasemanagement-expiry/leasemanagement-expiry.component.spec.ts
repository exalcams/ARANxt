import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasemanagementExpiryComponent } from './leasemanagement-expiry.component';

describe('LeasemanagementExpiryComponent', () => {
  let component: LeasemanagementExpiryComponent;
  let fixture: ComponentFixture<LeasemanagementExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasemanagementExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasemanagementExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
