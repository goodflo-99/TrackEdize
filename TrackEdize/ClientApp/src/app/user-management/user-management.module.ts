import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { UserManagementComponent } from './user-management.component';
import { EditUserComponent } from './modal/edit-user/edit-user.component';



@NgModule({
  declarations: [
    UserManagementComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AccountService
  ],
})
export class UserManagementModule { }
