import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasemanagementVacatedComponent } from './leasemanagement-vacated.component';

describe('LeasemanagementVacatedComponent', () => {
  let component: LeasemanagementVacatedComponent;
  let fixture: ComponentFixture<LeasemanagementVacatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasemanagementVacatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasemanagementVacatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
