import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationHelper } from '../shared/helpers/navigation.helper';
import { AccountService } from './account.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AccountService]
})
export class SignInComponent implements OnInit {

  formCtr!: FormGroup;

  constructor(private fb: FormBuilder, private signinSvc: AccountService, private nav: NavigationHelper) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formCtr = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    const creds = JSON.stringify(this.formCtr.value);

    this.signinSvc.login(creds).subscribe((res: any)=> {
      localStorage.setItem("jwt", res.token);
      this.nav.toDashboard();
    }, err=> {

    })
  }
}