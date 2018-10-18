import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'

import 'rxjs-compat/add/operator/takeUntil'
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid'

import {Subject} from 'rxjs'

import {UserService} from '../../services'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {
  private destroyed = new Subject()
  private navigationSubscription
  private userLogin: string

  user: any
  isMyProfile = false

  // followers
  followersData = []

  gridViewForFollowers: GridDataResult
  pageSizeForFollowers = 5
  skipForFollowers = 0

  // repos
  repositoriesData = []

  gridViewForRepositories: GridDataResult
  pageSizeForRepositories = 5
  skipForRepositories = 0

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              public userService: UserService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites()
      }
    })
  }

  initialiseInvites() {
    this.user = undefined

    if (this.activatedRoute.snapshot.url[0].path === 'my-profile') {
      this.user = this.userService.user
      this.userLogin = this.userService.user.login
      this.isMyProfile = true
    } else {
      this.userLogin = this.activatedRoute.snapshot.params['userLogin']
      if (this.userService.user) {
        if (this.userLogin === this.userService.user.login) {
          this.user = this.userService.user
        }
      }

      if (!this.user) {
        this.userService.getUserByLogin(this.userLogin).takeUntil(this.destroyed).subscribe(
          user => this.user = user
        )
      }
    }

    // followers
    this.userService.getFollowersByUserLogin(this.userLogin).takeUntil(this.destroyed).subscribe(
      (followers: any[]) => {
        this.followersData = followers
        this.loadFollowersData()
      }
    )

    // repos
    this.userService.getReposioriesByUserLogin(this.userLogin).takeUntil(this.destroyed).subscribe(
      (repos: any[]) => {
        this.repositoriesData = repos
        this.loadRepositoriesData()
      }
    )
  }

  // followers
  private loadFollowersData() {
    this.gridViewForFollowers = {
      data: this.followersData.slice(this.skipForFollowers, this.skipForFollowers + this.pageSizeForFollowers),
      total: this.followersData.length
    }
  }

  public pageChangeForFollowers(event: PageChangeEvent) {
    this.skipForFollowers = event.skip
    this.loadFollowersData()
  }

  redirectToFollowerDetailByLogin(userLogin: string) {
    this.router.navigate(['user', userLogin])
  }

  // repos
  private loadRepositoriesData() {
    this.gridViewForRepositories = {
      data: this.repositoriesData.slice(this.skipForRepositories, this.skipForRepositories + this.pageSizeForRepositories),
      total: this.repositoriesData.length
    }
  }

  public pageChangeForRepositories(event: PageChangeEvent) {
    this.skipForRepositories = event.skip
    this.loadRepositoriesData()
  }

  ngOnDestroy() {
    this.destroyed.next()
  }

}
