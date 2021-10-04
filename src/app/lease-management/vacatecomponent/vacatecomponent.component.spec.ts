import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacatecomponentComponent } from './vacatecomponent.component';

describe('VacatecomponentComponent', () => {
  let component: VacatecomponentComponent;
  let fixture: ComponentFixture<VacatecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacatecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacatecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
