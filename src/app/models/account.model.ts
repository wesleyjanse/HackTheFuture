import { BankAccount } from './bankaccount.model';
import { Login } from './login.model';
import { Transaction } from './transaction.model';

export class Account {
    constructor(  
        public account:BankAccount,
        public birthday:number,
        public firstName:string,
        public id: number,
        public lastname: string,
        public login:Login,
        public nationality:string,
        public transactions:Transaction[]){}
    }