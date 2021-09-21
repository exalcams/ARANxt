import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateLinkComponent } from './date-link.component';

describe('DateLinkComponent', () => {
  let component: DateLinkComponent;
  let fixture: ComponentFixture<DateLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
