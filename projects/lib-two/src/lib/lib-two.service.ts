import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibTwoService {
  serviceName = 'LibTwoService';
  constructor() { }

  SayHello(message: string): string {
    return `${message} from ${this.serviceName}`;
  }
}
