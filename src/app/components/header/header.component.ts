import { Component } from '@angular/core';
import {AuthenticationService, UserService} from '../../services'
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public userService: UserService,
              private authService: AuthenticationService,
              private router: Router) { }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
