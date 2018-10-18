import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ActivatedRoute, Router} from '@angular/router'

import {first} from 'rxjs-compat/operator/first'

import {AuthenticationService} from '../../services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  submitted = false
  error = ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    // reset login status
    this.authenticationService.logout()
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate(['/my-profile'])
        },
        error => {
          this.error = error.error.message
        })
  }
}
