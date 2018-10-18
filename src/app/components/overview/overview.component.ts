import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router'

import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'

import {UserService} from '../../services'
import {FormattedSortOption} from '../../shared/interfaces'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  locationInput: string
  users: Observable<any>
  activeUser: any
  sortOptions: FormattedSortOption[] = [
    {text: 'Repositories', value: 'repositories'},
    {text: 'Followers number', value: 'followers'},
    {text: 'Date joined', value: 'joined'},
  ]

  selectedSortOption: FormattedSortOption = this.sortOptions[0]

  userPopupOffset = {left: 50, top: 50}
  userPopupMargin = { horizontal: 25, vertical: 10 }
  isUserPopupShown = false

  constructor(public userService: UserService,
              public router: Router) { }

  ngOnInit() {

  }

  findUsers() {
    this.users = this.userService.getUsersByLocation(this.locationInput, this.selectedSortOption.value)
      .pipe(
        map((value: any) => value.items)
      )
  }

  showUserPopup(e) {
    const {pageX, pageY} = e
    this.userPopupOffset = {left: pageX, top: pageY}
  }

  showUserInfo(user) {
    this.activeUser = user
    this.userService.getUserByLogin(this.activeUser.login).subscribe(
      (data) => {
        this.activeUser = data
      },
    )
  }

  redirectToUserDetailByLogin(userLogin: string) {
    this.router.navigate(['user', userLogin])
  }
}
