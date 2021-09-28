import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasemanagementSignedComponent } from './leasemanagement-signed.component';

describe('LeasemanagementSignedComponent', () => {
  let component: LeasemanagementSignedComponent;
  let fixture: ComponentFixture<LeasemanagementSignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasemanagementSignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasemanagementSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
