import {Component, OnInit} from '@angular/core'
import {AuthenticationService} from './services'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(authService: AuthenticationService) {
    authService.logout()
  }
}
