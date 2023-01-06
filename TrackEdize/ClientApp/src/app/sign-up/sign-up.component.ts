import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationHelper } from '../shared/helpers/navigation.helper';
import { AccountService } from '../sign-in/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [AccountService]
})
export class SignUpComponent implements OnInit {
  formCtr!: FormGroup;

  constructor(private fb: FormBuilder, private signinSvc: AccountService, private nav: NavigationHelper) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formCtr = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      repeatPassword: [null],
      email: [null, [Validators.required,Validators.email]],
      firstName: [null],
      lastName: [null],
    })
  }

  register() {
    const creds = JSON.stringify(this.formCtr.value);

    this.signinSvc.register(creds).subscribe();
  }

}
