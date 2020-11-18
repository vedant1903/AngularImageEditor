import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpLoginComponent } from './login-otp-component';

describe('ResetPwdComponent', () => {
  let component: OtpLoginComponent;
  let fixture: ComponentFixture<OtpLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
