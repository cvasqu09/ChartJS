import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  getToken(): string {
    if (this.token.value) {
      return this.token.getValue();
    } else if (localStorage.getItem('token')) {
      this.setToken(localStorage.getItem('token'));
    }
    return this.token.value;
  }

  setToken(value: string): void {
    localStorage.setItem('token', value);
    this.token.next(value);
  }
}
