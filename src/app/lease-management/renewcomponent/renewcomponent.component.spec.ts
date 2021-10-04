import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewcomponentComponent } from './renewcomponent.component';

describe('RenewcomponentComponent', () => {
  let component: RenewcomponentComponent;
  let fixture: ComponentFixture<RenewcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
