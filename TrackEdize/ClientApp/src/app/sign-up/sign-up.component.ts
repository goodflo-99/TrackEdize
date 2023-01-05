import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationHelper } from '../shared/helpers/navigation.helper';
import { SignInService } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formCtr!: FormGroup;

  constructor(private fb: FormBuilder, private signinSvc: SignInService, private nav: NavigationHelper) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formCtr = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      firstName: [null],
      lastName: [null],
      
    })
  }

  login() {
    const creds = JSON.stringify(this.formCtr.value);
  }

}
