import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpActioncenterComponent } from './pop-up-actioncenter.component';

describe('PopUpActioncenterComponent', () => {
  let component: PopUpActioncenterComponent;
  let fixture: ComponentFixture<PopUpActioncenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUpActioncenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpActioncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
