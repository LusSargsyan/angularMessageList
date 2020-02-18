import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService, AuthResponseData } from '../services/fireBase/firebase.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        language: ['']
      }
    );
  }

  onSubmitLogin() {
    if(!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.firebase.login(email, password);

    authObs.subscribe(
      resData => {
          this.router.navigate(['/recivedMessages']);
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => this.errorMessage = '', 4000);

      }
    );

    this.loginForm.reset();
  }

}
