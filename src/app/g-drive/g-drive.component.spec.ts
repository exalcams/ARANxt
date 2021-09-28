import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GDriveComponent } from './g-drive.component';

describe('GDriveComponent', () => {
  let component: GDriveComponent;
  let fixture: ComponentFixture<GDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
