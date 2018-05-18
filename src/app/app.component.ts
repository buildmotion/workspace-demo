import { Component } from '@angular/core';
import { LibOneService } from 'projects/lib-one/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private oneService: LibOneService
  ) {
    this.title = this.oneService.SayHello("Angular 6 Workspace")
  }
}
