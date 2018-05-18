import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibOneService {
  constructor() { }

  SayHello(message: string): string {
    return `${message}`;
  }
}
