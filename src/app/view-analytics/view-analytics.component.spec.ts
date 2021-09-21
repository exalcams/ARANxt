import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalyticsComponent } from './view-analytics.component';

describe('ViewAnalyticsComponent', () => {
  let component: ViewAnalyticsComponent;
  let fixture: ComponentFixture<ViewAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
