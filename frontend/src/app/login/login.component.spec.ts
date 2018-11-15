import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AngularMaterialModule } from '../angular-material.module';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginButtonEl: DebugElement;
  let clearButtonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        HttpClientModule
      ],
      providers: [LoginService, CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loginButtonEl = fixture.debugElement.query(By.css('.login-button'));
    clearButtonEl = fixture.debugElement.query(By.css('.token-button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a login button with login text', () => {
    expect(loginButtonEl.nativeElement.textContent).toBe('Login');
  });

  it('should call the login method when the login button is clicked', () => {
    spyOn(component, 'onLogin');
    loginButtonEl.triggerEventHandler('click', null);
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should contain a clear token button', () => {
    expect(clearButtonEl.nativeElement.textContent).toBe('Clear Token');
  });

  it('should clear localStorage when the clear button is pressed', () => {
    spyOn(component, 'onClearToken').and.callThrough();
    localStorage.setItem('token', '123');
    clearButtonEl.triggerEventHandler('click', null);
    expect(component.onClearToken).toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
  });

});
