export class AccountInfo {
    id?: string;
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    city?:string;
    country?: string;
    gender: string = 'male';
    
    constructor() { }
}