import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasemanagementComponent } from './leasemanagement.component';

describe('LeasemanagementComponent', () => {
  let component: LeasemanagementComponent;
  let fixture: ComponentFixture<LeasemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
