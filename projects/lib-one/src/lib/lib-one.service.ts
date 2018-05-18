import { Injectable } from '@angular/core';
import { LibTwoService } from '../../../lib-two/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {
  constructor(
    private serviceTwo: LibTwoService
  ) { }

  SayHello(message: string): string {
    // return `${message}`;
    return this.serviceTwo.SayHello(message);
  }
}
