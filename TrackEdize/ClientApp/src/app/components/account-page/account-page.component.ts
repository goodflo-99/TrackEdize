import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { Roles } from 'src/app/common/constants/roles';
import { AccountInfo } from 'src/app/common/models/AccountInfo';
import { AccountService } from 'src/app/services/account.service';
import { Dropdown } from 'src/app/shared/model/dropdown';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  roles: Dropdown[] = Roles.getAsDropdownArray();
  genders: any[];
  selectedGender: string = 'male';

  maleIcon = 'https://static.vecteezy.com/system/resources/previews/002/002/332/large_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg';
  femaleIcon = 'https://static.vecteezy.com/system/resources/previews/002/002/297/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg';
  accountInfo: AccountInfo = new AccountInfo();

  constructor(private primeNGConfig: PrimeNGConfig, private accountSvc: AccountService) {
    this.genders = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];
  }

  ngOnInit(): void {
    this.getAccountInfo();
  }

  async getAccountInfo() {
    await this.accountSvc.getAccountInfo();
    this.accountInfo = this.accountSvc.accountInfo ?? this.accountInfo;
  }

  updateAccountInfo() {
    this.accountSvc.updateAccountInfo(this.accountInfo)
  }

}