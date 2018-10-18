import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import {sortOption} from '../shared/interfaces'
import {environment} from '../../environments/environment'

const API = environment.API

@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: any

  constructor(private http: HttpClient) { }

  get user() {
    return this._user
  }

  setLoggedInUser(user) {
    this._user = user
  }

  getUsersByLocation(querry: string, sortOptionUsed: sortOption = 'repositories') {
    return this.http.get(`${API}search/users?q=location:${querry}+type:user&sort=${sortOptionUsed}`)
  }

  getUserByLogin(userLogin: string) {
    return this.http.get(`${API}users/${userLogin}`)
  }

  getFollowersByUserLogin(userLogin: string) {
    return this.http.get(`${API}users/${userLogin}/followers`)
  }

  getReposioriesByUserLogin(userLogin: string) {
    return this.http.get(`${API}users/${userLogin}/repos`)
  }
}
