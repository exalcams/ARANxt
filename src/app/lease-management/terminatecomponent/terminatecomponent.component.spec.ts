import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminatecomponentComponent } from './terminatecomponent.component';

describe('TerminatecomponentComponent', () => {
  let component: TerminatecomponentComponent;
  let fixture: ComponentFixture<TerminatecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminatecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminatecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
