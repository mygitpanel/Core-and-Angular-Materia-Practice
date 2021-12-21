import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Iuser } from '../_Interfaces/Iuser';
import { UserregisterService } from '../_Services/userregister.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userModel: Iuser;
  emailRegx =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private fb: FormBuilder,
    private _service: UserregisterService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.CreateRegisterForm();
  }

  CreateRegisterForm() {
    this.registerForm = this.fb.group({
      username: [null, Validators.required],
      //emailFormControl: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required],
    });
  }

  register() {
    debugger;
    if (this.registerForm.valid) {
      this.userModel = Object.assign({}, this.registerForm.value);
      this._service.registerService(this.userModel).subscribe(
        () => {
          alert('user registered successfully');
        },
        (error) => {
          alert(error.error);
        },
        () => {
          this._router.navigate(['/login']);
        }
      );
    }
  }
}
