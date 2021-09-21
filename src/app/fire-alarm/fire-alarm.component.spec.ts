import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAlarmComponent } from './fire-alarm.component';

describe('FireAlarmComponent', () => {
  let component: FireAlarmComponent;
  let fixture: ComponentFixture<FireAlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireAlarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
