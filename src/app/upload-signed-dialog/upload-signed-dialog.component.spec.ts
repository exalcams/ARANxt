import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSignedDialogComponent } from './upload-signed-dialog.component';

describe('UploadSignedDialogComponent', () => {
  let component: UploadSignedDialogComponent;
  let fixture: ComponentFixture<UploadSignedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSignedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSignedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
