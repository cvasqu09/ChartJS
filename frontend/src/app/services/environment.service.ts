import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public getEnvironment() {
    return environment;
  }
}
