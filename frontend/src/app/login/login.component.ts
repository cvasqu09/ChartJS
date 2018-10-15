import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  public accessToken: string;
  public searchParams: URLSearchParams;
  constructor() {
    this.searchParams = new URLSearchParams(window.location.href);
   }

  ngOnInit() {
    this.accessToken = location.href.split('code=')[1];
    console.log(this.accessToken);
  }

  ngOnChanges() {
    console.log(location.href);
  }

  onLogin() {
    window.location.href = 'http://localhost:8888';
  }

}
