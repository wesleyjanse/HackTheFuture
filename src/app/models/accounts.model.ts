import { BankAccount } from './bankaccount.model';
import { Login } from './login.model';

export class Accounts {
    constructor(  
        public account:BankAccount,
        public birthday:number,
        public firstName:string,
        public id: number,
        public lastname: string,
        public login:Login,
        public nationality:string){}
    }