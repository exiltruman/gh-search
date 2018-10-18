import { Routes, RouterModule } from '@angular/router'

import {AuthGuard} from './guards'
import {OverviewComponent} from './components/overview/overview.component'
import {UserComponent} from './components/user/user.component'
import {LoginComponent} from './components/login/login.component'

const appRoutes: Routes = [
  { path: '',   redirectTo: '/overview', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'user/:userLogin', component: UserComponent, runGuardsAndResolvers: 'always'},
  { path: 'my-profile', component: UserComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/overview' }
]

export const routing = RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
