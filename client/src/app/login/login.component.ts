import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Iuser } from '../_Interfaces/Iuser';
import { UserregisterService } from '../_Services/userregister.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userModel: Iuser;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private fb: FormBuilder,
    private _service: UserregisterService,
    private _router: Router,
    private _snackBar:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.CreateLoginForm();
  }

  CreateLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      //emailFormControl: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  login()
  {
    if (this.loginForm.valid) {
      this.userModel = Object.assign({}, this.loginForm.value);
      this._service.loginService(this.userModel).subscribe(
        () => {
          this._snackBar.open('Login successfully','Dismiss');
        },
        (error) => {
          this._snackBar.open(error.error,'Dismiss');
        },
        () => {
          this._router.navigate(['home']);
        }
      );
    }
  }

}
