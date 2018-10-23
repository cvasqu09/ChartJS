import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { HttpClient } from 'selenium-webdriver/http';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  public code: string;
  public accessToken: string;
  public searchParams: URLSearchParams;

  constructor(private loginService: LoginService) {
    this.searchParams = new URLSearchParams(window.location.href);
   }

  ngOnInit() {
    const codeParameter = location.href.split('access_token=')[1];
    this.code = codeParameter.substr(0, codeParameter.indexOf('&'));

    console.log(this.accessToken);
  }

  ngOnChanges() {
    console.log(location.href);
  }

  onLogin() {
    window.location.href = 'http://localhost:8888';
  }

  onRequestToken() {
    this.loginService.requestToken().subscribe(token => {
      console.log(token);
    });
  }

}
