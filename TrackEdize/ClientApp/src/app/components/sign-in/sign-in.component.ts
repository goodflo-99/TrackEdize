import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationHelperService } from '../../shared/helpers/navigation-helper.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  formCtr!: FormGroup;

  constructor(private fb: FormBuilder, private signinSvc: AccountService, private nav: NavigationHelperService) {

  }

  ngOnInit(): void {
    this.signinSvc.logout();
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
      this.signinSvc.getAccountInfo();
      this.nav.toDashboard();
    }, err=> {

    })
  }
}