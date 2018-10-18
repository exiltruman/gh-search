import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

import {environment} from '../../environments/environment'
import {UserService} from './user.service'
import {Router} from '@angular/router'

const API = environment.API

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) { }

  login(username: string, password: string) {
    const authData = window.btoa(username + ':' + password)

    return this.http.get<any>(`${API}user`, {
      headers: {
        Authorization: `Basic ${authData}`
      }
    })
      .pipe(map(user => {
        if (user) {
          this.userService.setLoggedInUser(user)
          user.authdata = authData
          localStorage.setItem('currentUser', JSON.stringify(user))
        }

        return user
      }))
  }

  logout() {
    this.userService.setLoggedInUser(undefined)
    localStorage.removeItem('currentUser')
  }
}
