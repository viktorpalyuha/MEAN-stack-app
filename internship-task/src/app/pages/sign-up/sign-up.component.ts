import { Component, OnInit } from '@angular/core';

import { FormCheckerService } from './../../form-checker.service';
import { AuthService } from './../../auth.service';

import { Form } from './../../shared/models/form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  user: Form = {
    name: '',
    login: '',
    email: '',
    password: '',
  };

  alerts: { danger: boolean; message: string } = {
    danger: false,
    message: '',
  };

  constructor(
    private formChecker: FormCheckerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignUpClick(): void {
    if (!this.formChecker.checkForm(this.user)) {
      this.alerts.message = 'One of the inputs has not been filled in';
      this.alerts.danger = true;
      setTimeout(() => {
        this.alerts.message = '';
        this.alerts.danger = false;
      }, 3000);
      return;
    }

    this.authService.signUpUser(this.user).subscribe((data: any) => {
      if (!data.success) {
        this.alerts.message = data.message;
        this.alerts.danger = true;
        setTimeout(() => {
          this.alerts.message = '';
          this.alerts.danger = false;
        }, 3000);
        this.router.navigate(['/sign-up']);
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}
