import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractLinkComponent } from './contract-link.component';

describe('ContractLinkComponent', () => {
  let component: ContractLinkComponent;
  let fixture: ComponentFixture<ContractLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
