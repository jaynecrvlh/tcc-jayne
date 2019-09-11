import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userLogged:boolean;
  verified:boolean;

  email: string;
  password: string;
  validateForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.userLogged = false;
    this.verified = false;
  }

  onLogin(): void {
    const credentials = {
      email: this.email,
      password: this.password
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    this.authService.login(credentials);
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem("tccJayneUser"));
    this.userLogged = user != null ? true : false;
    this.verified = true;
    if(this.verified && this.userLogged) {
      this.router.navigate(['home']);
    }

    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

}
