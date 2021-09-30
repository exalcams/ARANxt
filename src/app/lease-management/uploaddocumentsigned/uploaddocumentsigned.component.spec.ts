import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddocumentsignedComponent } from './uploaddocumentsigned.component';

describe('UploaddocumentsignedComponent', () => {
  let component: UploaddocumentsignedComponent;
  let fixture: ComponentFixture<UploaddocumentsignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddocumentsignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddocumentsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
