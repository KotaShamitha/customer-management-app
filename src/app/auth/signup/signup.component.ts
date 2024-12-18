import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CardComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  activePath: string = 'signup';
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {
    this.activePath = this.route.snapshot.url[0].path;
  }

  get redirectCTAText(): string {
    return this.activePath === 'login' ? 'Sign up' : 'Log in';
  }

  get redirectPath(): string {
    return this.activePath === 'login' ? 'signup' : 'login';
  }

  onSubmit() {}
}
