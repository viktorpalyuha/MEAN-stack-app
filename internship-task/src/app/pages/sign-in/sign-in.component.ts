import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../auth.service';

import { Form } from './../../shared/models/form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user: Form = {
    login: '',
    password: '',
  };

  alerts: { danger: boolean; message: string } = {
    danger: false,
    message: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSignInClick(): void {
    this.authService.signInUser(this.user).subscribe((data: any) => {
      if (!data.success) {
        this.alerts.message = 'One of the inputs has not been filled in';
        this.alerts.danger = true;
        setTimeout(() => {
          this.alerts.message = '';
          this.alerts.danger = false;
        }, 3000);
        return;
      } else {
        this.authService.storeUser(data.token, data.user);
        this.router.navigate(['workers']);
      }
    });
  }
}
