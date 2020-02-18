import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { FirebaseService, AuthResponseData } from '../services/fireBase/firebase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errorMessage = '';
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private firebase: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, 
      {
        validator: this.mustMatch
      }
    );
  }

  mustMatch(control: AbstractControl) {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
      if (password != confirmPassword) {
        control.get('confirmPassword').setErrors({ ConfirmPassword: true });
      }
      else {
        return null;
      }
  }

  onSubmitSignUp() {
    if(!this.signupForm.valid) {
      return;
    }

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.firebase.signup(email, password);

    authObs.subscribe(
      resData => {
          this.router.navigate(['/recivedMessages']);
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => this.errorMessage = '', 4000);

      }
    );

    this.signupForm.reset();
  }

}
