import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  roles: any[] = [];
  genders: any[];
  selectedGender: string = 'male';

  maleIcon = 'https://static.vecteezy.com/system/resources/previews/002/002/332/large_2x/ablack-man-avatar-character-isolated-icon-free-vector.jpg';
  femaleIcon = 'https://static.vecteezy.com/system/resources/previews/002/002/297/large_2x/beautiful-woman-avatar-character-icon-free-vector.jpg';

  constructor(private primeNGConfig: PrimeNGConfig) {
    this.genders = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];
  }
  ngOnInit(): void {
  }

}