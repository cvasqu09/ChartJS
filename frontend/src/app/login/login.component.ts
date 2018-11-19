import { Component, OnInit, OnChanges } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { LoginService } from '../services/login.service';
import { TokenService } from '../services/token.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnChanges {
  public accessToken: string;
  public searchParams: URLSearchParams;

  constructor(private loginService: LoginService, private tokenService: TokenService, private cookieService: CookieService) {
    this.searchParams = new URLSearchParams(window.location.href);
   }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      if (location.href.includes('access_token')) {
        const fullAccessToken = location.href.split('access_token=')[1];
        this.accessToken = fullAccessToken.substr(0, fullAccessToken.indexOf('&'));
        this.tokenService.setToken(this.accessToken);
      } else {
        this.accessToken = '';
        this.tokenService.setToken('');
      }

    } else {
      this.accessToken = localStorage.getItem('token');
    }
  }

  ngOnChanges() {
    console.log(location.href);
  }

  onLogin(): void {
    window.location.href = 'http://localhost:8888';
  }

  onRequestToken() {
    this.loginService.requestToken().subscribe(token => {
      console.log('Storing: ' + token);
    });
  }

  onClearToken(): void {
    localStorage.removeItem('token');
  }

}
