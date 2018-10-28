import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  public code: string;
  public accessToken: string;
  public searchParams: URLSearchParams;

  constructor(private loginService: LoginService, private tokenService: TokenService, private cookieService: CookieService) {
    this.searchParams = new URLSearchParams(window.location.href);
    this.accessToken = this.tokenService.getToken();
   }

  ngOnInit() {
    if (!this.accessToken) {
      const accessToken = location.href.split('access_token=')[1];
      this.accessToken = accessToken.substr(0, accessToken.indexOf('&'));
      this.tokenService.setToken(accessToken);
    }
  }

  ngOnChanges() {
    console.log(location.href);
  }

  onLogin() {
    window.location.href = 'http://localhost:8888';
  }

  onRequestToken() {
    this.loginService.requestToken().subscribe(token => {
      console.log('Storing: ' + token);
    });
  }

}
