import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Roles } from '../common/constants/roles';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: any[] = []; // Define your user model here
  roles = Roles.Role; // Import and use your Roles enum

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    // Use your AccountService to fetch users by role (adjust the role as needed)
    this.accountService.getUsersByRole(this.roles.User).subscribe((data) => {
      this.users = data;
    });
  }

  editUser(user: any) {
    // Implement edit user logic using your AccountService
  }

  deleteUser(user: any) {
    // Implement delete user logic using your AccountService
  }

}
