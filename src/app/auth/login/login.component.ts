import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  activePath: string = 'signup';
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.activePath = this.route.snapshot.url[0].path;
  }

  get isEmailInValid(): boolean {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.dirty &&
      this.loginForm.controls.email.invalid
    );
  }

  get isPasswordInValid(): boolean {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }

  get redirectCTAText(): string {
    return this.activePath === 'login' ? 'Sign up' : 'Log in';
  }

  get redirectPath(): string {
    return this.activePath === 'login' ? 'signup' : 'login';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      // console.log('Form is invalid');
      return;
    }
    this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
  }
}
